import { useCallback, useEffect, useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";

export const useEditorKeys = () => {
	const [editor] = useLexicalComposerContext();

	const getEditorKeys = useCallback(() => {
		return editor.getEditorState().read(() => $getRoot().getChildrenKeys());
	}, [editor]);

	// We set keys on app start ...
	const [keys, setKeys] = useState<string[]>(getEditorKeys());

	useEffect(() => {
		return editor.registerUpdateListener(() => {
			// ... and on any state change
			setKeys(getEditorKeys());
		});
	}, [editor, getEditorKeys]);

	return { keys };
};
