import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";

let AvailableOff = require('../icons/Available.png');
let AvailableOn = require('../icons/AvailableOn.png');

let GoingOff  = require('../icons/Going.png');
let GoingOn = require('../icons/GoingOn.png');


let faculties = ['Computer Science', 'History', 'Literature', 'Foreign Language', 'Mechanics', 'Electrical Engineering'];



export default function Admissions(){

    const[availableOn, setAvailableOn] = useState(true);
    const[goingOn, setGoingOn] = useState(false);

    function handlePress(id: number){
        let value = id !== 0;
        setGoingOn(value);
        setAvailableOn(!value);
    };

    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            <View style={styles.buttonFilterContainer}>

                <TouchableOpacity onPress={() => handlePress(0)}>
                    <ImageBackground source={availableOn ? AvailableOn : AvailableOff} style={styles.button}>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handlePress(1)}>
                    <ImageBackground source={goingOn ? GoingOn : GoingOff} style={styles.button}>
                    </ImageBackground>
                </TouchableOpacity>

            </View>

            {
                faculties.map((faculty, index)=>
                    <Entry faculty={faculty} key={index}/>
                )
            }
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    buttonFilterContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },

    buttonText:{
        marginTop: 10,
        marginLeft: 35,
    },

    button:{
        width: 120,
        height: 40
    }

});