"use client";

import { useEffect, useState } from "react";
import PrivateRoute from "@/app/components/PrivateRoute";
import PastLeaves from "@/app/components/PastLeaves";
import UpcomingLeaves from "@/app/components/UpcomingLeaves";
import pastLeaves from "@/utils/pastLeaves";
import leavesUpcoming from "@/utils/leavesUpcoming";

interface Leave {
  _id: string;
  name: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const LeaveHistory = () => {
  const [leavesPast, setLeavesPast] = useState([]);
  const [comingLeaves, setComingLeaves] = useState([])

  useEffect(() => {
    (async () => {
      const data = await pastLeaves();
      setLeavesPast(data);
    })();

    (async () => {
      const data = await leavesUpcoming();
      setComingLeaves(data);
    })();
  }, []);

  return (
    <PrivateRoute>
      <div
        className={`p-8 w-full flex justify-center gap-4 font-[family-name:var(--font-outfit)]`}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold text-[#5A67BA]">
            Past Leaves
          </h1>
          <div className="w-[400px] min-h-[720px] max-h-[720px] overflow-auto flex flex-col gap-4 border-[1px] border-[#D7DEDD]  p-4">
            {leavesPast.map((leave: Leave) => {
              return (
                <PastLeaves
                  key={leave._id}
                  name={leave.name}
                  leaveType={leave.leaveType}
                  startDate={leave.startDate}
                  endDate={leave.endDate}
                  reason={leave.reason}
                />
              );
            })}
          </div>
        </div>
        <div className="h-[650px] mt-[85px] border-l-[1px] border-[#D7DEDD]"></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-center text-3xl font-bold text-[#5A67BA]">
            Upcoming Leaves
          </h1>
          <div className="w-[400px] min-h-[720px] max-h-[720px] overflow-auto flex flex-col gap-4 border-[1px] border-[#D7DEDD]  p-4">
            {comingLeaves.map((leave: Leave) => {
              return (
                <UpcomingLeaves
                  key={leave._id}
                  name={leave.name}
                  leaveType={leave.leaveType}
                  startDate={leave.startDate}
                  endDate={leave.endDate}
                  reason={leave.reason}
                />
              );
            })}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default LeaveHistory;
