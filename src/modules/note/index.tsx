import "@mdxeditor/editor/style.css";
import React, { useRef } from "react";
import {
	MDXEditor,
	headingsPlugin,
	listsPlugin,
	quotePlugin,
	thematicBreakPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	toolbarPlugin,
	BlockTypeSelect,
	linkPlugin,
	linkDialogPlugin,
	CodeToggle,
	CreateLink,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	InsertCodeBlock,
	ListsToggle,
	codeBlockPlugin,
	codeMirrorPlugin,
	imagePlugin,
	markdownShortcutPlugin,
	directivesPlugin,
	AdmonitionDirectiveDescriptor,
	Button,
	MDXEditorMethods,
	useCellValue,
	currentSelection$,
	RealmProvider,
	activePlugins$,
	editorInFocus$,
	activeEditor$,
	rootEditor$,
	useCell,
} from "@mdxeditor/editor";

import { $getSelection, $isRangeSelection } from "lexical";

const GetSelection = () => {
	// Access the root editor instance
	const rootEditor = useCellValue(rootEditor$);

	const getCurrentSelection = () => {
		if (rootEditor) {
			rootEditor.update(() => {
				// Get the current selection
				const selection = $getSelection();

				if (selection && $isRangeSelection(selection)) {
					// Access details about the selection
					const anchorNode = selection.anchor.getNode();
					const focusNode = selection.focus.getNode();
					const selectedText = selection.getTextContent();

					console.log("Anchor Node:", anchorNode);
					console.log("Focus Node:", focusNode);
					console.log("Selected Text:", selectedText);
				} else {
					console.log("No text selection found.");
				}
			});
		}
	};

	return <Button onClick={getCurrentSelection}>getSelection</Button>;
};
async function imageUploadHandler(image: File) {
	const formData = new FormData();
	formData.append("image", image);
	// send the file to your server and return
	// the URL of the uploaded image in the response
	const response = await fetch("/uploads/new", {
		method: "POST",
		body: formData,
	});
	const json = (await response.json()) as { url: string };
	return json.url;
}

function Editor() {
	const currentSelection = useCellValue(currentSelection$);
	const rootEditor = useCell(rootEditor$);
	console.log(rootEditor);
	return (
		<MDXEditor
			autoFocus
			markdown="# Hello world"
			plugins={[
				toolbarPlugin({
					toolbarClassName: "my-classname",
					toolbarContents: () => (
						<>
							{" "}
							<UndoRedo />
							<BoldItalicUnderlineToggles />
							<BlockTypeSelect />
							<CreateLink />
							<InsertImage />
							<InsertTable />
							<InsertCodeBlock />
							<InsertThematicBreak />
							<ListsToggle />
							<GetSelection />
						</>
					),
				}),
				imagePlugin({ imageUploadHandler }),
				codeBlockPlugin({ defaultCodeBlockLanguage: "js" }),
				codeMirrorPlugin({
					codeBlockLanguages: {
						js: "JavaScript",
						ts: "Typescript",
						tsx: "React TSX",
						json: "JSON",
						diff: "Diff",
						typescript: "Typescript",
					},
				}),
				thematicBreakPlugin(),
				linkDialogPlugin(),
				headingsPlugin(),
				listsPlugin(),
				linkPlugin(),
				quotePlugin(),
				markdownShortcutPlugin(),
				directivesPlugin({
					directiveDescriptors: [AdmonitionDirectiveDescriptor],
				}),
			]}
		/>
	);
}

const App = () => {
	return (
		<RealmProvider>
			<Editor />
		</RealmProvider>
	);
};
export default App;
