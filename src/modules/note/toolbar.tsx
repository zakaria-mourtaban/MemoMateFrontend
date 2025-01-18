import React from "react";
import AISelection from "./AISelection";
import {
	toolbarPlugin,
	UndoRedo,
	BoldItalicUnderlineToggles,
	BlockTypeSelect,
	CreateLink,
	InsertImage,
	InsertTable,
	InsertCodeBlock,
	InsertThematicBreak,
	ListsToggle,
} from "@mdxeditor/editor";

const toolbar = () => {
	return toolbarPlugin({
		toolbarClassName: "toolbar",
		toolbarContents: () => (
			<>
				<UndoRedo />
				<BoldItalicUnderlineToggles />
				<BlockTypeSelect />
				<CreateLink />
				<InsertImage />
				<InsertTable />
			</>
		),
	});
};

export default toolbar