const leave = {
  name: "Joe",
  leaveType: "Vacation Leave",
  startDate: "Jan 30, 2025",
  endDate: "Feb 02, 2025",
  reason: "Not Feeling Well",
};
const LeaveApproval = () => {
  return (
    // <div className="w-[600px] flex flex-col gap-4 border-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)] p-4">
      <div className="flex flex-col gap-4 border-[1px] border-[#D7DEDD] p-6">
        <div className="flex justify-between items-end">
          <h2 className="text-[#5A67BA] font-bold text-2xl p-1">{`${leave.name}'s Leave Request`}</h2>
          <span className="text-xs p-2 bg-gray-300 rounded-md">
            {leave.leaveType}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 px-1">
            <span className="text-sm">{leave.startDate}</span>
            <span className="text-base font-bold">-</span>
            <span className="text-sm">{leave.endDate}</span>
          </div>
          <div className={`${leave.reason === "" ? "hidden" : "solid"} px-1`}>
            <span>Reason: </span>
            <span>{leave.reason}</span>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="bg-red-600 rounded-md px-2 py-1 text-white">
            Reject
          </button>
          <button className="bg-green-600 rounded-md px-2 py-1 text-white">
            Approve
          </button>
        </div>
      </div>
    // </div>
  );
};

export default LeaveApproval;
