import { configureStore, createSlice } from '@reduxjs/toolkit';

const drawingSlice = createSlice({
  name: 'drawing',
  initialState: {
    paths: [],
    isEraser: false,
    currentColor: 'black',
    strokeWidth: 4,
    rotation: 0,
    scale: 1,
    translate: { x: 0, y: 0 },
  },
  reducers: {
    setPaths: (state, action) => {
        state.paths = [...state.paths, ...action.payload];
      },
    setEraser: (state, action) => {
        state.isEraser = action.payload;
    },
    setStrokeWidth: (state, action) => {
        state.strokeWidth = action.payload;  // This reducer handles stroke width changes
    },
    setColor: (state, action) => {
      state.currentColor = action.payload;
    },
    setRotation: (state, action) => {
      state.rotation = action.payload;
    },
    setScale: (state, action) => {
      state.scale = action.payload;
    },
  },
});

export const { setPaths, setEraser, setColor, setStrokeWidth, setRotation, setScale } = drawingSlice.actions;

const store = configureStore({
  reducer: {
    drawing: drawingSlice.reducer
  }
});

export default store;