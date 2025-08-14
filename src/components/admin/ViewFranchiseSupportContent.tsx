const ViewFranchiseSupportContent = () => {
  const supportData = [
    {
      id: 1,
      name: "PT/lk/bt/0001",
      email: "abc@gmail.com",
      contact: "9690283407",
      message: "NA"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Name</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Email</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Contact</th>
              <th className="border border-gray-400 px-4 py-3 text-left font-semibold">Message</th>
            </tr>
          </thead>
          <tbody>
            {supportData.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-400 px-4 py-3">{item.name}</td>
                <td className="border border-gray-400 px-4 py-3">{item.email}</td>
                <td className="border border-gray-400 px-4 py-3">{item.contact}</td>
                <td className="border border-gray-400 px-4 py-3">{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFranchiseSupportContent;