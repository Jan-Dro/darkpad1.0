// import { configureStore, createSlice } from '@reduxjs/toolkit';

// const drawingSlice = createSlice({
//     name: 'drawing',
//     initialState: {
        
//       paths: [],
//       isEraser: false,
//       currentColor: 'black',
//       strokeWidth: 4,
//       rotation: 0,
//       scale: 1,
//       translate: { x: 0, y: 0 },
//     },
//     reducers: {
//       setPaths: (state, action) => {
//         state.paths = [...state.paths, ...action.payload];
//       },
//       setEraser: (state, action) => {
//         state.isEraser = action.payload;
//       },
//       setStrokeWidth: (state, action) => {
//         state.strokeWidth = action.payload;
//       },
//       setColor: (state, action) => {
//         state.currentColor = action.payload;
//       },
//       setRotation: (state, action) => {
//         state.rotation = action.payload;
//       },
//       setScale: (state, action) => {
//         state.scale = action.payload;
//       },
//       setTranslate: (state, action) => {
//         state.translate = action.payload;
//       },

//     },
//   });
  
//   export const { setPaths, setEraser, setColor, setStrokeWidth, setRotation, setScale, setTranslate } = drawingSlice.actions;
  
//   const store = configureStore({
//     reducer: {
//       drawing: drawingSlice.reducer
//     }
//   });
  
//   export default store;


import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
    layers: [],
    activeLayerIndex: -1,
    paths: [],
    isEraser: false,
    currentColor: 'black',
    strokeWidth: 4,
    brushSettingsVisible: false,
};

const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
        reducers: {
          addLayer: (state) => {
            const newLayer = {
              name: `Layer ${state.layers.length + 1}`,
              visible: true,  // Make sure this property is set
              paths: [],
            };
            state.layers.push(newLayer);
            state.activeLayerIndex = state.layers.length - 1;
          },
        deleteLayer: (state, action) => {
            if (state.layers.length > 1) {
                state.layers.splice(action.payload, 1);
                state.activeLayerIndex = Math.max(0, state.activeLayerIndex - 1);
            }
        },
        setActiveLayerIndex: (state, action) => {
            state.activeLayerIndex = action.payload;
        },
        toggleLayerVisibility: (state, action) => {
            const layer = state.layers[action.payload];
            if (layer) {
                layer.visible = !layer.visible;
            }
        },
      setPaths: (state, action) => {
        state.paths = [...state.paths, ...action.payload];
      },
      setEraser: (state, action) => {
        state.isEraser = action.payload;
      },
      setStrokeWidth: (state, action) => {
        state.strokeWidth = action.payload;
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
      setTranslate: (state, action) => {
        state.translate = action.payload;
      },
      toggleBrushSettingsVisibility: state => {
        state.brushSettingsVisible = !state.brushSettingsVisible;
      },
      showBrushSettings: state => {
          state.brushSettingsVisible = true;
      },
      hideBrushSettings: state => {
          state.brushSettingsVisible = false;
      },

    },
  });
  
  export const { 
    setPaths, 
    setEraser, 
    setColor, 
    setStrokeWidth, 
    setRotation, 
    setScale, 
    setTranslate, 
    addLayer, 
    deleteLayer, 
    setActiveLayerIndex, 
    toggleLayerVisibility,
    toggleBrushSettingsVisibility,
    showBrushSettings,
    hideBrushSettings
} = drawingSlice.actions;
  
  const store = configureStore({
    reducer: {
      drawing: drawingSlice.reducer
    }
  });
  
  export default store;