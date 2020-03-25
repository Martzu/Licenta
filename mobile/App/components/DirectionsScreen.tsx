import * as React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
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


interface directionsScreenProps{

    showDirections: (show: boolean) => void,
    setMode: (id: number) => void,
    destination: string,
    destinationCoords: PlaceCoordinate,
    originCoords: PlaceCoordinate
};

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

            const walkingResult: any = await axios.get(url + `destination=${destination}&mode=walking&key=${GOOGLE_API_KEY}&origin=${origin}`);
            setWalkingTime(walkingResult.data.routes[0].legs[0].duration.text);

            const bicycleResult: any = await axios.get(url + `destination=${destination}&mode=bicycling&key=${GOOGLE_API_KEY}&origin=${origin}`);
            setBicycleTime(bicycleResult.data.routes[0].legs[0].duration.text);


        })();
    },[]);


    function handlePress(id : number) {
        props.setMode(id);
        props.showDirections(true);
    }

    return(
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text>
                    {props.destination}
                </Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableHighlight onPress={() => handlePress(1)}>
                    <Image source={Car} style={styles.image}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => handlePress(2)}>
                    <Image source={Walk} style={styles.image}/>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => handlePress(3)}>
                    <Image source={Bicycle} style={styles.image}/>
                </TouchableHighlight>
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




        </View>
    );
};

const styles = StyleSheet.create({

    durationText:{
        marginRight: 10,
        marginLeft: 10
    },

    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#343434',
    },

    iconContainer:{
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#343434'
    },

    titleContainer:{
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    durationContainer:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#343434'
    },

    image:{
        width: 60,
        height: 60
    }

});