import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import Node from "./node";
import "./styles/treeview.css";
import {
	ChevronsDownUp,
	ChevronsUpDown,
	Delete,
	FilePlus2,
	FolderPlus,
	Trash,
	Upload,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCollapsed, setCurrentNode } from "../../store/store";
import axios from "axios";
import { apiCall, getTokenFromCookie } from "../core/utils/api";

interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

interface FileTreeViewProps {
	data: FileNode[];
	load: any;
}

const FileTreeView: React.FC<FileTreeViewProps> = ({ data, load }) => {
	const treeRef = useRef<TreeApi<FileNode>>(null);
	const collapsed = useSelector(
		(state: RootState) => state.treeView.collapsed
	);
	const currentNode = useSelector(
		(state: RootState) => state.treeView.currentNode
	);
	const currentWorkspace = useSelector(
		(state: RootState) => state.workspaceApi.current
	);
	const [selectedId, setSelectedId] = React.useState(null);
	const dispatch = useDispatch();

	Node.displayName = "Node";

	const alterAll = (): void => {
		if (collapsed === false) treeRef.current.closeAll();
		else treeRef.current.openAll();
		dispatch(setCollapsed(!collapsed));
	};

	const handleDelete = async () => {
		console.log(currentNode);
		if (!currentNode) return;
		await apiCall(
			"PATCH",
			`api/workspace/${currentNode.id}/delete`,
			{},
			true
		);
		load();
	};

	const handleFileUpload = async () => {
		try {
			const formData = new FormData();
			const fileInput = document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = ".pdf,.docx,.excalidraw,.txt";

			const fileSelected = new Promise<File>((resolve, reject) => {
				fileInput.onchange = (event: Event) => {
					const target = event.target as HTMLInputElement;
					const selectedFile = target.files?.[0];
					if (selectedFile) {
						resolve(selectedFile);
					} else {
						reject(new Error("No file selected"));
					}
				};

				fileInput.oncancel = () => {
					reject();
				};
			});

			fileInput.click();
			const file = await fileSelected;

			formData.append("file", file);
			formData.append("name", file.name);

			const token = getTokenFromCookie();
			const response = await axios({
				method: "POST",
				url: `http://localhost:5000/api/workspace/${
					currentNode.id ? currentNode.id : currentWorkspace?._id
				}/add`,
				data: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			load();
			return response;
		} catch {}
	};

	// const handleFileAdd = async () => {
	// 	try {
	// 		const formData = new FormData();

	// 		// const file = await fileSelected;

	// 		formData.append("file", file);
	// 		formData.append("name", file.name);

	// 		const token = getTokenFromCookie();
	// 		const response = await axios({
	// 			method: "POST",
	// 			url: `http://localhost:5000/api/workspace/${
	// 				currentNode.id ? currentNode.id : currentWorkspace?._id
	// 			}/add`,
	// 			data: formData,
	// 			headers: {
	// 				Authorization: `Bearer ${token}`,
	// 			},
	// 		});
	// 		load();
	// 		return response;
	// 	} catch {}
	// };

	const handleFolderAdd = async () => {
		try {
			const formData = new FormData();
			const fileInput = document.createElement("input");
			fileInput.type = "file";
			fileInput.accept = ".pdf,.docx,.excalidraw,.txt";

			const fileSelected = new Promise<File>((resolve, reject) => {
				fileInput.onchange = (event: Event) => {
					const target = event.target as HTMLInputElement;
					const selectedFile = target.files?.[0];
					if (selectedFile) {
						resolve(selectedFile);
					} else {
						reject(new Error("No file selected"));
					}
				};

				fileInput.oncancel = () => {
					reject();
				};
			});

			fileInput.click();
			const file = await fileSelected;

			formData.append("file", file);
			formData.append("name", file.name);

			const token = getTokenFromCookie();
			const response = await axios({
				method: "POST",
				url: `http://localhost:5000/api/workspace/${
					currentNode.id ? currentNode.id : currentWorkspace?._id
				}/add`,
				data: formData,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			load();
			return response;
		} catch {}
	};

	return (
		<div className="file-tree-container">
			<div className="file-actions">
				<button onClick={() => {}}>
					<FilePlus2 size={20} />
				</button>
				<button onClick={() => {}}>
					<FolderPlus size={20} />
				</button>
				<button onClick={alterAll}>
					{collapsed ? (
						<ChevronsUpDown size={20} />
					) : (
						<ChevronsDownUp size={20} />
					)}
				</button>
				<button onClick={handleFileUpload}>
					<Upload size={20} />
				</button>
				<button onClick={handleDelete}>
					<Trash size={20} />
				</button>
			</div>
			<div className="tree-content">
				<Tree<FileNode>
					ref={treeRef}
					data={data}
					openByDefault={false}
					width="100%"
					height={400}
					indent={24}
					rowHeight={32}
					padding={8}
					onSelect={(node) => {
						dispatch(setCurrentNode(node[0]?.data));
					}}
				>
					{Node}
				</Tree>
			</div>
		</div>
	);
};

export default FileTreeView;
