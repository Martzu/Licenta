import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";


let Faculty = require('../icons/FacultySelection.png');

interface FacultySelectionAccProps {
    displayNavigate: () => void,
    faculty: string
};

export default function FacultySelectionAcc(props: FacultySelectionAccProps){
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={() => props.displayNavigate()}>
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
        fontSize: 22,
        fontFamily: 'montserrat'
    },

    facultyContainer:{
        width: 320,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    }

});