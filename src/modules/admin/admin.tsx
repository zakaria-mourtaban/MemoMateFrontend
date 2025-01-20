import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
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
			const response = await apiCall("GET", '/api/admin/metrics', null, true);
			setMetrics(response.data);
		};

		const fetchUsers = async () => {
			const response = await apiCall("GET", '/api/admin/users', null, true);
			setUsers(response.data);
		};

		fetchMetrics();
		fetchUsers();
	}, []);

	return (
		<Container>
			<Grid container spacing={4} marginTop={4}>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
						<Typography variant="h6">Total Users</Typography>
						<Typography variant="h4" color="primary">{metrics?.totalUsers}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
						<Typography variant="h6">Active Users</Typography>
						<Typography variant="h4" color="primary">{metrics?.activeUsers}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
						<Typography variant="h6">Total Workspaces</Typography>
						<Typography variant="h4" color="primary">{metrics?.totalWorkspaces}</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper elevation={3} sx={{ padding: 2, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
						<Typography variant="h6">Total Chats</Typography>
						<Typography variant="h4" color="primary">{metrics?.totalChats}</Typography>
					</Paper>
				</Grid>
			</Grid>
			<Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
				Users
			</Typography>
			<TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
									<Box sx={{ display: 'flex', gap: 1 }}>
										<Button variant="contained" color="error" onClick={() => banUser(user._id)}>
											Ban
										</Button>
										<Button variant="contained" color="primary" onClick={() => changeUserRole(user._id, 'admin')}>
											Make Admin
										</Button>
									</Box>
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