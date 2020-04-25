import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as React from 'react';
import FacultySelectionAcc from "./FacultySelectionAcc";
import LocationData from "../types/LocationData";
import MarkerCoordinates from "../types/MarkerCoordinates";




const faculties = ["Computer Science", "Mechanical Engineering", "Electrical Engineering"];


interface AccommodationProps{//might have to swap for list of Faculties[], which will hold long and lat
    coordinates: MarkerCoordinates[],//list of coordinates for each faculty
    setCurrentLocation: (currentLocation: MarkerCoordinates) => void,
    displayMap: (show: boolean) => void,
    closeAccommodation: (show: boolean) => void,
    setAccommodationDetails: (accommodationDetails: LocationData[]) => void
};

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
                faculties.map((faculty, index) =>
                    <FacultySelectionAcc faculty={faculty} displayNavigate={displayNavigate} setAccommodationDetails={props.setAccommodationDetails} coordinates={props.coordinates[index]} setCurrentLocation={props.setCurrentLocation}/>
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


