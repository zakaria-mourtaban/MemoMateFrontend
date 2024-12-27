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
	RealmProvider
} from "@mdxeditor/editor";

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
	const editorref = useRef<MDXEditorMethods>(null);
	const currentSelection = useCellValue(currentSelection$);
	return (
		<MDXEditor
			ref={editorref}
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
							<Button
								onClick={() => {
									console.log(currentSelection);
								}}
							>
								AI
							</Button>
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
			<Editor/>
		</RealmProvider>
	)
}
export default App;
