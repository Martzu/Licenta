import {
    ActivityIndicator,
    Button,
    Dimensions,
    Image,
    Modal,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import CurrentLocation from "../types/CurrentLocation";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import {useState, useEffect, useRef} from 'react';
import Mapview, {Region} from 'react-native-maps';
import {Marker} from "react-native-maps";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Coords from "../types/Coords";
import MapViewDirections from 'react-native-maps-directions';
import DirectionsScreen from "../components/DirectionsScreen";
import {BICYCLING, DRIVING, GOOGLE_API_KEY, WALKING} from "../constants/Constants";
import AccommodationDetails from "../components/AccommodationDetails";
import LocationData from "../types/LocationData";





/*const testCoordinates = {
    latitude: 47.6,
    longitude: 25.86667
};*/

let currentLocationMarker = require('../icons/CurrentLocationMarker.png');
let otherLocationMarker = require('../icons/OtherLocationMarker.png');


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

interface MapsProps{
    currentLocation: MarkerCoordinates,
    destinations: LocationData[];

}

export default function Home(props: MapsProps){

    const mapRef = useRef(null);

    const [visible, setVisible] = useState(false);

    const [render, setRender] = useState(false);

    useEffect( () => {
        (async() => {
            await computeLocation(props.destinations.length);
            setRender(true);
        })();

        console.log('Pe maps');
        console.log(props.destinations.length);
    },[]);


    function handleMarkerPress(destination: LocationData){
        let destinationRegion: Region = {latitude: destination.location.latitude, latitudeDelta: 0.0001, longitude: destination.location.longitude, longitudeDelta: 0.032};

        if(props.destinations.length > 1){
            setTitle(destination.accommodationDetails.title);
            setDistance(destination.accommodationDetails.distance);
            setAddress(destination.accommodationDetails.address);
            setPhoneNumber(destination.accommodationDetails.phoneNumber);
            //setViewAccDetails(!viewAccDetails);
            setViewAccDetails(true);
            setWebsite(destination.accommodationDetails.website);
        }
        else{
            setDestinationName(destination.location.title);
            setDestination(destinationRegion);
            setViewDirections(!viewDirections);
            setShowDirections(!showDirections);
        }

        mapRef.current.animateCamera({center:destinationRegion}, {duration: 2000});

        setRegion(destinationRegion);

    }



    const [viewAccDetails, setViewAccDetails] = useState(false);

    const [title, setTitle] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');

    const [website, setWebsite] = useState('');

    const [distance, setDistance] = useState('');

    const [address, setAddress] = useState('');

    const [destinationName, setDestinationName] = useState('');

    const [destination, setDestination] = useState<Region>();

    const [mode, setMode] = useState(1);

    const [viewDirections, setViewDirections] = useState(false);

    const [showDirections, setShowDirections] = useState(false);

    const [region, setRegion] = useState<Region>({latitude: 0, latitudeDelta: 0.0001, longitude: 0, longitudeDelta: 0.032});

    const [markerCoordinates, setMarkerCoordinates] = useState<MarkerCoordinates>(props.destinations.length > 1 ? props.currentLocation : {latitude: 0, longitude: 0, title: ''});

    const computeLocation = async (length: number) => {
        debugger;
        let latitude: number, longitude: number;
        if(length === 1){
            let currentLocation = await getLocation();
            latitude = currentLocation.coords.latitude;
            longitude = currentLocation.coords.longitude;
        }
        else{
            latitude = props.currentLocation.latitude;
            longitude = props.currentLocation.longitude;
        }

        setRegion({latitude: latitude, longitude: longitude, latitudeDelta: 0.03, longitudeDelta:0.02 });
        setMarkerCoordinates({latitude, longitude, title: props.currentLocation.title});

    };



    useEffect(() => {
        setShowDirections(false);
    },[viewDirections]);


    return (
        <View style={styles.mapContainer}>
            <View>
                <Mapview style={styles.map} region={region} customMapStyle={customMapStyle} ref={mapRef}>

                    <Marker
                        onPress={() => handleMarkerPress({location: {latitude: markerCoordinates.latitude, longitude: markerCoordinates.longitude, title: ''}, accommodationDetails: {title: markerCoordinates.title, address: '', phoneNumber: '', website: '', distance: ''} })}
                        key={1}
                        coordinate={markerCoordinates}>

                        <Image source={currentLocationMarker} style={{height:45, width:40}}/>
                    </Marker>
                    {
                        props.destinations.map(destination =>{

                            return(<Marker
                                onPress={() => handleMarkerPress(destination)}
                                coordinate={destination.location}>
                                <Image source={otherLocationMarker} style={{height:45, width:40}}/>
                            </Marker>);
                        })
                    }

                    {
                        showDirections === true ? <MapViewDirections origin={markerCoordinates} destination={destination} mode={mode === 1 ? DRIVING : mode === 2 ? WALKING : BICYCLING} apikey={GOOGLE_API_KEY} strokeWidth={3} strokeColor="hotpink"/> :
                            <View/>
                    }

                </Mapview>
            </View>


            <View style={styles.middleContainer}/>

            <View style={styles.bottomContainer}>
                {
                    viewDirections && props.destinations.length === 1 && <DirectionsScreen destinationCoords={props.destinations[0].location} destination={destinationName} originCoords={markerCoordinates} showDirections={setShowDirections} setMode={setMode}/>
                                    || viewAccDetails && <AccommodationDetails title={title} distance={distance} address={address} phoneNumber={phoneNumber} website={website}/>
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