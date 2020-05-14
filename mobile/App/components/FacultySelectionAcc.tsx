import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import LocationData from "../types/LocationData";
import axios from 'axios';
import AccommodationData from "../types/AccommodationData";
import MarkerCoordinates from "../types/MarkerCoordinates";
import {GOOGLE_API_KEY} from "../constants/Constants";

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

    async function getWebsite(accommodationId: string): Promise<string>{
        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${accommodationId}&fields=website`);
        return result.data.result['website'];
    }

    async function getPhoneNumber(accommodationId: string): Promise<string> {

        const result = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&place_id=${accommodationId}&fields=formatted_phone_number`);
        return result.data.result['formatted_phone_number'];
    }

    async function getAccommodationData(place): Promise<LocationData>{
        let data: LocationData;
        let accommodationDetail: AccommodationData = {title: '', address: '', distance: '', phoneNumber: '', website: ''};
        accommodationDetail.title = place.name;
        accommodationDetail.address = place.vicinity;
        accommodationDetail.phoneNumber = await getPhoneNumber(place.place_id);
        accommodationDetail.website = await getWebsite(place.place_id);
        let accommodationLocation: MarkerCoordinates = {latitude: place.geometry.location.lat, longitude: place.geometry.location.lng, title: accommodationDetail.title};

        const directionResult = await axios.get(directionsCallForDistance(accommodationLocation.latitude, accommodationLocation.longitude));
        accommodationDetail.distance = directionResult.data.routes[0].legs[0].distance.text;

        data = {accommodationDetails: accommodationDetail, location: accommodationLocation};
        return data;
    }


    async function handleFacultyClick() {
        let data: LocationData[];
        props.setCurrentLocation(props.coordinates);
        const accommodationResult: any = await axios.get(accommodationsFromRegion());
        data = await Promise.all(accommodationResult.data.results.map(async (place): Promise<LocationData> => {
            return await getAccommodationData(place);
        }));
        props.setAccommodationDetails(data);
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