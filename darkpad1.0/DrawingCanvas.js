
// import React, { useState, useRef, useEffect } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Canvas, Path, useTouchHandler, Skia, PaintStyle, BlendMode, enumKey } from '@shopify/react-native-skia';
// import Sidebar from './Sidebar';
// import { PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State as GestureState} from 'react-native-gesture-handler';
// import { useSelector, useDispatch } from 'react-redux';

// import BrushSettings from './BrushSettings';


// const DrawingCanvas = () => {
//   const dispatch = useDispatch();
//   const [paths, setPaths] = useState([]);
//   const [isEraser, setIsEraser] = useState(false);
//   const [currentColor, setCurrentColor] = useState('black');
//   const [strokeWidth, setStrokeWidth] = useState(4);

//   const [rotation, setRotation] = useState(0);
//   const lastRotation = useRef(0);
//   const [scale, setScale] = useState(1);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const scaleRef = useRef(1);
//   const lastScale = useRef(1);
//   const [zoomScale, setZoomScale] = useState(1)
//   const [focalPoint, setFocalPoint] = useState({ x: 0, y: 0 });

//   const currentPathRef = useRef(null);
//   const paint = useRef(Skia.Paint());

  
//   const [brushSettings, setBrushSettings] = useState({
//     size: 4,
//     opacity: 1,
//     color: 'black',
//     shape: 'round', 
//     texture: null, 
//   });
//   const updatePaint = (isEraserMode) => {
//     paint.current = Skia.Paint();

//     if (isEraserMode) {
//       paint.current.setBlendMode(BlendMode[enumKey("clear")]);
//       paint.current.setAntiAlias(false);
//       paint.current.setStrokeWidth(brushSettings.size);
//       paint.current.setStyle(PaintStyle.Stroke)
//     } else {
//       paint.current.setBlendMode(BlendMode.SrcOver);
//       paint.current.setColor(Skia.Color(brushSettings.color));
//       paint.current.setAlphaf(brushSettings.opacity);
//       paint.current.setStrokeWidth(brushSettings.size);
//       paint.current.setAntiAlias(true);
//       paint.current.setStyle(PaintStyle.Stroke);
//     }
//   };


//   useEffect(() => {
//     updatePaint(isEraser);
//   }, [isEraser, brushSettings]);

  // const touchHandler = useTouchHandler({
  //   onStart: ({ x, y }) => {
  //     const path = Skia.Path.Make();
  //     path.moveTo(x, y);
  //     currentPathRef.current = { path, paint: paint.current.copy() };
  //   },
  //   onActive: ({ x, y }) => {
  //     if (currentPathRef.current) {
  //       currentPathRef.current.path.lineTo(x, y);
  //       setPaths(paths => [...paths.slice(0, -1), currentPathRef.current]);
  //     }
  //   },
  //   onEnd: () => {
  //     if (currentPathRef.current) {
  //       setPaths(paths => [...paths, currentPathRef.current]);
  //       currentPathRef.current = null;
  //     }
  //   },
  // });
  
//   const onPinchEvent = event => {
//     if (event.nativeEvent.state === GestureState.ACTIVE) {
//       const newScale = lastScale.current * event.nativeEvent.scale;
//       setScale(newScale);
//     } else if (event.nativeEvent.state === GestureState.END) {
//       lastScale.current = scale;
//     }
//   };
//   const onRotateEvent = event => {
//     if (event.nativeEvent.state === GestureState.ACTIVE) {
//       setRotation(event.nativeEvent.rotation + lastRotation.current);
//     } else if (event.nativeEvent.state === GestureState.END) {
//       lastRotation.current = lastRotation.current + event.nativeEvent.rotation;
//     }
//   };





//   return (
//     <View style={styles.container}>
//       <Sidebar onPaint={() => setIsEraser(false)} onErase={() => setIsEraser(true)} />
//       <BrushSettings onSettingsChange={setBrushSettings} />
//       <RotationGestureHandler onGestureEvent={onRotateEvent}>
//         <PinchGestureHandler onGestureEvent={onPinchEvent}>
//           <View style={styles.canvasContainer}>
            // <Canvas style={[styles.canvas, {
            //    transform: [
            //     { translateX: translate.x },
            //     { translateY: translate.y },
            //     { scale: scale },
            //     { rotate: `${rotation}rad` } 
            //   ]
            // }]} onTouch={touchHandler}>
            //   {paths.map(({ path, paint }, index) => (
            //     <Path key={index} path={path} paint={paint} />
            //   ))}
            //   {currentPathRef.current && (
            //     <Path path={currentPathRef.current.path} paint={currentPathRef.current.paint} />
            //   )}
            // </Canvas>
