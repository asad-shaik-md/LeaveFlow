const leaveReject = async (_id: string) => {
    try {
      const token = localStorage.getItem("authToken");
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leave-request/${_id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${token}`,
          },
        }
      );
      if (!response.ok) new Error("Something Went Wrong")
      return {success: true}
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  };
  
  export default leaveReject;
  