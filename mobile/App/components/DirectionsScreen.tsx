import * as React from "react";
import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {useEffect, useState} from "react";
import {Region} from "react-native-maps";
import PlaceCoordinate from "../types/PlaceCoordinate";
import axios from 'axios';
import {GOOGLE_API_KEY} from "../constants/Constants";

let Car = require('../icons/Car.png');
let Walk = require('../icons/Walk.png');
let Bicycle = require('../icons/Bicycle.png');

let url = 'http://maps.googleapis.com/maps/api/directions/json?';


interface directionsScreenProps{

    destination: string,
    destinationCoords: PlaceCoordinate,
    originCoords: PlaceCoordinate
};

export default function DirectionsScreen(props: directionsScreenProps){

    useEffect(() => {
        (async () => {
            //get from google the duration time of the journey
            const origin = props.originCoords.latitude + ',' + props.originCoords.longitude;
            const destination = props.destinationCoords.latitude + ',' + props.destinationCoords.longitude;
            const result: any = await axios.get(url + `origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`);
            debugger;
            //setOk(result.routes[0].legs[0].steps[3].text);

        })();
    },[]);


    const [ok, setOk] = useState("");

    return(
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <Text>
                    {props.destination + ok}
                </Text>
            </View>

            <View style={styles.iconContainer}>
                <TouchableHighlight>
                    <Image source={Car} style={styles.image}/>
                </TouchableHighlight>

                <TouchableHighlight>
                    <Image source={Walk} style={styles.image}/>
                </TouchableHighlight>

                <TouchableHighlight>
                    <Image source={Bicycle} style={styles.image}/>
                </TouchableHighlight>
            </View>

            <View style={styles.durationContainer}>
                <Text style={styles.durationText}>
                    5 min
                </Text>

                <Text style={styles.durationText}>
                    20 min
                </Text>

                <Text style={styles.durationText}>
                    14 min
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