//           </View>
//         </PinchGestureHandler>
//       </RotationGestureHandler>
//       <Button title="Clear" onPress={() => setPaths([])} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   canvasContainer: {
//     flex: 1,
//     width: '90%',
//     borderColor: 'black',
//     borderWidth: 4,
//     borderRadius: 10,
//     overflow: 'hidden',
//     backgroundColor: 'black'
//   },
//   canvas: {
//     flex: 1,
//     width: '100%',
//     backgroundColor: 'white', 
//   }
// });


// export default DrawingCanvas;




// V2
import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Canvas, Path, useTouchHandler, Skia, PaintStyle, BlendMode, enumKey } from '@shopify/react-native-skia';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from './Sidebar';
import { PanGestureHandler, PinchGestureHandler, RotationGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import BrushSettings from './BrushSettings';
import { setPaths, setEraser, setColor, setStrokeWidth, setRotation, setScale } from './store';


const DrawingCanvas = () => {
  const dispatch = useDispatch();
  const { paths, isEraser, currentColor, strokeWidth, rotation, scale, translate } = useSelector(state => state.drawing);
  const lastRotation = useRef(rotation);
  const lastScale = useRef(scale);

  const currentPathRef = useRef(null);
  const paint = useRef(Skia.Paint());

  useEffect(() => {
    paint.current = Skia.Paint();
    paint.current.setBlendMode(isEraser ? BlendMode[enumKey("clear")] : BlendMode.SrcOver);
    paint.current.setColor(Skia.Color(currentColor));
    paint.current.setAntiAlias(true);
    paint.current.setStrokeWidth(strokeWidth);
    paint.current.setStyle(PaintStyle.Stroke);
  }, [isEraser, currentColor, strokeWidth]);

  const touchHandler = useTouchHandler({
    onStart: ({ x, y }) => {
      const path = Skia.Path.Make();
      path.moveTo(x, y);
      currentPathRef.current = { path, paint: paint.current.copy() };
    },
    onActive: ({ x, y }) => {
      if (currentPathRef.current) {
        currentPathRef.current.path.lineTo(x, y);
        setPaths(setPaths([...paths.slice(0, -1), currentPathRef.current]));
      }
    },
    onEnd: () => {
      if (currentPathRef.current) {
        dispatch(setPaths([...paths, currentPathRef.current]));
        currentPathRef.current = null;
      }
    },
  });
  

  return (
    <View style={styles.container}>
      <Sidebar onPaint={() => dispatch(setEraser(false))} onErase={() => dispatch(setEraser(true))} />
      <BrushSettings onSettingsChange={({ size, color }) => {
        dispatch(setStrokeWidth(size));
        dispatch(setColor(color));
      }} />
      <RotationGestureHandler onGestureEvent={event => {
        if (event.nativeEvent.state === GestureState.ACTIVE) {
          const newRotation = lastRotation.current + event.nativeEvent.rotation;
          dispatch(setRotation(newRotation));
        } else if (event.nativeEvent.state === GestureState.END) {
          lastRotation.current = rotation;
        }
      }}>
        <PinchGestureHandler onGestureEvent={event => {
          if (event.nativeEvent.state === GestureState.ACTIVE) {
            const newScale = lastScale.current * event.nativeEvent.scale;
            dispatch(setScale(newScale));
          } else if (event.nativeEvent.state === GestureState.END) {
            lastScale.current = scale;
          }
        }}>
          <View style={styles.canvasContainer}>
          <Canvas style={[styles.canvas, {
              transform: [
                  { translateX: translate.x },
                  { translateY: translate.y },
                  { scale: scale },
                  { rotate: `${rotation}rad` }
              ]
          }]} onTouch={touchHandler}>
              {paths.map(({ path, paint }, index) => (
                  <Path key={index} path={path} paint={paint} />
              ))}
              {currentPathRef.current && (
                  <Path path={currentPathRef.current.path} paint={currentPathRef.current.paint} />
              )}
          </Canvas>
          </View>
        </PinchGestureHandler>
      </RotationGestureHandler>
      <Button title="Clear" onPress={() => dispatch(setPaths([]))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  canvasContainer: {
    flex: 1,
    width: '90%',
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'black'
  },
  canvas: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  }
});

export default DrawingCanvas;
