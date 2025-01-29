import { jwtDecode } from "jwt-decode";

interface LeaveData {
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string | undefined | null;
}
interface Decoded {
  employeeID: string | number;
  name: string;
}

const leaveSubmission = async (leaveData: LeaveData) => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) throw new Error("No auth token found");
    const { employeeID, name } = jwtDecode<Decoded>(token);

    const fullLeaveData = { ...leaveData, employeeID: employeeID, name: name };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leave-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        body: JSON.stringify(fullLeaveData),
      }
    );

    if (!response.ok) throw new Error("Failed to submit leave request.");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export default leaveSubmission;
