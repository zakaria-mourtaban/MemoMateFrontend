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

