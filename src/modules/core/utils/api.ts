import axios from "axios";

export const setTokenCookie = (token: string) => {
	document.cookie = `token=${token}; path=/; secure; samesite=strict`;
};

export const getTokenFromCookie = () => {
	const match = document.cookie.match(/(^|;) ?token=([^;]*)(;|$)/);
	return match ? match[2] : null;
};

export const apiCall = async (
	method: string,
	url: string,
	data: any = null,
	requiresAuth = true
) => {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
	};

	if (requiresAuth) {
		const token = getTokenFromCookie();
		if (!token) {
			throw new Error("No token found. Please log in again.");
		}
		headers.Authorization = `Bearer ${token}`;
	}

	return axios({
		method,
		url,
		data,
		headers,
		baseURL: "http://15.188.63.103:8000",
	});
};

export const login = async (email: string, password: string) => {
	try {
		const response = await apiCall(
			"POST",
			"auth/login",
			{ email, password },
			false
		);
		if (response.data.token) {
			setTokenCookie(response.data.token);
		}
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Login failed");
	}
};

export const signup = async (name: string, email: string, password: string) => {
	try {
		const response = await apiCall(
			"POST",
			"auth/register",
			{ name, email, password },
			false
		);
		if (response.data.token) {
			setTokenCookie(response.data.token);
		}
		return response.data;
	} catch (error: any) {
		throw new Error(error.response?.data?.message || "Signup failed");
	}
};
