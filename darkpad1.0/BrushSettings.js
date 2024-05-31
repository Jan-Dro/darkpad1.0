import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const BrushSettings = ({ onSettingsChange }) => {
    const [size, setSize] = useState(4)
    const [opacity, setOpacity] = useState(1)
    const [color, setColor] = useState('black')

    const handleSettingsChange = () => {
        onSettingsChange({size, opacity, color})
    };



    return(
        <View style={styles.container}>
           <Text style={styles.label}>Brush Size:</Text> 
            <Slider
            style={styles.slider}
            value={size}
            onValueChange={setSize}
            minimumValue={1}
            maximumValue={20}
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'lightgray',
        zIndex: 1,
        position: 'absolute',
        top: 0,
    },
    slider: {
        width: 200,
        height: 40,
    },
    label: { // Add style for labels
        marginBottom: 5,
      }
    });
    

export default BrushSettings;