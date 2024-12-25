import { configureStore, createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Define the Draggable type
type Draggable = {
  htmlElement: HTMLElement;
  data: {
    top: number;
    left: number;
    height: number;
  };
};

// Define the initial state
const initialState = {
  draggable: undefined as Draggable | undefined,
};

// Create a slice for the draggable store
const draggableSlice = createSlice({
  name: 'draggable',
  initialState,
  reducers: {
    setDraggable: (state, action) => {
      state.draggable = action.payload;
    },
  },
});

// Extract the actions
export const { setDraggable } = draggableSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    draggable: draggableSlice.reducer,
  },
});

// Hook to access the draggable state
export const useDraggableStore = () => {
  const dispatch = useDispatch();
  const draggable = useSelector((state: { draggable: typeof initialState }) => state.draggable.draggable);

  return {
    draggable,
    setDraggable: (value: Draggable) => dispatch(setDraggable(value)),
  };
};
