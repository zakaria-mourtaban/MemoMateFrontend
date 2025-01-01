import { realmPlugin, createRootEditorSubscription$ } from "@mdxeditor/editor";
import { $getRoot } from "lexical";

export const draggablePlugin = realmPlugin({
	init(realm) {
		realm.pub(createRootEditorSubscription$, (editor) => {
			let previousNodeKeys = [];

			editor.registerUpdateListener(() => {
				editor.update(() => {
					const root = $getRoot();
					const nodes = root.getChildren();
					const currentNodeKeys = nodes.map((node) => node.getKey());

					// Compare current keys with previous ones
					if (
						JSON.stringify(currentNodeKeys) !==
						JSON.stringify(previousNodeKeys)
					) {
						previousNodeKeys = currentNodeKeys;

						nodes.forEach((node) => {
							const nodeKey = node.getKey();
							const domElement = editor.getElementByKey(
								nodeKey
							) as HTMLElement;

							if (domElement) {
								let dragHandle = domElement.querySelector(
									".drag-handle"
								) as HTMLElement;

								if (!dragHandle) {
									dragHandle = document.createElement("div");
									dragHandle.className = "drag-handle";
									dragHandle.setAttribute(
										"draggable",
										"true"
									);
									dragHandle.textContent = "⠿"; // Drag handle icon
									dragHandle.style.cursor = "grab";
									dragHandle.style.display = "inline-block";
									dragHandle.style.marginRight = "8px";
									dragHandle.style.userSelect = "none";
									dragHandle.style.backgroundColor = "#ddd";
									dragHandle.style.padding = "4px";
									dragHandle.style.borderRadius = "4px";

									dragHandle.addEventListener(
										"dragstart",
										(event) =>
											handleDragStart(event, nodeKey)
									);
									dragHandle.addEventListener(
										"dragover",
										handleDragOver
									);
									dragHandle.addEventListener(
										"drop",
										handleDrop
									);

									domElement.style.display = "flex";
									domElement.style.alignItems = "center";
									domElement.insertBefore(
										dragHandle,
										domElement.firstChild
									);
								}
							} else {
								console.warn(
									`DOM element not found for nodeKey: ${nodeKey}`
								);
							}
						});
					}
				});
			});

			return () => {
				// Cleanup logic if necessary
			};
		});
	},
});

// Drag event handlers
const handleDragStart = (event: DragEvent, nodeKey: string) => {
	event.stopPropagation(); // Prevent dragging the entire element
	if (nodeKey) {
		event.dataTransfer?.setData("application/lexical-node-key", nodeKey);
		console.log(`Dragging node: ${nodeKey}`);
	}
};

const handleDragOver = (event: DragEvent) => {
	event.preventDefault(); // Enable drop
};

const handleDrop = (event: DragEvent) => {
	event.preventDefault();
	const nodeKey = event.dataTransfer?.getData("application/lexical-node-key");
	console.log(`Dropped node: ${nodeKey}`);
	// Handle node rearrangement logic here
};

export default draggablePlugin;
