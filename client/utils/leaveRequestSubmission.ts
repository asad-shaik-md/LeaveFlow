interface LeaveData {
  name: string;
  employeeID: string;
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string | undefined | null;
}


const leaveSubmission = async (leaveData: LeaveData) => {
  try {
    const token = localStorage.getItem('authToken')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leave-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
        body: JSON.stringify(leaveData),
      }
    );

    if (!response.ok) throw new Error("Failed to submit leave request.");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export default leaveSubmission;
