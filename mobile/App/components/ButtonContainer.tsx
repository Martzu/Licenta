import {Image, ScrollView, StyleSheet, View} from "react-native";
import * as React from "react";

let TodayOn = require('../icons/TodayOn.png');
let TodayOff = require('../icons/TodayOff.png');

let MonthOn = require('../icons/MonthOn.png');
let MonthOff = require('../icons/MonthOff.png');

let WeekOn = require('../icons/WeekOn.png');
let WeekOff = require('../icons/WeekOff.png');


export default function ButtonContainer(){
    return(

        <View style={styles.buttonsContainer}>


            <Image source={WeekOff}/>

            <Image source={MonthOff}/>

        </View>
    );
};

const styles = StyleSheet.create({

    buttonsContainer:{
        backgroundColor: '#ffffff',
        width: '27%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start'
    },



});
