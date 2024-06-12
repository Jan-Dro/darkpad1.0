import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const Sidebar = ({ onPaint, onErase }) => {
  return (
    <View style={styles.sidebar}>
      <FontAwesome5 name="paint-brush" size={24} color="black" onPress={onPaint} />
      <Entypo name="eraser" size={24} color="black" onPress={onErase} />
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 240,
    top: 60,
    justifyContent: 'center',
    padding: 10,
    zIndex: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
  },
});

export default Sidebar;