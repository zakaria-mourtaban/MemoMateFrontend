import { createSlice, configureStore } from '@reduxjs/toolkit';

// Create the slice
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

// Export actions
export const { setCollapsed } = treeViewSlice.actions;

// Create the store
const store = configureStore({
  reducer: {
    treeView: treeViewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;