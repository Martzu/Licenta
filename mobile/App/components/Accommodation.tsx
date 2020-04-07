import {Image, ScrollView, Text, TouchableOpacity, View, StyleSheet} from "react-native";
import * as React from 'react';
import FacultySelectionAcc from "./FacultySelectionAcc";




const faculties = ["Computer Science", "Mechanical Engineering", "Electrical Engineering"];


interface AccommodationProps{
    displayMap: (show: boolean) => void,
    closeAccommodation: (show: boolean) => void
};

export default function Accommodation(props: AccommodationProps){

    function displayNavigate(){
        props.displayMap(false);
        props.closeAccommodation(true);
    };

    return (
        <ScrollView>
            <Text style={styles.text}>
                Please tap a faculty. {'\n'} We will give you the closest accommodations in the areas!
            </Text>
            {
                faculties.map((faculty, index) =>
                    <FacultySelectionAcc faculty={faculty} displayNavigate={displayNavigate}/>
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


