import * as React from "react";
import {Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {Region} from "react-native-maps";
import PlaceCoordinate from "../types/PlaceCoordinate";
import axios from 'axios';
import {GOOGLE_API_KEY} from "../constants/Constants";
import {alignEnum} from "react-native-svg/lib/typescript/lib/extract/extractViewBox";

let Car = require('../icons/Car.png');
let Walk = require('../icons/Walk.png');
let Bicycle = require('../icons/Bicycle.png');

let url = 'https://maps.googleapis.com/maps/api/directions/json?';

let descriptionImage = require('../icons/AccPopUp.png');

interface directionsScreenProps{

    showDirections: (show: boolean) => void,
    setMode: (id: number) => void,
    destination: string,
    destinationCoords: PlaceCoordinate,
    originCoords: PlaceCoordinate
}

export default function DirectionsScreen(props: directionsScreenProps){

    const[bicycleTime, setBicycleTime] = useState("N/A");
    const[drivingTime, setDrivingTime] = useState("N/A");
    const[walkingTime, setWalkingTime] = useState("N/A");

    useEffect(() => {
        (async () => {
            //get from google the duration time of the journey
            const origin = props.originCoords.latitude + ',' + props.originCoords.longitude;
            const destination = props.destinationCoords.latitude + ',' + props.destinationCoords.longitude;

            const drivingResult: any = await axios.get(url + `origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`);
            setDrivingTime(drivingResult.data.routes[0].legs[0].duration.text);
            debugger
            const walkingResult: any = await axios.get(url + `destination=${destination}&mode=walking&key=${GOOGLE_API_KEY}&origin=${origin}`);
            setWalkingTime(walkingResult.data.routes[0].legs[0].duration.text);
            debugger
            const bicycleResult: any = await axios.get(url + `destination=${destination}&mode=bicycling&key=${GOOGLE_API_KEY}&origin=${origin}`);
            setBicycleTime(bicycleResult.data.routes[0].legs[0].duration.text);
            debugger

        })();
    },[]);


    function handlePress(id : number) {
        props.setMode(id);
        props.showDirections(true);
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={descriptionImage} style={styles.imageBackground}>
                <View style={styles.titleContainer}>
                    <Text style={{fontFamily: 'montserrat', color: "#98A3A7"}}>
                        {props.destination}
                    </Text>
                </View>

                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => handlePress(1)}>
                        <Image source={Car} style={styles.image}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress(2)}>
                        <Image source={Walk} style={styles.image}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handlePress(3)}>
                        <Image source={Bicycle} style={styles.image}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.durationContainer}>
                    <Text style={styles.durationText}>
                        {drivingTime}
                    </Text>

                    <Text style={styles.durationText}>
                        {walkingTime}
                    </Text>

                    <Text style={styles.durationText}>
                        {bicycleTime}
                    </Text>
                </View>

            </ImageBackground>


        </View>
    );
};

const styles = StyleSheet.create({

    durationText:{
        marginRight: 10,
        marginLeft: 10,
        fontFamily: 'montserrat',
        color: "#98A3A7"
    },

    imageBackground:{
        width: 250,
        height: 160
    },


    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    iconContainer:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    titleContainer:{
        marginTop: 10,
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    durationContainer:{
        flex: 0.2,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },

    image:{
        width: 60,
        height: 60
    }

});