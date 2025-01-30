"use client";

import { jwtDecode } from "jwt-decode";
import LeaveApproval from "@/app/components/LeaveApproval";
import LeaveRequest from "@/app/components/LeaveRequest";
import { useEffect, useState } from "react";
import fetchPendingLeaves from "@/utils/pendingLeaves";
import PrivateRoute from "@/app/components/PrivateRoute";

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
  const [leaves, setLeaves] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

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
          loading ? "hidden" : "solid"
        } p-8 w-full flex justify-center items-center`}
      >
        <div className="w-[600px] flex flex-col gap-4 border-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)] p-4">
          {role === "admin" ? (
            leaves.map((data: Leave) => {
              return (
                <LeaveApproval
                  key={data._id}
                  _id={data._id}
                  name={data.name}
                  leaveType={data.leaveType}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  reason={data.reason}
                  onAction={handleRefresh}
                />
              );
            })
          ) : (
            <LeaveRequest />
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
