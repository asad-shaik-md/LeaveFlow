import { getAuthToken } from "./getAuthToken";

const fetchPendingLeaves = async () => {
  try {
    const token = getAuthToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/leave-request/pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": `${token}`,
        },
      }
    );
    const data = await response.json();

    function formatDate(dateString: string) {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", options);
    }

    data.forEach((item: { startDate: string; endDate: string }) => {
      item.startDate = formatDate(item.startDate);
      item.endDate = formatDate(item.endDate);
    });

    return data;
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export default fetchPendingLeaves;
