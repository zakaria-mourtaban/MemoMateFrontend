import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { apiCall } from '../core/utils/api';	

interface Metrics {
	totalUsers: number;
	activeUsers: number;
	totalWorkspaces: number;
	totalChats: number;
}

interface User {
	_id: string;
	name: string;
	email: string;
	role: string;
}

const Admin = () => {
	const [metrics, setMetrics] = useState<Metrics | null>(null);
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchMetrics = async () => {
			const response = await apiCall("GET",'/api/admin/metrics',null,true);
			setMetrics(response.data);
		};

		const fetchUsers = async () => {
			const response = await apiCall("GET",'/api/admin/users',null,true);
			setUsers(response.data);
		};

		fetchMetrics();
		fetchUsers();
	}, []);

	return (
		<Container>
			<Typography variant="h4" gutterBottom>
				Admin Dashboard
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} className="metric-card">
						<Typography variant="h6">Total Users</Typography>
						<Typography variant="h4">{metrics?.totalUsers}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} className="metric-card">
						<Typography variant="h6">Active Users</Typography>
						<Typography variant="h4">{metrics?.activeUsers}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} className="metric-card">
						<Typography variant="h6">Total Workspaces</Typography>
						<Typography variant="h4">{metrics?.totalWorkspaces}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} className="metric-card">
						<Typography variant="h6">Total Chats</Typography>
						<Typography variant="h4">{metrics?.totalChats}</Typography>
					</Paper>
				</Grid>
			</Grid>
			<Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
				Users
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user._id}>
								<TableCell>{user._id}</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell>
									<Button variant="contained" color="secondary" onClick={() => banUser(user._id)}>
										Ban
									</Button>
									<Button variant="contained" color="primary" onClick={() => changeUserRole(user._id, 'admin')}>
										Make Admin
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

const banUser = async (userId: string) => {
	await apiCall("put", `/api/admin/ban/${userId}`, null, true);
	// Refresh user list or show notification
};

const changeUserRole = async (userId: string, role: string) => {
	await apiCall("put", `/api/admin/users/${userId}/role`, { role }, true);
	// Refresh user list or show notification
};

export default Admin;