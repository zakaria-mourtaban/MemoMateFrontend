// src/Layout.tsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../core/components/navbar";
import TreeViewComponent from "./treeview";
import ExcalidrawComponent from "./excalidraw/Excalidraw";
import "./styles/style.css";
import {
	ExcalidrawAPIProvider,
	useExcalidrawAPI,
} from "../../context/excalidrawContext";
import Swal from "sweetalert2";
import { apiCall } from "../../modules/core/utils/api";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

export interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

const notehandler = () => {
	useEffect(() => {
		!current && navigate("/workspaces");
		current._id && apiCall("GET", "api/workspace/" + current._id, {}, true).then((res) => {
			let data = res.data.workspace.files;
			setTreeData(
				data.map((e) => {
					return {
						id: e._id,
						name: e.name,
						children: e.children,
					};
				})
			);
		});
	}, []);

	const toggleKmenu = useCallback(() => {
		setIsKmenuOpen((prev) => !prev);
		setSearchQuery("");
		setSelectedIndex(0);
	}, []);
	const filteredCommands = commands.filter((cmd) =>
		cmd.toLowerCase().includes(searchQuery.toLowerCase())
	);
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === "KeyK" && event.ctrlKey) {
				event.preventDefault();
				toggleKmenu();
			}

			if (isKmenuOpen) {
				if (event.key === "ArrowDown") {
					event.preventDefault();
					setSelectedIndex(
						(prev) => (prev + 1) % filteredCommands.length
					);
				} else if (event.key === "ArrowUp") {
					event.preventDefault();
					setSelectedIndex(
						(prev) =>
							(prev - 1 + filteredCommands.length) %
							filteredCommands.length
					);
				} else if (event.key === "Enter") {
					event.preventDefault();
					alert(
						`Command executed: ${filteredCommands[selectedIndex]}`
					);
					toggleKmenu();
				} else if (event.key === "Escape") {
					toggleKmenu();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isKmenuOpen, selectedIndex]);

	const createDiagram = () => {
		Swal.fire({
			title: "Create Diagram",
			input: "textarea",
			inputPlaceholder: "Enter diagram details here...",
			showCancelButton: true,
			confirmButtonText: "Create",
			cancelButtonText: "Cancel",
			inputAttributes: {
				style: "height: 100px; font-size: 16px;",
			},
			inputValidator: (value) => {
				if (!value) {
					return "Please enter diagram details!";
				}
			},
		}).then((result) => {
			if (result.isConfirmed) {
				apiCall(
					"POST",
					"api/chat/diagram",
					{ prompt: result.value },
					true
				).then((res) => {
					(async () => {
						try {
							const { elements, files } =
								await parseMermaidToExcalidraw(
									res.data.response.kwargs.content.toString()
								);

							const excalidrawelements =
								convertToExcalidrawElements(elements);
							if (files) {
								excalidrawAPI.addFiles(Object.values(files));
							}
							console.log(excalidrawelements);
							let sceneelements =
								await excalidrawAPI.getSceneElements();
							sceneelements =
								sceneelements.concat(excalidrawelements);
							excalidrawAPI.updateScene({
								elements: sceneelements,
							});
						} catch (error) {
							Swal.fire({
								title: "An Error occured",
								text: error,
							});
						}
					})();
				});
			}
		});
	};

	const indexCaller = (index) => {
		switch (index) {
			case 0:
				createDiagram();
				break;

			default:
				break;
		}
	};
}

const Note: React.FC = () => {
	const [isKmenuOpen, setIsKmenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [excalidrawAPI, setExcalidrawAPI] = useExcalidrawAPI();
	const current = useSelector((state: RootState) => state.workspaceApi.current);
	const [treeData, setTreeData] = useState([]);
	const navigate = useNavigate();
	const commands = ["Create Diagram"];

	notehandler()

	return (
		<div className="note-container">
			<Navbar />
			<div className="main-content">
				<div className="treeview">
					<TreeViewComponent data={treeData} />
				</div>
				<div className="content-area">
					<ExcalidrawComponent />
				</div>
			</div>

			{/* Kmenu Section */}
			{isKmenuOpen && (
				<div className="kmenu-overlay">
					<div className="kmenu">
						<input
							type="text"
							placeholder="Type a command..."
							className="kmenu-input"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							autoFocus
						/>
						<ul className="kmenu-list">
							{filteredCommands.length > 0 ? (
								filteredCommands.map((cmd, index) => (
									<li
										key={cmd}
										className={`kmenu-item ${
											index === selectedIndex
												? "kmenu-item-selected"
												: ""
										}`}
										onMouseEnter={() =>
											setSelectedIndex(index)
										}
										onClick={() => {
											indexCaller(index);
											toggleKmenu();
										}}
									>
										{cmd}
									</li>
								))
							) : (
								<li className="kmenu-item kmenu-item-disabled">
									No commands found
								</li>
							)}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Note;

// async () => {
// 	const { elements } =
// 		await parseMermaidToExcalidraw(
// 			`graph TD
// 	A[Start] --> B{Is it working?}
// 	B -->|Yes| C[Continue]
// 	B -->|No| D[Fix it]
// 	D --> B
// `
// 		);

// 	const excalidrawelements =
// 		convertToExcalidrawElements(elements);
// 	let sceneelements = await excalidrawAPI.getSceneElements();
// 	sceneelements = sceneelements.concat(excalidrawelements)
// 	excalidrawAPI.updateScene({elements : sceneelements})
// }
