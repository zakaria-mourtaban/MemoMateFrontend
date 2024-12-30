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

	return (
		<Button onClick={getCurrentSelection}>
			<svg
				width="25"
				height="25"
				viewBox="0 0 25 25"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M16.9271 21.3542H16.0417C15.1024 21.3542 14.2015 20.981 13.5373 20.3168C12.8731 19.6526 12.5 18.7518 12.5 17.8125V7.18749C12.5 6.24819 12.8731 5.34735 13.5373 4.68316C14.2015 4.01897 15.1024 3.64583 16.0417 3.64583H16.9271"
					stroke="black"
					stroke-width="1.77083"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M8.07291 21.3542H8.95832C9.89763 21.3542 10.7985 20.981 11.4627 20.3168C12.1269 19.6527 12.5 18.7518 12.5 17.8125V16.9271"
					stroke="black"
					stroke-width="1.77083"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M8.07291 3.64583H8.95832C9.89763 3.64583 10.7985 4.01897 11.4627 4.68316C12.1269 5.34735 12.5 6.24819 12.5 7.18749V8.07291"
					stroke="black"
					stroke-width="1.77083"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<g clip-path="url(#clip0_1_2)">
					<path
						d="M5.15027 7.41146C5.12702 7.32133 5.08005 7.23909 5.01423 7.17328C4.94842 7.10746 4.86617 7.06049 4.77605 7.03724L3.1784 6.62526C3.15114 6.61752 3.12715 6.60111 3.11007 6.5785C3.09298 6.55589 3.08374 6.52833 3.08374 6.5C3.08374 6.47166 3.09298 6.4441 3.11007 6.4215C3.12715 6.39889 3.15114 6.38248 3.1784 6.37474L4.77605 5.9625C4.86614 5.93927 4.94837 5.89234 5.01418 5.82657C5.07999 5.76081 5.12698 5.67862 5.15027 5.58854L5.56225 3.99088C5.56991 3.96352 5.58631 3.93941 5.60895 3.92224C5.63159 3.90506 5.65922 3.89577 5.68764 3.89577C5.71606 3.89577 5.74369 3.90506 5.76633 3.92224C5.78897 3.93941 5.80537 3.96352 5.81303 3.99088L6.22475 5.58854C6.248 5.67866 6.29497 5.76091 6.36079 5.82672C6.4266 5.89254 6.50885 5.93951 6.59897 5.96276L8.19662 6.37448C8.2241 6.38206 8.24833 6.39844 8.26559 6.42111C8.28286 6.44379 8.29221 6.4715 8.29221 6.5C8.29221 6.5285 8.28286 6.55621 8.26559 6.57889C8.24833 6.60156 8.2241 6.61794 8.19662 6.62552L6.59897 7.03724C6.50885 7.06049 6.4266 7.10746 6.36079 7.17328C6.29497 7.23909 6.248 7.32133 6.22475 7.41146L5.81277 9.00911C5.80511 9.03648 5.78871 9.06059 5.76607 9.07776C5.74343 9.09493 5.7158 9.10423 5.68738 9.10423C5.65896 9.10423 5.63133 9.09493 5.60869 9.07776C5.58605 9.06059 5.56965 9.03648 5.56199 9.00911L5.15027 7.41146Z"
						stroke="black"
						stroke-width="0.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>
				<g clip-path="url(#clip1_1_2)">
					<path
						d="M19.0878 18.9115C19.0645 18.8213 19.0175 18.7391 18.9517 18.6733C18.8859 18.6075 18.8037 18.5605 18.7136 18.5372L17.1159 18.1253C17.0886 18.1175 17.0646 18.1011 17.0476 18.0785C17.0305 18.0559 17.0212 18.0283 17.0212 18C17.0212 17.9717 17.0305 17.9441 17.0476 17.9215C17.0646 17.8989 17.0886 17.8825 17.1159 17.8747L18.7136 17.4625C18.8036 17.4393 18.8859 17.3923 18.9517 17.3266C19.0175 17.2608 19.0645 17.1786 19.0878 17.0885L19.4997 15.4909C19.5074 15.4635 19.5238 15.4394 19.5464 15.4222C19.5691 15.4051 19.5967 15.3958 19.6251 15.3958C19.6536 15.3958 19.6812 15.4051 19.7038 15.4222C19.7265 15.4394 19.7429 15.4635 19.7505 15.4909L20.1622 17.0885C20.1855 17.1787 20.2325 17.2609 20.2983 17.3267C20.3641 17.3925 20.4463 17.4395 20.5365 17.4628L22.1341 17.8745C22.1616 17.8821 22.1858 17.8984 22.2031 17.9211C22.2204 17.9438 22.2297 17.9715 22.2297 18C22.2297 18.0285 22.2204 18.0562 22.2031 18.0789C22.1858 18.1016 22.1616 18.1179 22.1341 18.1255L20.5365 18.5372C20.4463 18.5605 20.3641 18.6075 20.2983 18.6733C20.2325 18.7391 20.1855 18.8213 20.1622 18.9115L19.7503 20.5091C19.7426 20.5365 19.7262 20.5606 19.7036 20.5778C19.6809 20.5949 19.6533 20.6042 19.6249 20.6042C19.5965 20.6042 19.5688 20.5949 19.5462 20.5778C19.5235 20.5606 19.5071 20.5365 19.4995 20.5091L19.0878 18.9115Z"
						stroke="black"
						stroke-width="0.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</g>
				<defs>
					<clipPath id="clip0_1_2">
						<rect
							width="6.25"
							height="6.25"
							fill="white"
							transform="translate(2.5625 3.375)"
						/>
					</clipPath>
					<clipPath id="clip1_1_2">
						<rect
							width="6.25"
							height="6.25"
							fill="white"
							transform="translate(16.5 14.875)"
						/>
					</clipPath>
				</defs>
			</svg>
		</Button>
	);
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
