import { createSlice, configureStore } from "@reduxjs/toolkit";

const ExcalidrawSlice = createSlice({
	name: "Excalidraw",
	initialState: {
		excalidrawAPI: null,
	},
	reducers: {
		setExcalidrawApi: (state, action) => {
			state.excalidrawAPI = action.payload;
		},
	},
});

const treeViewSlice = createSlice({
	name: "treeView",
	initialState: {
		collapsed: false,
	},
	reducers: {
		setCollapsed: (state, action) => {
			state.collapsed = action.payload;
		},
	},
});

const workspaceApiSlice = createSlice({
	name: "workspaceApi",
	initialState: {
		workspaces: [],
		current: null,
	},
	reducers: {
		setWorkspace: (state, action) => {
			state.workspaces = action.payload;
		},
		setCurrent: (state, action) => {
			state.current = action.payload;
		},
	},
});

export const { setCollapsed } = treeViewSlice.actions;
export const { setWorkspace } = workspaceApiSlice.actions;
export const { setCurrent } = workspaceApiSlice.actions;

const store = configureStore({
	reducer: {
		treeView: treeViewSlice.reducer,
		workspaceApi: workspaceApiSlice.reducer,
		excalidraw: ExcalidrawSlice.reducer
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
