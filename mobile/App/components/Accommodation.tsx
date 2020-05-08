import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as React from 'react';
import FacultySelectionAcc from "./FacultySelectionAcc";
import LocationData from "../types/LocationData";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Faculty from "../types/Faculty";
import displayFromText from '../constants/Constants';





interface AccommodationProps{
    setCurrentLocation: (currentLocation: MarkerCoordinates) => void,
    displayMap: (show: boolean) => void,
    closeAccommodation: (show: boolean) => void,
    setAccommodationDetails: (accommodationDetails: LocationData[]) => void,
    faculties: Faculty[]
}

export default function Accommodation(props: AccommodationProps){

    function displayNavigate(){
        props.displayMap(false);
        props.closeAccommodation(true);
    }


    return (
        <ScrollView>
            <Text style={styles.text}>
                Please tap a faculty. {'\n'} We will give you the closest accommodations in the areas!
            </Text>
            {
                props.faculties.map((faculty, index) =>
                    <FacultySelectionAcc faculty={displayFromText(faculty.name)} key={index} displayNavigate={displayNavigate} setAccommodationDetails={props.setAccommodationDetails} coordinates={{longitude: faculty.longitude, latitude: faculty.latitude, title: ''}} setCurrentLocation={props.setCurrentLocation}/>
                )
            }
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    text:{
        fontFamily: 'montserrat',
        textAlign: 'center',
        color: '#98A3A7',
        marginTop: 25,
        marginBottom: 25
    },



});


