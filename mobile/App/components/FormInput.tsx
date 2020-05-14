import {ImageBackground, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import UserAccommodation from "../types/UserAccommodation";

let InputField = require('../icons/InputField1.png');

interface FormInputProps{
    inputName: string,
    fieldName: string,
    setAccommodation: (accommodation: UserAccommodation) => void,
    accommodation: UserAccommodation
}

export default function FormInput(props: FormInputProps){

    return(
        <View>
            <Text style={styles.text}>
                {props.inputName}
            </Text>
            <Text style={styles.inputFormat}>
                {props.inputName === 'Check-in date' || props.inputName === 'Check-out date' ? 'dd/mm' : ''}
            </Text>
            <ImageBackground source={InputField} style={styles.inputForm}>
                <TextInput style={styles.textInput} onChangeText={(text) => props.setAccommodation({...props.accommodation, [props.fieldName]: text})}/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

    text:{
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: '#98A3A7',
        marginBottom: 10,
        marginTop: 30
    },

    inputFormat:{
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: '#525e60'
    },

    inputForm:{
        width: 300,
        height: 40
    },

    textInput:{
        width: 275,
        height: 40,
        marginLeft: 10,
        fontFamily: 'montserrat',
        color: '#98A3A7'
    }

});