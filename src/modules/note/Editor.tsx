import {
	AdmonitionDirectiveDescriptor,
	BlockTypeSelect,
	BoldItalicUnderlineToggles,
	codeBlockPlugin,
	codeMirrorPlugin,
	CreateLink,
	directivesPlugin,
	headingsPlugin,
	imagePlugin,
	InsertCodeBlock,
	InsertImage,
	InsertTable,
	InsertThematicBreak,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	ListsToggle,
	markdownShortcutPlugin,
	MDXEditor,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
	UndoRedo,
} from "@mdxeditor/editor";
import React from "react";
import AISelection from "./AISelection";
import imageUploadHandler from "./utils/imageUploadHandler";

const Editor = () => {
	return (
		<MDXEditor
			autoFocus
			markdown="# Hello world
			sadsadasd
			asdasdsa"
			plugins={[
				toolbarPlugin({
					toolbarClassName: "toolbar",
					toolbarContents: () => (
						<>
							<UndoRedo />
							<BoldItalicUnderlineToggles />
							<BlockTypeSelect />
							<CreateLink />
							<InsertImage />
							<InsertTable />
							<InsertCodeBlock />
							<InsertThematicBreak />
							<ListsToggle />
							<AISelection />
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
				tablePlugin(),
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
				// DraggableParagraphPlugin(),
			]}
		/>
	);
};

export default Editor