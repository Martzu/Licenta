import {Image, Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, StatusBar, Dimensions} from "react-native";
import * as React from "react";



let NoAccommodation = require('../icons/NoAcommodation.png');
let GotAccommodation = require('../icons/GotAcommodation.png');


interface AccommodationMainPageProps{
    setDisplayPages : (displayPages : boolean[]) => void
}

export default function AccommodationMainPage(props: AccommodationMainPageProps){
    return(
        <View style={styles.container}>

            <Text style={styles.text}>
                Do you have accommodation?
            </Text>

            <TouchableOpacity onPress={() => props.setDisplayPages([false, false, true])}>
                <Image source={GotAccommodation} style={styles.image}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.setDisplayPages([false, true, false])}>
                <Image source={NoAccommodation} style={styles.image}/>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },

    text:{
        fontFamily: 'montserrat',
        fontSize: 20,
        marginBottom: 30,
        color: '#98A3A7'
    },

    image:{
        width: 280,
        height: 80
    }

});