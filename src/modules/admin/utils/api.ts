import axios from "axios";
import { getTokenFromCookie } from "modules/core/utils/api";

const API_URL = "api/admin";

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
		baseURL: "http://localhost:5000",
	});
};

export const getUsers = async (page: number, limit: number) => {
	const response = await apiCall("get", `${API_URL}/users`, { page, limit });
	return response.data;
};

export const getAdminMetrics = async () => {
	const response = await apiCall("get", `${API_URL}/metrics`);
	return response.data;
};

export const banUser = async (userId: string) => {
	const response = await apiCall("put", `${API_URL}/users/${userId}/ban`);
	return response.data;
};

export const changeUserRole = async (userId: string, role: string) => {
	const response = await apiCall("put", `${API_URL}/users/${userId}/role`, {
		role,
	});
	return response.data;
};
