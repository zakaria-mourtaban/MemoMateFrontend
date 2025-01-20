// AdminPanel.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	DialogActions,
	TextField,
	MenuItem,
	CircularProgress,
	Card,
	CardContent,
	Grid,
} from "@mui/material";
import {
	getUsers,
	getAdminMetrics,
	banUser,
	changeUserRole,
} from "./utils/api";
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
const AdminPanel: React.FC = () => {
	const navigate = useNavigate();
	const [users, setUsers] = useState<IUser[]>([]);
	const [page, setPage] = useState<number>(1);
	const [limit, setLimit] = useState<number>(10);
	const [metrics, setMetrics] = useState<IMetrics>({
		totalUsers: 0,
		activeUsers: 0,
		totalWorkspaces: 0,
		totalChats: 0,
	});
	const [totalUsersCount, setTotalUsersCount] = useState<number>(0);
	const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
	const [errorUsers, setErrorUsers] = useState<Error | null>(null);
	const [loadingMetrics, setLoadingMetrics] = useState<boolean>(true);
	const [errorMetrics, setErrorMetrics] = useState<Error | null>(null);
	const [openBanDialog, setOpenBanDialog] = useState<boolean>(false);
	const [selectedUserId, setSelectedUserId] = useState<string>("");
	const [openRoleDialog, setOpenRoleDialog] = useState<boolean>(false);
	const [selectedUserForRole, setSelectedUserForRole] =
		useState<IUser | null>(null);
	const [newRole, setNewRole] = useState<string>("");
	const [loadingBan, setLoadingBan] = useState<boolean>(false);
	const [errorBan, setErrorBan] = useState<Error | null>(null);
	const [loadingRole, setLoadingRole] = useState<boolean>(false);
	const [errorRole, setErrorRole] = useState<Error | null>(null);

	useEffect(() => {
		fetchUsers();
		fetchMetrics();
	}, [page, limit]);

	const fetchUsers = async () => {
		setLoadingUsers(true);
		setErrorUsers(null);
		try {
			const data = await getUsers(page, limit);
			setUsers(data);
			setTotalUsersCount(data.length); // Adjust based on actual total count from backend
			setLoadingUsers(false);
		} catch (error) {
			setErrorUsers(error as Error);
			setLoadingUsers(false);
		}
	};

	const fetchMetrics = async () => {
		setLoadingMetrics(true);
		setErrorMetrics(null);
		try {
			const data = await getAdminMetrics();
			setMetrics(data);
			setLoadingMetrics(false);
		} catch (error) {
			setErrorMetrics(error as Error);
			setLoadingMetrics(false);
		}
	};

	const handleBanUser = (userId: string) => {
		setSelectedUserId(userId);
		setOpenBanDialog(true);
	};

	const confirmBan = async () => {
		setLoadingBan(true);
		setErrorBan(null);
		try {
			await banUser(selectedUserId);
			setOpenBanDialog(false);
			fetchUsers();
			setLoadingBan(false);
		} catch (error) {
			setErrorBan(error as Error);
			setLoadingBan(false);
		}
	};

	const handleRoleChange = (user: IUser) => {
		setSelectedUserForRole(user);
		setOpenRoleDialog(true);
	};

	const confirmRoleChange = async () => {
		setLoadingRole(true);
		setErrorRole(null);
		try {
			await changeUserRole(selectedUserForRole?._id || "", newRole);
			setOpenRoleDialog(false);
			fetchUsers();
			setLoadingRole(false);
		} catch (error) {
			setErrorRole(error as Error);
			setLoadingRole(false);
		}
	};

	const totalPages = totalUsersCount ? Math.ceil(totalUsersCount / limit) : 0;

	return (
		<div>
			<h1>Admin Panel</h1>
			{/* Admin Metrics Section */}
			<div>
				{loadingMetrics ? (
					<CircularProgress />
				) : errorMetrics ? (
					<p>Error fetching metrics: {errorMetrics.message}</p>
				) : (
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Card>
								<CardContent>
									<h3>Total Users</h3>
									<p>{metrics.totalUsers}</p>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
								<CardContent>
									<h3>Active Users</h3>
									<p>{metrics.activeUsers}</p>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
								<CardContent>
									<h3>Total Workspaces</h3>
									<p>{metrics.totalWorkspaces}</p>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Card>
								<CardContent>
									<h3>Total Chats</h3>
									<p>{metrics.totalChats}</p>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				)}
			</div>

			{/* Users Table */}
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loadingUsers ? (
							<CircularProgress />
						) : errorUsers ? (
							<p>Error fetching users: {errorUsers.message}</p>
						) : (
							users.map((user) => (
								<TableRow key={user._id}>
									<TableCell>{user.username}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.role}</TableCell>
									<TableCell>
										<Button
											onClick={() =>
												handleBanUser(user._id)
											}
										>
											Ban
										</Button>
										<Button
											onClick={() =>
												handleRoleChange(user)
											}
										>
											Change Role
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination Controls */}
			<div>
				<button disabled={page === 1} onClick={() => setPage(page - 1)}>
					Previous
				</button>
				<span>
					Page {page} of {totalPages}
				</span>
				<button
					disabled={page === totalPages}
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>

			{/* Ban User Dialog */}
			<Dialog
				open={openBanDialog}
				onClose={() => setOpenBanDialog(false)}
			>
				<DialogTitle>Ban User</DialogTitle>
				<DialogContent>
					Are you sure you want to ban this user?
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenBanDialog(false)}>
						Cancel
					</Button>
					{loadingBan ? (
						<Button disabled>Banning...</Button>
					) : (
						<Button onClick={confirmBan}>Ban</Button>
					)}
				</DialogActions>
			</Dialog>

			{/* Change Role Dialog */}
			<Dialog
				open={openRoleDialog}
				onClose={() => setOpenRoleDialog(false)}
			>
				<DialogTitle>Change User Role</DialogTitle>
				<DialogContent>
					<TextField
						select
						label="New Role"
						value={newRole}
						onChange={(e) => setNewRole(e.target.value)}
					>
						<MenuItem value="user">User</MenuItem>
						<MenuItem value="admin">Admin</MenuItem>
					</TextField>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenRoleDialog(false)}>
						Cancel
					</Button>
					{loadingRole ? (
						<Button disabled>Changing Role...</Button>
					) : (
						<Button onClick={confirmRoleChange}>Confirm</Button>
					)}
				</DialogActions>
			</Dialog>

			{/* Link to Extra Page */}
			<Button onClick={() => navigate("/admin/extra")}>
				Go to Extra Page
			</Button>
		</div>
	);
};

export default AdminPanel;
