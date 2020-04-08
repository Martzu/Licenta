
import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from "react-native";
import AccommodationData from "../types/AccommodationData";


let descriptionImage = require('../icons/AccPopUp.png');



export default function AccommodationDetails(props: AccommodationData){
    return(

        <View style={styles.container}>
            <ImageBackground source={descriptionImage} style={styles.imageBackground}>
                <Text style={styles.text}>
                    {
                        props.title + "\n" + props.distance + "\n" + props.address
                    }
                </Text>

            </ImageBackground>
        </View>


    );
};


const styles = StyleSheet.create({

    text:{
        color: '#98A3A7',
        marginTop: 30,
        fontFamily: 'montserrat',
        fontSize: 20,
        textAlign: 'center'
    },

    imageBackground:{
        width: 250,
        height: 150
    },

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

