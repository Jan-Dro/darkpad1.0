// import React, {useState} from "react";
// import { View, Text, StyleSheet } from "react-native";
// import Slider from "@react-native-community/slider";

// const BrushSettings = ({ onSettingsChange }) => {
//     const [size, setSize] = useState(4)
//     const [opacity, setOpacity] = useState(1)
//     const [color, setColor] = useState('black')

//     const handleSettingsChange = () => {
//         onSettingsChange({size, opacity, color})
//     };



//     return(
//         <View style={styles.container}>
//            <Text style={styles.label}>Brush Size:</Text> 
//             <Slider
//             style={styles.slider}
//             value={size}
//             onValueChange={setSize}
//             minimumValue={1}
//             maximumValue={20}
//             step={1}
//             onSlidingComplete={handleSettingsChange}
//             />
//             <Text style={styles.label}>Opacity:</Text> 
//             <Slider
//             style={styles.slider}
//             value={opacity}
//             onValueChange={setOpacity}
//             minimumValue={0.1}
//             maximumValue={1}
//             step={0.1}
//             onSlidingComplete={handleSettingsChange}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         padding: 10,
//         backgroundColor: 'lightgray',
//         zIndex: 0,
//         position: 'absolute',
//         top: 60,
//         right: 150,
//     },
    // slider: {
    //     width: 200,
    //     height: 40,
    // },
//     label: { // Add style for labels
//         marginBottom: 5,
//       }
//     });
    

// export default BrushSettings;


import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Modal, Portal, Button } from 'react-native-paper';
import ColorPicker from './ColorPicker'; // Assuming you have a ColorPicker component
import Slider from "@react-native-community/slider";
import { useDispatch, useSelector } from 'react-redux';
import { showBrushSettings, hideBrushSettings } from './store';


const BrushSettings = ({ onSettingsChange }) => {
    const visible = useSelector(state => state.drawing.brushSettingsVisible);
    const dispatch = useDispatch();
    const [size, setSize] = useState(4);
    const [opacity, setOpacity] = useState(1);
    const [color, setColor] = useState('black');
  
    const handleSettingsChange = () => {
      onSettingsChange({ size, opacity, color });
      dispatch(hideBrushSettings()); // Hide modal after applying settings
    };
  
    return (
      <View style={styles.container}>
        <Button onPress={() => dispatch(showBrushSettings())}>Show Brush Settings</Button>
        <Portal>
          <Modal visible={visible} onDismiss={() => dispatch(hideBrushSettings())} contentContainerStyle={styles.modalContainer}>
            <View style={styles.previewArea}>
              <View style={{...styles.previewCircle, width: size, height: size, opacity, backgroundColor: color}} />
            </View>
            <Text style={styles.label}>Brush Size:</Text>
            <Slider
                style={styles.slider}
                value={size}
                onValueChange={setSize}
                minimumValue={1}
                maximumValue={100}
                step={1}
                onSlidingComplete={handleSettingsChange}
            />
            <Text style={styles.label}>Opacity:</Text>
            <Slider
                style={styles.slider}
                value={opacity}
                onValueChange={setOpacity}
                minimumValue={0.1}
                maximumValue={1}
                step={0.1}
                onSlidingComplete={handleSettingsChange}
            />
            <Text style={styles.label}>Color:</Text>
            <ColorPicker onColorSelected={setColor} selectedColor={color} />
            <TouchableOpacity onPress={handleSettingsChange} style={styles.button}>
              <Text style={styles.buttonText}>Apply Changes</Text>
            </TouchableOpacity>
          </Modal>
        </Portal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
      modalContainer: {
          padding: 20,
          backgroundColor: 'white',
          borderRadius: 10,
          margin: 20,
      },
      slider: {
          width: '100%',
          height: 40,
      },
      label: {
          marginBottom: 10,
      },
      previewArea: {
          alignItems: 'center',
          marginBottom: 20,
      },
      previewCircle: {
          width: 50,
          height: 50,
          borderRadius: 25,
      },
      button: {
          marginTop: 10,
          backgroundColor: '#007AFF',
          padding: 10,
          borderRadius: 5,
      },
      buttonText: {
          color: 'white',
          textAlign: 'center',
      },
  });
  
  export default BrushSettings;
