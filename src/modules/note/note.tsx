// src/Layout.tsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../core/components/navbar";
import TreeViewComponent from "./treeview";
import ExcalidrawComponent from "./excalidraw/Excalidraw";
import "./styles/style.css";
import { useNoteHandler } from "./hooks/useNoteHandler";

export interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

const Note: React.FC = () => {
	const {
		isKmenuOpen,
		searchQuery,
		selectedIndex,
		treeData,
		filteredCommands,
		commands,
		setSearchQuery,
		setSelectedIndex,
		toggleKmenu,
		indexCaller,
		loadTree,
		currentNode
	} = useNoteHandler();

	return (
		<div className="note-container">
			<Navbar />
			<div className="main-content">
				<div className="treeview">
					<TreeViewComponent data={treeData} load={loadTree} />
				</div>
				<div className="content-area">
					<ExcalidrawComponent/>
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
