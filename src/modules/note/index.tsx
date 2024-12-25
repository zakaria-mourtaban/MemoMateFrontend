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
	ListsToggle,
} from "@mdxeditor/editor";

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
							<CodeToggle />
							<InsertImage />
							<CreateLink />
							<InsertTable />
							<InsertThematicBreak />
							<ListsToggle/>
						</>
					),
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
