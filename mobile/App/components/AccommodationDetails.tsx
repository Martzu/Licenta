
import * as React from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableHighlight, TouchableOpacity, Linking} from "react-native";
import AccommodationData from "../types/AccommodationData";



let descriptionImage = require('../icons/AccPopUp.png');

let PhoneIcon = require('../icons/PhoneIcon.png');

let WebsiteIcon = require('../icons/WebsiteIcon.png');


function handleLinking(linkingTarget: string, linkingType: string){

    return Linking.openURL(linkingType === 'tel' ? `${linkingType}:${linkingTarget}` : `${linkingTarget}`);

}

function handleWebsitePress(website: string){
    return handleLinking(website, 'web');
}

function handlePhonePress(phoneNumber: string) {
    return handleLinking(phoneNumber, 'tel');
}

export default function AccommodationDetails(props: AccommodationData){
    return(

        <View style={styles.container}>
            <ImageBackground source={descriptionImage} style={styles.imageBackground}>
                <Text style={styles.text}>
                    {
                        props.title + "\n" + props.distance + "\n" + props.address
                    }
                </Text>
                {props.distance === '' ? <View/> :
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handlePhonePress(props.phoneNumber)}>
                            <Image source={PhoneIcon} style={styles.image}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleWebsitePress(props.website)}>
                            <Image source={WebsiteIcon} style={styles.image}/>
                        </TouchableOpacity>
                    </View>
                }

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
        width: 365,
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

