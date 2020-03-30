import * as React from 'react';
import {Button, Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {TouchableHighlight} from "react-native-gesture-handler";
import * as Font from "expo-font";
import {useEffect, useState} from "react";


let Calendar = require('../icons/Calendar.png');
let Cancel = require('../icons/Cancel.png');
let Location = require('../icons/Location.png');
let Box = require('../icons/Box.png');



interface EntryProps{
    faculty: string;
}
export default function Entry(props: EntryProps){

    return(

            <ImageBackground source={Box} style={styles.container}>

                    <View style={styles.auxTopSection}/>
                    <View style={styles.topSection}>
                        <Text style={{fontFamily: 'montserrat', color: "#98A3A7"}}>
                            {props.faculty}
                        </Text>
                    </View>


                    <View style={styles.middleSection}>
                        <TouchableHighlight>
                            <Image source={Calendar} style={styles.button}/>
                        </TouchableHighlight>

                        <TouchableHighlight>
                            <Image source={Location} style={styles.button}/>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableHighlight>
                            <Image source={Cancel} style={styles.cancelButton}/>
                        </TouchableHighlight>
                    </View>


            </ImageBackground>


    );

};

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 50,
        marginTop: 30,
        marginRight: 50,
        height: 250,
        backgroundColor: "#343434"
    },

    auxTopSection:{
        display: 'flex',
        flex: 0.1
    },

    topSection:{
        display: 'flex',
        textAlign: 'center',
        flex: 0.1
    },

    middleSection:{
        justifyContent: 'space-around',
        display: 'flex',
        flex: 0.2,
        flexDirection: 'row'
    },

    button:{
        width: 80,
        height: 80
    },

    cancelButton:{
        height: 80,
        width: 160
    },

    bottomSection:{
        marginTop: 'auto',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flex: 0.7
    }
});