// Workspaces.js
import React, { useState } from "react";
import Navbar from "../core/components/navbar";
import "./styles/workspaces.css";
import { PlusIcon } from "lucide-react";

const Workspaces = () => {
	const [workspaces, setWorkspaces] = useState([]);

	const addWorkspace = () => {
		const newWorkspace = {
			id: Date.now(),
			name: `Workspace ${workspaces.length + 1}`,
		};
		setWorkspaces([...workspaces, newWorkspace]);
	};

	const deleteWorkspace = (id) => {
		setWorkspaces(workspaces.filter((workspace) => workspace.id !== id));
	};

	return (
		<>
			<Navbar />
			<div className="workspaces-container">
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
					<button
						className="workspaces-add-button"
						onClick={addWorkspace}
					>
						<PlusIcon />
					</button>
				</div>
			</div>
		</>
	);
};

export default Workspaces;
