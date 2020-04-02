import {Image, Text, View, StyleSheet, ImageBackground} from "react-native";
import * as React from "react";
import CalendarEntryProps from "../types/CalendarEntryProps";

let date = require('../icons/Date.png');
let description = require('../icons/Description.png');



export default function CalendarEntry(props: CalendarEntryProps){
    return (
       <View style={styles.container}>
            <ImageBackground source={date} style={styles.date}>
                <Text style={[styles.dateTextDay, {color: props.textColor}]}>
                    {props.dayNumber}
                </Text>
                <Text style={[styles.dateTextMonth, {color: props.textColor}]}>
                    {props.month}
                </Text>
            </ImageBackground>
            <ImageBackground source={description} style={styles.description}>
                <Text style={[styles.descriptionText, {color: props.textColor}]}>
                    {props.description}
                </Text>
            </ImageBackground>
       </View>

    );
};


const styles = StyleSheet.create({

    descriptionText:{
        marginTop: 13,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'left',
        fontFamily: 'montserrat'
    },

    dateTextDay:{
        textAlign: 'center',
        fontFamily: 'montserrat',
        fontSize: 53
    },

    dateTextMonth:{
        textAlign: 'center',
        fontFamily: 'montserrat'
    },

    date:{
        width: 100,
        height: 100
    },

    description:{
        width: 230,
        height: 100
    },

    container:{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#343434'
    }
});