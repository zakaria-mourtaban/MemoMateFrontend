import React, { useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "../styles/excalidraw.css";
import { apiCall } from "../../core/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ExcalidrawComponent = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useState(null);
	const current = useSelector(
		(state: RootState) => state.treeView.currentNode
	);
	const handleSaveAsExcalidrawFile = async () => {
		if (excalidrawAPI && current?._id) {
			const elements =
				await excalidrawAPI.getSceneElementsIncludingDeleted();
			const appState = excalidrawAPI.getAppState();
			const files = excalidrawAPI.getFiles();

			const data = JSON.stringify({
				elements,
				appState,
				files,
			});
			await apiCall(
				"POST",
				"api/workspace/" + current?._id + "/update",
				data,
				true
			);
		}
	};

	const handleLoadExcalidrawFile = async () => {
		if (excalidrawAPI && current?._id) {
			const res = await apiCall(
				"POST",
				"api/workspace/" + current?._id + "/fetch",
				{},
				true
			);
		}
	};

	return (
		<div
			style={{
				height: "80vh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<div style={{ flex: 1 }}>
				<Excalidraw
					excalidrawAPI={(api) => setExcalidrawAPI(api)}
					initialData={{
						elements: [],
						appState: {
							viewBackgroundColor: "#ffffff",
							gridSize: 20,
						},
					}}
					name="Excalidraw Canvas"
					handleKeyboardGlobally={true}
					UIOptions={{
						canvasActions: {
							loadScene: true,
							saveToActiveFile: false,
							saveAsImage: true,
							export: { saveFileToDisk: true },
							clearCanvas: true,
							toggleTheme: true,
						},
					}}
					onChange={handleSaveAsExcalidrawFile}
				>
					<MainMenu>
						<MainMenu.DefaultItems.LoadScene></MainMenu.DefaultItems.LoadScene>
						<MainMenu.DefaultItems.Export></MainMenu.DefaultItems.Export>
						<MainMenu.DefaultItems.SaveAsImage></MainMenu.DefaultItems.SaveAsImage>
						<MainMenu.DefaultItems.ToggleTheme></MainMenu.DefaultItems.ToggleTheme>
						<MainMenu.DefaultItems.ChangeCanvasBackground></MainMenu.DefaultItems.ChangeCanvasBackground>
						<MainMenu.DefaultItems.ClearCanvas></MainMenu.DefaultItems.ClearCanvas>
					</MainMenu>
				</Excalidraw>
			</div>
		</div>
	);
};

export default ExcalidrawComponent;
