import React, { useState } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "../styles/excalidraw.css";

const ExcalidrawComponent = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useState(null);
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
					excalidrawAPI={(api)=> setExcalidrawAPI(api)}
					validateEmbeddable={() => true}
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
					onChange={()=>{console.log(excalidrawAPI)}}
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
