"use client"

import { jwtDecode } from "jwt-decode";
import LeaveApproval from "@/app/components/LeaveApproval";
import LeaveRequest from "@/app/components/LeaveRequest";
import { useEffect, useState } from "react";

interface Decoded {
  employeeID: string | number;
  name: string;
  role: string
}

const Dashboard = () => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");

      if (token) {
        const { role } = jwtDecode<Decoded>(token);
        setRole(role)
        setLoading(false)
      }}
  }, [])

  return (
    <div className={`${loading ? "hidden" : "solid"} p-8 w-full flex justify-center items-center`}>
      <div className="w-[600px] flex flex-col gap-4 border-[1px] border-[#D7DEDD] font-[family-name:var(--font-outfit)] p-4">
       {role === 'admin' ? <LeaveApproval /> : <LeaveRequest />}
      </div>
    </div>
  );
};

export default Dashboard;
