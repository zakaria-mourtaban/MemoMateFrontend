import { createSlice, configureStore } from '@reduxjs/toolkit';

const treeViewSlice = createSlice({
  name: 'treeView',
  initialState: {
    collapsed: false,
  },
  reducers: {
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
  },
});

export const { setCollapsed } = treeViewSlice.actions;

const store = configureStore({
  reducer: {
    treeView: treeViewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;