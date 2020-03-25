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
import MapViewDirections from 'react-native-maps-directions';
import DirectionsScreen from "../components/DirectionsScreen";
import {BICYCLING, DRIVING, GOOGLE_API_KEY, WALKING} from "../constants/Constants";

let descriptionImage = require('../icons/bg.jpg');



/*const testCoordinates = {
    latitude: 47.6,
    longitude: 25.86667
};*/

const testCoordinates = {
    latitude: 47.55,
    longitude: 25.9
};

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


const customMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#212121"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#9e9e9e"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#bdbdbd"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#181818"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#1b1b1b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2c2c2c"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8a8a8a"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#373737"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#3c3c3c"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#616161"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#757575"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#2b2c2e"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#3d3d3d"
            }
        ]
    }
];


export default function Home({navigation}){

    const [visible, setVisible] = useState(false);



    useEffect( () => {
        (async() => {
            await computeLocation();
        })();
    },[]);

    const [destination, setDestination] = useState<Region>();

    const [mode, setMode] = useState(1);

    const [viewDirections, setViewDirections] = useState(false);

    const[showDirections, setShowDirections] = useState(false);

    const [region, setRegion] = useState<Region>({latitude: 0, latitudeDelta: 0.0001, longitude: 0, longitudeDelta: 0.032});

    const [markerCoordinates, setMarkerCoordinates] = useState<MarkerCoordinates>({latitude: 0, longitude: 0, title: ""});

    const computeLocation = async () => {
        let currentLocation = await getLocation();
        setRegion({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, latitudeDelta: 0.03, longitudeDelta:0.02 });
        setMarkerCoordinates({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude, title: 'Hello'});
    };

    return (
        <View style={styles.mapContainer}>
            <View>
                <Mapview style={styles.map} region={region} customMapStyle={customMapStyle}>
                    <Marker
                        onPress={() => setVisible(!visible)}
                        coordinate={markerCoordinates}/>
                    <Marker
                        onPress={() => setViewDirections(!viewDirections)}
                        coordinate={testCoordinates}/>
                    {
                        showDirections === true ? <MapViewDirections origin={region} destination={testCoordinates} mode={mode === 1 ? DRIVING : mode === 2 ? WALKING : BICYCLING} apikey={GOOGLE_API_KEY} strokeWidth={3} strokeColor="hotpink"/> :
                            <View/>
                    }

                </Mapview>
            </View>


            <View style={styles.middleContainer}/>

            <View style={styles.bottomContainer}>
                { visible && <Image source={descriptionImage} style={styles.descriptionImage}/> ||
                    viewDirections && <DirectionsScreen destinationCoords={testCoordinates} destination={"Manastirea Humorului"} originCoords={region} showDirections={setShowDirections} setMode={setMode}/>

                }
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
        backgroundColor: '#343434',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        position: 'absolute',


    }

});