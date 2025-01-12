import axios from "axios";

// Save token in a cookie
export const setTokenCookie = (token) => {
    document.cookie = `token=${token}; path=/;`;
};


