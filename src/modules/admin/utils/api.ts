// src/modules/admin/utils/api.ts
import axios from "axios";
export interface IUser {
	_id: string;
	username: string;
	email: string;
	role: string;
}

export interface IMetrics {
	totalUsers: number;
	activeUsers: number;
	totalWorkspaces: number;
	totalChats: number;
}
export const getUsers = async (
	page: number,
	limit: number
): Promise<IUser[]> => {
	const response = await axios.get(`/api/users?page=${page}&limit=${limit}`);
	return response.data;
};

export const getAdminMetrics = async (): Promise<IMetrics> => {
	const response = await axios.get("/api/admin/metrics");
	return response.data;
};

export const banUser = async (userId: string): Promise<void> => {
	await axios.patch(`/api/users/${userId}/ban`);
};

export const changeUserRole = async (
	userId: string,
	newRole: string
): Promise<void> => {
	await axios.patch(`/api/users/${userId}/role`, { role: newRole });
};
