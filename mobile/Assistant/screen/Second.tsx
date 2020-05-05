import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';

export default function Second({navigation}){
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text>Hi again!</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')}/>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});