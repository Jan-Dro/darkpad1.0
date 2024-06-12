// LayerControls.js
import React, {useEffect} from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveLayerIndex, toggleLayerVisibility } from './store';
import Icon from 'react-native-vector-icons/Ionicons';

const LayerControls = ({ onClose }) => {
  const dispatch = useDispatch();
  const { layers, activeLayerIndex } = useSelector(state => state.drawing);

  const renderItem = ({ item, index }) => (
    <View style={styles.layerItem}>

      <TouchableOpacity onPress={() => dispatch(setActiveLayerIndex(index))}>
            <Text style={[styles.layerName, { fontWeight: index === activeLayerIndex ? 'bold' : 'normal' }]}>
                {item.name}
            </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => dispatch(toggleLayerVisibility(index))}>
            <Icon name={item.visible ? 'eye-outline' : 'eye-off-outline'} size={24} color="#FFF" />
      </TouchableOpacity>

    </View>
    
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Icon name="close-outline" size={30} color="#FFF" />
      </TouchableOpacity>

      <FlatList
    data={layers}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    style={{flex: 1}}  // Make sure it can expand
/>
    </View>
  );
};

const styles = StyleSheet.create({
    // container: {
    //   position: 'absolute',
    //   top: 60, 
    //   left: 0,
    //   right: 0,
    //   bottom: 0, 
    //   backgroundColor: '#333',
    //   padding: 10,
    // },
    container: {
        backgroundColor: '#333',
        width: 300, 
        height: 300, 
        zIndex: 1000,  
        top: 200, 
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: 5,
      marginBottom: 10,
    },
    layerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#555',
    },
    layerName: {
      color: '#FFF',
      fontSize: 16,
    },
    layerVisibilityIcon: {
      // Add any additional styling for the visibility icon if needed
    },
    activeLayerHighlight: {
      backgroundColor: '#555', // Highlight the active layer
    },
  });

export default LayerControls;
