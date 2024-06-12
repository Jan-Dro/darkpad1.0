import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#000000', '#ffffff'];

const ColorPicker = ({ selectedColor, onColorSelected }) => {
  return (
    <View style={styles.container}>
      {colors.map(color => (
        <TouchableOpacity
          key={color}
          style={[styles.colorCircle, { backgroundColor: color, borderWidth: selectedColor === color ? 3 : 0 }]}
          onPress={() => onColorSelected(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderColor: 'black',
  },
});

export default ColorPicker;