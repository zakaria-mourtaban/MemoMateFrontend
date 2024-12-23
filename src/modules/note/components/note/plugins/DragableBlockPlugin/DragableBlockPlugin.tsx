import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { DraggableElement } from "./DragableElement/DragableElement.tsx";
import { OnDragLine } from "./DragableLine/DragableLine.tsx";
import { useDragListeners } from "./hooks/useDragListeners.tsx";

export const DraggableBlockPlugin: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	
	useDragListeners();
	
	const isEditable = editor.isEditable();
	
	if (!isEditable) {
		return null;
	}
	return (
		<>
			<DraggableElement />
			<OnDragLine />
		</>
	);
};
