import React, { useState, useCallback, useEffect } from "react";
import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";
import "../styles/excalidraw.css";
import { apiCall } from "../../core/utils/api";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { debounce } from "lodash";

const ExcalidrawComponent = () => {
	const [excalidrawAPI, setExcalidrawAPI] = useState(null);
	const current = useSelector(
		(state: RootState) => state.treeView.currentNode
	);
	const [initialData, setInitialData] = useState({});

	// Debounced save function
	const debouncedSave = useCallback(
		debounce(async () => {
			if (excalidrawAPI && current?.id && current?.children == null) {
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
					"api/workspace/" + current?.id + "/update",
					data,
					true
				);
			}
		}, 500),
		[excalidrawAPI, current]
	);
	const handleSaveAsExcalidrawFile = () => {
		debouncedSave();
	};
	const loaddata = async () => {
		if (excalidrawAPI && current?.id && current?.children == null) {
			const res = await apiCall(
				"PATCH",
				"api/workspace/" + current?.id + "/file",
				{},
				true
			);
			console.log(res.data);
			excalidrawAPI.updateScene({
				elements: res.data.elements || [],
				appState: res.data.appState || {},
				files: res.data.files || {},
				collaborators: [],
			});
		}
	};
	useEffect(() => {
		loaddata();
	}, [current]);
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
					initialData={initialData}
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
					onChange={() => {
						if (current?.children === null) return;
						handleSaveAsExcalidrawFile();
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
