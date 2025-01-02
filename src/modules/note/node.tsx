import {
	FolderOpen,
	Folder,
	File,
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import React from "react";
import { NodeApi } from "react-arborist";

interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

type NodeProps = {
	node: NodeApi<FileNode>;
	style: React.CSSProperties;
	dragHandle?: (element: HTMLElement | null) => void;
};

const Node = React.forwardRef<HTMLDivElement, NodeProps>(
	({ node, style, dragHandle }, ref) => {
		const isFolder = Boolean(node.data.children);

		return (
			<div
				ref={dragHandle || null}
				className={`tree-node ${
					node.state.isSelected ? "selected" : ""
				}`}
				style={style}
			>
				<button
					className="toggle-button"
					onClick={() => node.toggle()}
					type="button"
				>
					{isFolder &&
						(node.isOpen ? (
							<ChevronDown className="icon" />
						) : (
							<ChevronRight className="icon" />
						))}
				</button>

				{isFolder ? (
					node.isOpen ? (
						<FolderOpen className="icon folder" />
					) : (
						<Folder className="icon folder" />
					)
				) : (
					<File className="icon file" />
				)}

				<span className="node-name">{node.data.name}</span>
			</div>
		);
	}
);

export default Node;
