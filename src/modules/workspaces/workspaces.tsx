// Workspaces.js
import React, { useEffect } from "react";
import Navbar from "../core/components/navbar";
import "./styles/workspaces.css";
import { apiCall } from "../core/utils/api";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCurrent, setWorkspace } from "../../store/store";
import { useNavigate } from "react-router-dom";
const Workspaces = () => {
	const workspaces = useSelector(
		(state: RootState) => state.workspaceApi.workspaces
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loadWorkspace = async () => {
		const data = await apiCall("GET", "api/workspace", {}, true).then(
			(res) => {
				return res.data;
			}
		);
		dispatch(setWorkspace(data.workspaces));
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

	const deleteWorkspace = async (id) => {
		await apiCall("PATCH", `api/workspace/${id}/delete`, {}, true);
		loadWorkspace();
	};

	const navigateToNote = async (workspace) => {
		dispatch(setCurrent(workspace));
		navigate("/notes");
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
						<div
							onClick={() => {
								navigateToNote(workspace);
							}}
							key={workspace?._id}
						>
							<div
								className="workspaces-item"
							>
								<div>
									<button
										className="workspaces-delete-button"
										onClick={(e) => {
											e.stopPropagation();
											deleteWorkspace(workspace?._id);
										}}
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
