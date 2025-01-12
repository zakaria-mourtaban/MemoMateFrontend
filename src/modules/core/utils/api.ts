import axios from "axios";

// Save token in a cookie
export const setTokenCookie = (token) => {
    document.cookie = `token=${token}; path=/;`;
};


// Retrieve token from the cookie
export const getTokenFromCookie = () => {
    const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
    return match ? match[2] : null;
};

// Function to make authenticated API calls
export const apiCall = async (method, url, data = null) => {
    const token = getTokenFromCookie();
    if (!token) {
        throw new Error("No token found. Please log in again.");
    }
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return axios({ method, url, data, headers });
};