import React from "react";
import { Text, View, StyleSheet } from "react-native";
export default function Title() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>DarkPad</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333',
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});