// src/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../core/components/navbar";
import TreeViewComponent from "./treeview";

// src/types.ts
export interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

const Note: React.FC = () => {
	const treeData: FileNode[] = [
		{
			id: "test2",
			name: "test",
			children: [
				{
					id: "test3",
					name: "test",
				},
				{
					id: "test4",
					name: "test",
					children: [],
				},
			],
		},
		{
			id: "test1",
			name: "testballs",
			children: [],
		},
	];

	return (
		<div>
			<Navbar />
			<div className="main-content">
				<TreeViewComponent data={treeData} />
				<div className="content-area">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Note;
