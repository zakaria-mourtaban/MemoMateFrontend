import {
	AdmonitionDirectiveDescriptor,
	codeBlockPlugin,
	codeMirrorPlugin,
	directivesPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	MDXEditor,
	quotePlugin,
	tablePlugin,
	thematicBreakPlugin,
} from "@mdxeditor/editor";
import React from "react";
import imageUploadHandler from "./utils/imageUploadHandler";
import toolbar from "./toolbar";

const Editor = () => {
	return (
		<MDXEditor
			autoFocus
			markdown="# Hello world
