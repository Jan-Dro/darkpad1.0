import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DrawingCanvas from './DrawingCanvas';
import Title from './Title';
import { View, StyleSheet, Button } from 'react-native';
import {Provider} from 'react-redux'
import store from './store';
import DropDownMenu from './DropDownMenu';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
      <Provider store={store}>
        <PaperProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <DropDownMenu />
              <Title />
            <DrawingCanvas />
        </GestureHandlerRootView>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
