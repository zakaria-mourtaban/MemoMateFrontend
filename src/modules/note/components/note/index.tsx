import { $getRoot, $getSelection } from "lexical";
import React from "react";
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
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { SelectionAlwaysOnDisplay } from "@lexical/react/LexicalSelectionAlwaysOnDisplay";
import ToolbarPlugin from "./plugins/ToolbarPlugin.tsx";
import basetheme from "./themes/basetheme.ts";
import "./styles/style.css";
import "@fontsource/poppins";

const placeholder = "Let your thoughts flow";

function onError(error) {
	console.error(error);
}

function Note() {
	const initialConfig = {
		namespace: "Note",
		basetheme,
		onError,
	};

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
					<MarkdownShortcutPlugin />
				</div>
			</div>
		</LexicalComposer>
	);
}

export default Note;
