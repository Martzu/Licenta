import {Button, Dimensions, Image, Modal, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import CurrentLocation from "../types/CurrentLocation";
import * as Location from 'expo-location';

import * as Permissions from 'expo-permissions';
import * as React from 'react';
import {useState, useEffect} from 'react';
import Mapview, {Region} from 'react-native-maps';
import {Marker} from "react-native-maps";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Coords from "../types/Coords";

let descriptionImage = require('../icons/bg.jpg');

async function getLocation(){
    let currentLocation: CurrentLocation = {coords: undefined, timestamp: 0};
    let {status} = await Permissions.askAsync(Permissions.LOCATION);
    if(status === 'granted') {
        let wrapper = await Location.getCurrentPositionAsync({});

        currentLocation.timestamp = wrapper.timestamp;
        currentLocation.coords = wrapper.coords;
    }
    return currentLocation;
}


export default function Home({navigation}){

    const [visible, setVisible] = useState(false);
    useEffect( () => {
        (async() => {
            await computeLocation();
        })();
    },[]);


    const [region, setRegion] = useState<Region>({latitude: 0, latitudeDelta: 0, longitude: 0, longitudeDelta: 0});

    const [markerCoordinates, setMarkerCoordinates] = useState<MarkerCoordinates>({latitude: 0, longitude: 0, title: ""});

    const computeLocation = async () => {
        let currentLocation = await getLocation();
        setRegion({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, latitudeDelta: 0, longitudeDelta:0 });
        setMarkerCoordinates({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, title: 'Hello'});
    };

    return (
        <View style={styles.mapContainer}>
            <View>
                <Mapview style={styles.map} region={region}>
                    <Marker
                        onPress={() => setVisible(!visible)}
                        coordinate={markerCoordinates}/>
                </Mapview>
            </View>


            <View style={styles.topContainer}>
                <Button title="Screen 2" onPress = {() => navigation.navigate('Second')}/>
                <Button title='Navigate' onPress={() => console.log("yes")}/>
            </View>

            <View style={styles.middleContainer}/>

            <View style={styles.bottomContainer}>
                { visible && <Image source={descriptionImage} style={styles.descriptionImage}/>}
            </View>

        </View>
    );
};

const styles = StyleSheet.create({

    descriptionImage:{
        width: Dimensions.get('window').height / 4,
        height: Dimensions.get('window').width / 3,
        resizeMode: 'contain'
    },

    statusBar:{
        height: StatusBar.currentHeight
    },

    mapContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },

    topContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    middleContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',


    }

});