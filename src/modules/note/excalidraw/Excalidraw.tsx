import React, { useState } from "react";
import {
	convertToExcalidrawElements,
	Excalidraw,
	MainMenu,
} from "@excalidraw/excalidraw";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import "../styles/excalidraw.css";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const ExcalidrawComponent = () => {
	const excalidrawAPI = useSelector((state : RootState)=> {state.})

	return (
		<div
			style={{
				height: "100vh",
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
						<button
							onClick={async () => {
								const { elements } =
									await parseMermaidToExcalidraw(
										`graph TD
								A[Start] --> B{Is it working?}
								B -->|Yes| C[Continue]
								B -->|No| D[Fix it]
								D --> B
							`
									);

								const excalidrawelements =
									convertToExcalidrawElements(elements);
								let sceneelements = await excalidrawAPI.getSceneElements();
								sceneelements = sceneelements.concat(excalidrawelements)
								excalidrawAPI.updateScene({elements : sceneelements})
							}}
						>
							tryme
						</button>
					</MainMenu>
				</Excalidraw>
			</div>
		</div>
	);
};

export default ExcalidrawComponent;
function parseMermaid(
	diagramDefinition: any,
	arg1: { fontSize: number }
): { elements: any; files: any } | PromiseLike<{ elements: any; files: any }> {
	throw new Error("Function not implemented.");
}
