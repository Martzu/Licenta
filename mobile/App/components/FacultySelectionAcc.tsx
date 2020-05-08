import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import LocationData from "../types/LocationData";
import axios from 'axios';
import AccommodationData from "../types/AccommodationData";
import MarkerCoordinates from "../types/MarkerCoordinates";
import {GOOGLE_API_KEY} from "../constants/Constants";
import Coords from "../types/Coords";

let Faculty = require('../icons/FacultySelection.png');

interface FacultySelectionAccProps {
    coordinates: MarkerCoordinates,
    setCurrentLocation: (currentLocation: MarkerCoordinates) => void,
    displayNavigate: () => void,
    setAccommodationDetails: (accommodationDetails: LocationData[]) => void,
    faculty: string
}

export default function FacultySelectionAcc(props: FacultySelectionAccProps){

    function directionsCallForDistance(lat: number, lng: number){
        return `https://maps.googleapis.com/maps/api/directions/json?origin=${props.coordinates.latitude},${props.coordinates.longitude}&destination=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    }

    function accommodationsFromRegion(){
        return `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBDlY8RJxrk2UVf2dSe5Z9Ults6ylGqUVE&location=${props.coordinates.latitude},${props.coordinates.longitude}&radius=800&keyword=hotel`;
    }

    async function handleFacultyClick() {
        let data: LocationData[] = [];
        props.setCurrentLocation(props.coordinates);
        const accommodationResult: any = await axios.get(accommodationsFromRegion());
        accommodationResult.data.results.map(place => {
           let accommodationDetail: AccommodationData = {title: '', address: '', distance: ''};
           accommodationDetail.title = place.name;
           accommodationDetail.address = place.vicinity;
           let accommodationLocation: MarkerCoordinates = {latitude: place.geometry.location.lat, longitude: place.geometry.location.lng, title: accommodationDetail.title};
           //let accommodationLocation = place.geometry.location;
           (async (accommodationDetail : AccommodationData) => {
               const directionResult = await axios.get(directionsCallForDistance(accommodationLocation.latitude, accommodationLocation.longitude));
               accommodationDetail.distance = directionResult.data.routes[0].legs[0].distance.text;
           })(accommodationDetail);

           data[data.length] = {accommodationDetails: accommodationDetail, location: accommodationLocation};
        });
        props.setAccommodationDetails(data);
        debugger;
        props.displayNavigate();


    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handleFacultyClick()}>
                <ImageBackground source={Faculty} style={styles.facultyContainer}>
                    <Text style={styles.text}>
                        {
                            props.faculty
                        }
                    </Text>
                </ImageBackground>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },

    text:{
        color: "#98A3A7",
        fontSize: 20,
        fontFamily: 'montserrat'
    },

    facultyContainer:{
        width: 320,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }

});