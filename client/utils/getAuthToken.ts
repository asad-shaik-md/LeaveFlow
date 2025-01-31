export const getAuthToken = () => {
    let token;
    if (typeof window !== "undefined") {
        token = localStorage.getItem('authToken')        
    }
    return token
}