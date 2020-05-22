import {ImageBackground, StyleSheet, Text} from "react-native";
import * as React from "react";
import {Overlay} from "react-native-elements";

interface DetailsProps{
    displayText: string,
    overlayVisible: boolean,
    setOverlayVisible: (visible: boolean) => void,
    userAdmissionsNumber: number,
    goingOn: boolean
}

let Card = require('../icons/Card.png');

export default function AdmissionDetails(props : DetailsProps){

    function generateDisplayText(text: string): string{
        let partialDocumentsText: string = '';
        if(props.goingOn){

            if(text.length > 0){
                partialDocumentsText =  text.split(':')[1].split('\n').slice(2).map(value => {
                    let firstChar = value.charAt(0);
                    return firstChar === '3' ? (props.userAdmissionsNumber * 4) + ' ' + value : value.includes('diploma') || value.includes('Report')? value : props.userAdmissionsNumber + ' ' + value;
                }).reduce(((previousValue, currentValue) => previousValue + '\n' + currentValue + ' '));

                if(props.userAdmissionsNumber > 1){
                    partialDocumentsText += '\n' + (props.userAdmissionsNumber - 1 + ' BAC Diploma Receipt') + '\n';
                    partialDocumentsText += (props.userAdmissionsNumber - 1 + ' Report Card Receipt') + '\n';
                }
                console.log(partialDocumentsText);

            }
        }
        else{
            console.log('haha');
            console.log(props.displayText);
            console.log(text);
            partialDocumentsText =  text.split(':')[1].split('\n').slice(2).reduce((previousValue, currentValue) => previousValue + '\n'+ currentValue + '');
        }


        return partialDocumentsText;

    }

    return(
            <Overlay animationType={'fade'} overlayStyle={styles.modalDetails} isVisible={props.overlayVisible} onBackdropPress={() => props.setOverlayVisible(false)}>
                <ImageBackground source={Card} style={{height: 220,width: 220, alignItems:'center', backgroundColor: 'transparent'}}>
                    <Text style={styles.text}>
                        {generateDisplayText(props.displayText)}
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