"use client";

import { jwtDecode } from "jwt-decode";
import LeaveApproval from "@/app/components/LeaveApproval";
import LeaveRequest from "@/app/components/LeaveRequest";
import { useEffect, useState } from "react";
import fetchPendingLeaves from "@/utils/pendingLeaves";
import PrivateRoute from "@/app/components/PrivateRoute";
import { getAuthToken } from "@/utils/getAuthToken";

interface Decoded {
  employeeID: string | number;
  name: string;
  role: string;
}

interface Leave {
  _id: string;
  name: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

const Dashboard = () => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = getAuthToken();

      if (token) {
        const { role } = jwtDecode<Decoded>(token);
        setRole(role);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (role === "admin") {
      (async () => {
        const data = await fetchPendingLeaves();
        setLeaves(data);
      })();
    }
  }, [role, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1)
  }  


  return (
    <PrivateRoute>
      <div
        className={`${
          (role === 'admin' && leaves.length == 0) ? "hidden" : "solid"
        } ${
          loading ? "hidden" : "solid"
        } p-8 w-full flex justify-center items-center`}
      >
        <div className="w-[600px] flex flex-col gap-4 border-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)] p-4">
          {role === "admin" ? (
            Array.isArray(leaves) && leaves.length > 0 ? (
              leaves.map((leave: Leave) => (
                <LeaveApproval
                  key={leave._id}
                  _id={leave._id}
                  name={leave.name}
                  leaveType={leave.leaveType}
                  startDate={leave.startDate}
                  endDate={leave.endDate}
                  reason={leave.reason}
                  onAction={handleRefresh}
                />
              ))
            ) : (
              null
            )
          ) : (
            <LeaveRequest />
          )}
        </div>
      </div>
      <div className={`${(role === 'admin' && leaves.length == 0) ? "solid" : "hidden"} fixed left-1/2 -translate-x-1/2 top-[15%] p-4 rounded-md bg-[#707FDD] bg-opacity-10 text-[#5A67BA]`}>
        No Pending Leaves
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
