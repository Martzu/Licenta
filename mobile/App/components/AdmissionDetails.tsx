import {Modal, Text, View, StyleSheet, ImageBackground} from "react-native";
import * as React from "react";
import {Overlay} from "react-native-elements";

interface DetailsProps{
    displayText: string,
    overlayVisible: boolean,
    setOverlayVisible: (visible: boolean) => void
}

let Card = require('../icons/Card.png');

export default function AdmissionDetails(props : DetailsProps){
    return(
            <Overlay overlayStyle={styles.modalDetails} isVisible={props.overlayVisible} onBackdropPress={() => props.setOverlayVisible(false)}>
                <ImageBackground source={Card} style={{height: 200,width: 200, alignItems:'center', backgroundColor: 'transparent'}}>
                    <Text style={styles.text}>
                        {props.displayText}
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
        marginTop: 20,
        fontFamily: 'montserrat',
        color: "#98A3A7"
    }



});