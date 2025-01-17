import React, { useRef, useState } from "react";
import { Tree, TreeApi } from "react-arborist";
import Node from "./node";
import "./styles/treeview.css";
import {
  ChevronsDownUp,
  ChevronsUpDown,
  FilePlus2,
  FolderPlus,
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
}

const FileTreeView: React.FC<FileTreeViewProps> = ({ data }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const treeRef = useRef<TreeApi<FileNode>>(null);
	const collapsed = useSelector(
		(state: RootState) => state.treeView.collapsed
	);
	const currentNode = useSelector(
		(state: RootState) => state.treeView.currentNode
	);
	const dispatch = useDispatch();

	Node.displayName = "Node";

  const alterAll = (): void => {
    if (collapsed === false) treeRef.current.closeAll();
    else treeRef.current.openAll();
    dispatch(setCollapsed(!collapsed));
  };

	const handleFileUpload = async () => {
		if (!selectedFile) return;

		const formData = new FormData();
		formData.append("file", selectedFile);

		try {
			const response = await axios.post(
				"/api/workspace/:id/add",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			if (response.status === 200) {
				console.log("File uploaded successfully");
			}
		} catch (error) {
			console.error("Error uploading file:", error);
		}
	};

	return (
		<div className="file-tree-container">
			<div className="file-actions">
				<button>
					<FilePlus2 size={25} />
				</button>
				<button>
					<FolderPlus size={25} />
				</button>
				<button onClick={alterAll}>
					{collapsed ? (
						<ChevronsUpDown size={25} />
					) : (
						<ChevronsDownUp size={25} />
					)}
				</button>
				<button onClick={handleFileUpload}>
					<Upload />
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
						return dispatch(setCurrentNode(node));
					}}
				>
					{Node}
				</Tree>
			</div>
		</div>
	);
};

export default FileTreeView;
