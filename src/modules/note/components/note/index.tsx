import { $getRoot, $getSelection } from "lexical";
import React, { useRef } from "react";
import { useEffect } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
import { SelectionAlwaysOnDisplay } from "@lexical/react/LexicalSelectionAlwaysOnDisplay";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import Nodes from "./nodes.tsx";
import { DraggableBlockPlugin_EXPERIMENTAL } from "@lexical/react/LexicalDraggableBlockPlugin";
import basetheme from "./themes/basetheme.ts";
import "./styles/style.css";
import "@fontsource/poppins";
import { DraggableBlockPlugin } from "./plugins/DragableBlockPlugin/DragableBlockPlugin.tsx";

const placeholder = "Let your thoughts flow";

function onError(error) {
	console.error(error);
}

function Note() {
	const initialConfig = {
		namespace: "Note",
		basetheme,
		onError,
		nodes: [...Nodes],
	};
	const menuRef = useRef<HTMLDivElement>(null);
	const targetLineRef = useRef<HTMLDivElement>(null);
	const DRAGGABLE_BLOCK_MENU_CLASSNAME = "draggable-block-menu";

	function isOnMenu(element: HTMLElement): boolean {
		return !!element.closest(`.${DRAGGABLE_BLOCK_MENU_CLASSNAME}`);
	}
	return (
		<LexicalComposer initialConfig={initialConfig}>
			<div className="editor-container">
				<ToolbarPlugin />
				<div className="editor-inner">
					<RichTextPlugin
						contentEditable={
							<ContentEditable
								className="editor-input"
								aria-placeholder={placeholder}
								placeholder={
									<div className="editor-placeholder">
										{placeholder}
									</div>
								}
							/>
						}
						ErrorBoundary={LexicalErrorBoundary}
					/>
					<HistoryPlugin />
					<AutoFocusPlugin />
				</div>
			</div>
			<MarkdownShortcutPlugin transformers={TRANSFORMERS} />
			<DraggableBlockPlugin/>
		</LexicalComposer>
	);
}

export default Note;
