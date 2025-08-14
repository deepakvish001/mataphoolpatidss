const PaymentSectionContent = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Payment Section</h2>
        <p className="text-xl text-gray-500">Coming Soon...</p>
        <div className="mt-8">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-blue-200 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSectionContent;