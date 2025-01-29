interface Credentials {
    employeeID: number;
    password: string;
}

interface LoginResponse {
    success: boolean;
    error?: string;
}

const loginRequest = async (credentials: Credentials): Promise<LoginResponse> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });
        console.log(credentials)

        if (!response.ok) throw new Error("Login Failed");
        
        
        const token = response.headers.get("x-auth-token");
        if (token) {
            localStorage.setItem("authToken", token);
            return { success: true };
        }

        throw new Error("No token received");
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
};

export default loginRequest;
