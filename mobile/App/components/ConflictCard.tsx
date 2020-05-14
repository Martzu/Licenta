import {View, Text, ImageBackground, StyleSheet} from "react-native";
import * as React from "react";
import {Overlay} from "react-native-elements";

let Card = require('../icons/Card.png');

interface ConflictCardProps{
    conflictMessage: string,
    setOverlayVisible: (visible: boolean) => void,
    overlayVisible: boolean
}

export default function ConflictCard(props: ConflictCardProps){

    return(
        <Overlay animationType={'fade'} isVisible={props.overlayVisible} overlayStyle={styles.modalDetails} onBackdropPress={() => props.setOverlayVisible(false)}>
            <ImageBackground source={Card} style={{height: 250,width: 250, alignItems:'center', backgroundColor: 'transparent'}}>
                <Text style={styles.text}>
                    {props.conflictMessage}
                </Text>
            </ImageBackground>
        </Overlay>
    );
}

const styles = StyleSheet.create({
    modalDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 150,
        height: 150
    },

    text:{
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
        fontFamily: 'montserrat',
        color: "#98A3A7"
    }



});