import leaveApprove from "@/utils/leaveApprove";
import leaveReject from "@/utils/leaveReject";

interface Props {
  _id: string;
  name: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  onAction: VoidFunction
}

const LeaveApproval = (props: Props) => {

  const onApprove = async () => {
    await leaveApprove(props._id)
    props.onAction()
  }
  
  const onReject = async () => {
    await leaveReject(props._id)
    props.onAction()
  }

  return (
      <div className="flex flex-col gap-4 border-[1px] border-[#D7DEDD] p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-[#5A67BA] font-bold text-2xl p-1">{`${props.name}'s Leave Request`}</h2>
          <span className="text-xs p-2 bg-gray-300 rounded-md">
            {props.leaveType}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 px-1 items-center">
            <span className="text-sm">{props.startDate}</span>
            <span className="text-base font-bold">-</span>
            <span className="text-sm">{props.endDate}</span>
          </div>
          <div className={`${props.reason === "" ? "hidden" : "solid"} px-1`}>
            <span>Reason: </span>
            <span>{props.reason}</span>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={onReject} className="bg-red-600 rounded-md px-2 py-1 text-white">
            Reject
          </button>
          <button onClick={onApprove} className="bg-green-600 rounded-md px-2 py-1 text-white">
            Approve
          </button>
        </div>
      </div>
  );
};

export default LeaveApproval;
