import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useOptimisticCrud } from "@/hooks/useOptimisticCrud";
import { useAdminRealTime } from "@/hooks/useAdminRealTime";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FranchiseRegistration {
  id: string;
  institute_full_name: string;
  institute_sort_name: string;
  centre_head_name: string;
  email: string;
  mobile_number: string;
  state_name: string;
  district_name: string;
  postal_address: string;
  pin_code: string;
  approval_status: string;
  status: string;
  date_of_registration: string;
  franchise_type: string;
  year_of_establishment: string;
  created_at: string;
  updated_at: string;
}

const FranchiseApprovalContent = () => {
  const { data: franchiseData, loading, update } = useOptimisticCrud<FranchiseRegistration>({
    tableName: 'franchise_registrations',
    orderBy: { column: 'created_at', ascending: false }
  });

  // Enable real-time updates
  useAdminRealTime({
    tableName: 'franchise_registrations'
  });

  const handleApprovalToggle = async (franchise: FranchiseRegistration) => {
    try {
      const newApprovalStatus = franchise.approval_status === 'approved' ? 'pending' : 'approved';
      await update(franchise.id, {
        ...franchise,
        approval_status: newApprovalStatus,
        status: newApprovalStatus === 'approved' ? 'active' : 'pending'
      });
      toast.success(`Franchise ${newApprovalStatus === 'approved' ? 'approved' : 'marked as pending'} successfully!`);
    } catch (error) {
      toast.error('Failed to update franchise approval status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading franchise registrations...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Management of Franchise</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border-2 border-gray-400">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[80px]">Actions</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[200px]">Institute Name</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Centre Head</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Email</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[120px]">Mobile</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">State</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">District</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[150px]">Address</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[80px]">Pincode</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Franchise Type</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Establishment</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Registration Date</th>
              <th className="border-2 border-gray-400 px-2 py-3 text-left font-semibold min-w-[100px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {franchiseData.length === 0 ? (
              <tr>
                <td colSpan={13} className="border-2 border-gray-400 px-4 py-8 text-center text-gray-500">
                  No franchise registrations found
                </td>
              </tr>
            ) : (
              franchiseData.map((franchise, index) => (
                <tr key={franchise.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border-2 border-gray-400 px-2 py-3 text-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        checked={franchise.approval_status === 'approved'} 
                        onCheckedChange={() => handleApprovalToggle(franchise)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprovalToggle(franchise)}
                        className="text-xs"
                      >
                        {franchise.approval_status === 'approved' ? 'Revoke' : 'Approve'}
                      </Button>
                    </div>
                  </td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.institute_full_name}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.centre_head_name}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.email}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.mobile_number}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.state_name}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.district_name}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.postal_address}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.pin_code}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.franchise_type}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">{franchise.year_of_establishment}</td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">
                    {new Date(franchise.date_of_registration).toLocaleDateString()}
                  </td>
                  <td className="border-2 border-gray-400 px-2 py-3 font-medium text-sm">
                    <span className={`px-2 py-1 rounded text-xs ${
                      franchise.approval_status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : franchise.approval_status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {franchise.approval_status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Total Registrations: {franchiseData.length}
      </div>
    </div>
  );
};

export default FranchiseApprovalContent;