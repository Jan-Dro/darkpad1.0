import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ensure you have installed react-native-vector-icons
import Sidebar from './Sidebar';
import BrushSettings from './BrushSettings';
import LayerControls from './LayerControls'
import { useSelector, useDispatch } from 'react-redux';
import { setPaths, setEraser, setColor, setStrokeWidth,   addLayer, deleteLayer, 
    setActiveLayerIndex, toggleLayerVisibility  } from './store';
import { Menu, IconButton, FAB, Portal, Provider } from "react-native-paper";

export default function DropDownMenu({ onSettingsChange, onPaint, onErase }) {
    const [showSettings, setShowSettings] = useState(false);
    const [showTools, setShowTools] = useState(false);
    const dispatch = useDispatch();
    const { layers, activeLayerIndex } = useSelector(state => state.drawing);
    const [showLayers, setShowLayers] = useState(false);
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => {
        setState({ open });
      };
  
    const { open } = state;
  
    return (
        <View style={styles.container}>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'close' : 'menu'}
              actions={[
                { icon: 'brush', onPress: () => dispatch(setEraser(false)), label: 'Paint' },
                { icon: 'eraser', onPress: () => dispatch(setEraser(true)), label: 'Erase' },
                { icon: 'brush', onPress: () => setShowSettings(true), label: 'Brush Settings' },
                { icon: 'layers', onPress: () => setShowLayers(true), label: 'Layer Controls' },
              ]}
              onStateChange={onStateChange}
            />
          </Portal>
          {showTools && <Sidebar onPaint={() => dispatch(setEraser(false))} onErase={() => dispatch(setEraser(true))} />}
          {showSettings && (
            <BrushSettings
              onSettingsChange={({ size, color }) => {
                dispatch(setStrokeWidth(size));
                dispatch(setColor(color));
              }}
            />
          )}
          {showLayers && <LayerControls onClose={() => setShowLayers(false)} />}
        </View>
    );
  };

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 60,
        backgroundColor: '#333',
        zIndex: 1000,
    },
    iconButton: {
        padding: 10,
    },
});
