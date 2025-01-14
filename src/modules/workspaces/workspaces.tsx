// Workspaces.js
import React, { useState } from "react";
import Navbar from "../core/components/navbar";
import "./styles/workspaces.css";
import { apiCall } from "../core/utils/api";
import Swal from "sweetalert2";
const Workspaces = () => {
	const [workspaces, setWorkspaces] = useState([]);

	const addWorkspace = async () => {
		await Swal.fire({
			title: "Name the Workspace",
			input: "text",
			showCancelButton: true,
			inputValidator: (value) => {
				if (!value) {
					return "You need to write something!";
				}
			},
		}).then((e) => {
			console.log(e);
		});
	};

	const deleteWorkspace = (id) => {
		setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
	};

	return (
		<>
			<Navbar />
			<div className="workspaces-container">
				<div className="workspaces-create-workspace-div">
					<button
						className="workspaces-add-button"
						onClick={addWorkspace}
					>
						<p>Add Workspace</p>
					</button>
				</div>
				<div className="workspaces-list">
					{workspaces.map((workspace) => (
						<div>
							<div key={workspace.id} className="workspaces-item">
								<div>
									<button
										className="workspaces-delete-button"
										onClick={() =>
											deleteWorkspace(workspace.id)
										}
									>
										🗑️
									</button>
								</div>
							</div>
							<span>{workspace.name}</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Workspaces;
