import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as React from 'react';
import FacultySelectionAcc from "./FacultySelectionAcc";
import LocationData from "../types/LocationData";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Faculty from "../types/Faculty";
import displayFromText from '../constants/Constants';
import {useState} from "react";
import AccommodationMainPage from "./AcommodationMainPage";
import AccommodationForm from "./AccommodationForm";
import UserAccommodation from "../types/UserAccommodation";


let BackButton = require('../icons/BackButton.png');

interface AccommodationProps{
    setCurrentLocation: (currentLocation: MarkerCoordinates) => void,
    displayMap: (show: boolean) => void,
    setAccommodationDetails: (accommodationDetails: LocationData[]) => void,
    faculties: Faculty[],
    setMultiplier: (multiplier: number) => void,
    setUserAccommodation: (userAccommodation: UserAccommodation) => void
}

export default function Accommodation(props: AccommodationProps){

    function displayNavigate(){
        props.displayMap(false);
        //props.closeAccommodation(true);
    }

    const [displayPages, setDisplayPages] = useState<boolean[]>([true, false, false]);

    return (
        <View style={displayPages[1] && {marginTop: 80}}>
            {
                displayPages[1] && <ScrollView>

                    <Text style={styles.text}>
                        Please tap a faculty. {'\n'} We will give you the closest accommodations in the areas!
                    </Text>
                    {
                        props.faculties.map((faculty, index) =>
                            <FacultySelectionAcc faculty={displayFromText(faculty.name)} key={index} displayNavigate={displayNavigate} setAccommodationDetails={props.setAccommodationDetails} coordinates={{longitude: faculty.longitude, latitude: faculty.latitude, title: faculty.name}} setCurrentLocation={props.setCurrentLocation}/>
                        )
                    }
                </ScrollView> ||

                displayPages[0] && <AccommodationMainPage setDisplayPages={setDisplayPages}/> ||

                displayPages[2] && <AccommodationForm setDisplayPages={setDisplayPages} setMultiplier={props.setMultiplier} setUserAccommodation={props.setUserAccommodation}/>
            }
            {displayPages[1]  && <TouchableOpacity onPress={() => setDisplayPages([true, false, false])}>
                <Image source={BackButton} style={styles.backButton}/>
            </TouchableOpacity>}
        </View>

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

    backButton:{
        marginBottom: 80,
        width: 90,
        height: 90,
        alignSelf: 'center'
    },



});


