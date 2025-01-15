// src/Layout.tsx
import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../core/components/navbar";
import TreeViewComponent from "./treeview";
import ExcalidrawComponent from "./excalidraw/Excalidraw";
import "./styles/style.css";
import { ExcalidrawAPIProvider } from "../../context/excalidrawContext";

export interface FileNode {
	id: string;
	name: string;
	children?: FileNode[];
}

const Note: React.FC = () => {
	const [isKmenuOpen, setIsKmenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);

	const commands = [
		"Open File",
		"Create New Note",
		"Search",
		"Close Command Palette",
		"Toggle Sidebar",
		"Open Settings",
		"Open Recent",
	];

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
			if (event.code === "KeyK" && (event.ctrlKey)) {
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
		<ExcalidrawAPIProvider>
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
												alert(
													`Command executed: ${cmd}`
												);
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
		</ExcalidrawAPIProvider>
	);
};

export default Note;
