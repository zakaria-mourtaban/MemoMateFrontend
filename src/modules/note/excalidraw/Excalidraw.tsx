import React, { useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "../styles/excalidraw.css"

const ExcalidrawComponent = () => {
	//   const excalidrawRef = useRef(null);
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [viewModeEnabled, setViewModeEnabled] = useState(false);
	const [gridVisible, setGridVisible] = useState(true);

	//   const handleSave = () => {
	//     if (excalidrawRef.current) {
	//       const sceneData = excalidrawRef.current.getSceneElements();
	//       console.log("Scene Data:", sceneData);
	//       // Save the sceneData to a server or localStorage
	//     }
	//   };

	//   const handleLoadExample = () => {
	//     const exampleScene = {
	//       elements: [
	//         {
	//           id: "rect1",
	//           type: "rectangle",
	//           x: 100,
	//           y: 100,
	//           width: 200,
	//           height: 100,
	//           strokeColor: "#000000",
	//           backgroundColor: "#ffffff",
	//           fillStyle: "solid",
	//           strokeWidth: 1,
	//           roughness: 1,
	//           opacity: 100,
	//         },
	//       ],
	//       appState: {
	//         viewBackgroundColor: "#f0f0f0",
	//         gridSize: 20,
	//       },
	//     };

	//     excalidrawRef.current.updateScene(exampleScene);
	//   };

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
					validateEmbeddable={() => true}
					theme={theme}
					viewModeEnabled={viewModeEnabled}
					gridModeEnabled={gridVisible}
					// onChange={(elements, state) => {
					// 	console.log("Elements:", elements, "State:", state);
					// }}
					initialData={{
						elements: [],
						appState: {
							viewBackgroundColor: "#ffffff",
							gridSize: 20,
						},
					}}
					name="Excalidraw Canvas"
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
