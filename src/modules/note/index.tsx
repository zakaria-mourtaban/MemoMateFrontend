import "@mdxeditor/editor/style.css";
import React from "react";
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

function App() {
	return (
		<MDXEditor
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
							<InsertImage />
							<CreateLink />
							<InsertTable />
							<InsertThematicBreak />
							<ListsToggle />
							<InsertCodeBlock />
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
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
			]}
		/>
	);
}
export default App;
