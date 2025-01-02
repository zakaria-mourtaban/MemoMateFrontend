// FileTreeView.tsx
import React, { useRef } from "react";
import { Tree, TreeApi } from "react-arborist";
import Node from "./node";

import "./styles/treeview.css";
import {
	ChevronsDownUp,
	ChevronsUpDown,
	FilePlus2,
	FolderPlus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setCollapsed } from "../../store/store";

interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

// Define props interface for the component
interface FileTreeViewProps {
	data: FileNode[];
}

const FileTreeView: React.FC<FileTreeViewProps> = ({ data }) => {
	const treeRef = useRef<TreeApi<FileNode>>(null);
	const collapsed = useSelector(
		(state: RootState) => state.treeView.collapsed
	);
	const dispatch = useDispatch();
	Node.displayName = "Node";
	const alterAll = (): void => {
		if (collapsed === false) treeRef.current.closeAll();
		else treeRef.current.openAll();
		dispatch(setCollapsed(!collapsed));
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
			</div>
			<div className="tree-content">
				<Tree<FileNode>
					ref={treeRef}
					initialData={data}
					openByDefault={false}
					width="100%"
					height={400}
					indent={24}
					rowHeight={32}
					padding={8}
				>
					{Node}
				</Tree>
			</div>
		</div>
	);
};

export default FileTreeView;
