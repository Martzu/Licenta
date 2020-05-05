import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import {useState, useEffect} from 'react';

async function getLocation(){
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted') {
        setMessage('Access denied!');
    }
    else{
        let location = await Location.getCurrentPositionAsync({});
        setMessage(location);
    }
}

const [message, setMessage] = useState('');

export default function Home({navigation}){

    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text>Hello</Text>
            <Button title="Screen 2" onPress = {() => navigation.navigate('Second')}/>
            <Button title="Location" onPress = {() => getLocation()}/>
            /*<Text>{message}</Text>*/
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});