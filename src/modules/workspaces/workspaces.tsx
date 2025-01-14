// Workspaces.js
import React, { useEffect, useState } from "react";
import Navbar from "../core/components/navbar";
import "./styles/workspaces.css";
import { apiCall } from "../core/utils/api";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setWorkspace } from "../../store/store";
const Workspaces = () => {
	// const [workspaces, setWorkspaces] = useState([]);
	const workspaces = useSelector(
		(state: RootState) => state.workspaceApi.workspaces
	);
	const dispatch = useDispatch();

	const loadWorkspace = async () => {
		const data = await apiCall("GET", "api/workspace", {}, true).then(
			(res) => {
				return res.data;
			}
		);
		dispatch(setWorkspace(data.workspaces))
		console.log(workspaces);
	};

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
			if (e.isDismissed) return;
			apiCall("POST", "api/workspace", { name: e.value }, true).then(
				() => {
					loadWorkspace();
				}
			);
		});
	};

	const deleteWorkspace = (id) => {
		// setWorkspace(workspaces.filter((workspace) => workspace.id !== id));
	};

	useEffect(() => {
		loadWorkspace();
	}, []);

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
							<div key={workspace._id} className="workspaces-item">
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
