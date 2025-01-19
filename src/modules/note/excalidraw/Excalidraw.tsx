import React, { useState } from "react";
import {
  Excalidraw,
  MainMenu,
} from "@excalidraw/excalidraw";
import "../styles/excalidraw.css";

const ExcalidrawComponent = () => {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const handleSaveAsExcalidrawFile = async () => {
    if (excalidrawAPI) {
      const elements = await excalidrawAPI.getSceneElementsIncludingDeleted();
      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      const data = JSON.stringify({
        elements,
        appState,
        files,
      });

      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "canvas.excalidraw";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
      alert("Canvas saved as .excalidraw file!");
    }
  };

  const handleLoadExcalidrawFile = (event) => {
	const file = event.target.files[0];
	if (file) {
	  const reader = new FileReader();
	  reader.onload = (e) => {
		const result = e.target.result;
		if (typeof result === "string") {
		  const json = JSON.parse(result);
		  if (json && excalidrawAPI) {
			excalidrawAPI.updateScene(json);
			alert("Canvas loaded from .excalidraw file!");
		  }
		} else {
		  alert("Invalid file format. Please upload a valid .excalidraw file.");
		}
	  };
	  reader.readAsText(file);
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
