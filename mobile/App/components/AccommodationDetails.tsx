
import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableHighlight, TouchableOpacity} from "react-native";
import AccommodationData from "../types/AccommodationData";


let descriptionImage = require('../icons/AccPopUp.png');

let PhoneIcon = require('../icons/PhoneIcon.png');

let WebsiteIcon = require('../icons/WebsiteIcon.png');

export default function AccommodationDetails(props: AccommodationData){
    return(

        <View style={styles.container}>
            <ImageBackground source={descriptionImage} style={styles.imageBackground}>
                <Text style={styles.text}>
                    {
                        props.title + "\n" + props.distance + "\n" + props.address
                    }
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => console.log('hey')}>
                        <Image source={PhoneIcon} style={styles.image}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log('hey')}>
                        <Image source={WebsiteIcon} style={styles.image}/>
                    </TouchableOpacity>
                </View>


            </ImageBackground>
        </View>


    );
};


const styles = StyleSheet.create({

    text:{
        color: '#98A3A7',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        fontFamily: 'montserrat',
        fontSize: 20,
        textAlign: 'center'
    },

    imageBackground:{
        width: 355,
        height: 230,
        marginBottom: 20
    },

    image:{
        width: 70,
        height: 70
    },

    container:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around',

    }

});

