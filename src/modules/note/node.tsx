import {
	ChevronDown,
	ChevronRight,
} from "lucide-react";
import React from "react";
import { NodeApi } from "react-arborist";
import "./styles/node.css"

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
				<span className="node-name">{node.data.name}</span>
			</div>
		);
	}
);

export default Node;
