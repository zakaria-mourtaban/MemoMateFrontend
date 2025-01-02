// src/Layout.tsx
import React from "react";
import Navbar from "../core/components/navbar";
import TreeViewComponent from "./treeview";
import ExcalidrawComponent from "./excalidraw/Excalidraw";
import "./styles/style.css";
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
					name: "tedsfsdfsdst",
					children: [
						{
							id: "test5",
							name: "tesdsfsdfsdft",
							children: [
								{
									id: "test6",
									name: "tessdsdffsdft",
									children: [],
								},
							],
						},
					],
				},
			],
		},
		{
			id: "test1",
			name: "testing",
			children: [],
		},
	];

	return (
		<div>
			<Navbar />
			<div className="main-content">
				<div className="treeview">
					<TreeViewComponent data={treeData} />
				</div>
				<div className="content-area">
					<ExcalidrawComponent />
				</div>
			</div>
		</div>
	);
};

export default Note;
