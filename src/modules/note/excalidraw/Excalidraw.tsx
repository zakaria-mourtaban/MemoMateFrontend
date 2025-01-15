import React from "react";
import {
	convertToExcalidrawElements,
	Excalidraw,
	MainMenu,
} from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import "../styles/excalidraw.css";
import { useExcalidrawAPI } from "../../../context/excalidrawContext";

const ExcalidrawComponent = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useExcalidrawAPI();

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
					validateEmbeddable={() => true}
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
