import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useExcalidrawAPI } from "../../../context/excalidrawContext";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { apiCall } from "../../core/utils/api";
import Swal from "sweetalert2";
import { RootState } from "store/store";

export const useNoteHandler = () => {
	const [isKmenuOpen, setIsKmenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [treeData, setTreeData] = useState([]);

	const navigate = useNavigate();
	const [excalidrawAPI] = useExcalidrawAPI();
	const current = useSelector(
		(state: RootState) => state.workspaceApi.current
	);

	const commands = ["Create Diagram"];
	console.log(treeData)

	const recursiveRename = (e) => {
		return {
			id: e._id,
			name: e.name,
			children: e.files ? recursiveRename(e) : null
		}
	}


	const loadTree = () => {
		apiCall("GET", `api/workspace/${current._id}`, {}, true).then((res) => {
			const data = res.data.workspace.files;
			setTreeData(
				recursiveRename(data)
			);
		});
	};

	// Load workspace data
	useEffect(() => {
		if (!current) {
			navigate("/workspaces");
			return;
		}

		if (current?._id) {
			loadTree();
		}
	}, [current, navigate]);

	const toggleKmenu = useCallback(() => {
		setIsKmenuOpen((prev) => !prev);
		setSearchQuery("");
		setSelectedIndex(0);
	}, []);

	const createDiagram = useCallback(async () => {
		const result = await Swal.fire({
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
				if (!value) return "Please enter diagram details!";
				return null;
			},
		});

		if (result.isConfirmed && result.value) {
			try {
				const res = await apiCall(
					"POST",
					"api/chat/diagram",
					{ prompt: result.value },
					true
				);
				const { elements, files } = await parseMermaidToExcalidraw(
					res.data.response.kwargs.content.toString()
				);

				const excalidrawElements =
					convertToExcalidrawElements(elements);

				if (files) {
					excalidrawAPI.addFiles(Object.values(files));
				}

				const sceneElements = await excalidrawAPI.getSceneElements();
				excalidrawAPI.updateScene({
					elements: [...sceneElements, ...excalidrawElements],
				});
			} catch (error) {
				Swal.fire({
					title: "An Error occurred",
					text: error.toString(),
				});
			}
		}
	}, [excalidrawAPI]);

	const indexCaller = useCallback(
		(index: number) => {
			switch (index) {
				case 0:
					createDiagram();
					break;
				default:
					break;
			}
		},
		[createDiagram]
	);

	// Keyboard event handlers
	let filteredCommands = [];
	useEffect(() => {
		filteredCommands = commands.filter((cmd) =>
			cmd.toLowerCase().includes(searchQuery.toLowerCase())
		);

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
					indexCaller(selectedIndex);
					toggleKmenu();
				} else if (event.key === "Escape") {
					toggleKmenu();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isKmenuOpen, selectedIndex, searchQuery, toggleKmenu, indexCaller]);

	return {
		isKmenuOpen,
		searchQuery,
		selectedIndex,
		treeData,
		commands,
		filteredCommands,
		setSearchQuery,
		setSelectedIndex,
		toggleKmenu,
		indexCaller,
		loadTree,
	};
};
