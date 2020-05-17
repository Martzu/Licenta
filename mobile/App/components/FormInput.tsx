import {ImageBackground, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";
import UserAccommodation from "../types/UserAccommodation";
import {useState} from "react";

let InputField = require('../icons/InputField1.png');

interface FormInputProps{
    inputName: string,
    fieldName: string,
    setAccommodation: (accommodation: UserAccommodation) => void,
    accommodation: UserAccommodation,
    dateNotInPast: (date: string) => boolean,
    checkOutDateIsCorrect: (accommodation: UserAccommodation) => boolean,
    regex: string
}

function isDateField(fieldName: string){
    return fieldName === 'checkIn' || fieldName === 'checkOut';
}


export default function FormInput(props: FormInputProps){

    function currentFieldIsValid(){
        let value = props.accommodation[props.fieldName];
        let errorEncountered: boolean = false;
        let errorMessage: string = '';
        let regex = new RegExp(props.regex);
        if(regex.test(value)){
            if(isDateField(props.fieldName)){
                if(!props.dateNotInPast(value)){
                    errorEncountered = true;
                    errorMessage = 'Date cannot be in past';
                }
                else{
                    if(props.fieldName === 'checkOut' && !props.checkOutDateIsCorrect(props.accommodation)){
                        errorEncountered = true;
                        errorMessage = 'Check out day is after check in';
                    }
                    else{
                        errorEncountered = false;
                    }

                }
            }
        }
        else{
            errorEncountered = true;
            errorMessage = 'Wrong format';
        }

        setError(errorEncountered);
        setDisplayMessage(errorMessage);


    }

    const [error, setError] = useState(false);

    const [displayMessage, setDisplayMessage] = useState('');


    return(
        <View>
            <Text style={styles.text}>
                {props.inputName}
            </Text>
            <Text style={styles.inputFormat}>
                {props.inputName === 'Check-in date' || props.inputName === 'Check-out date' ? 'dd/mm' : ''}
            </Text>
            <ImageBackground source={InputField} style={styles.inputForm}>
                <TextInput style={styles.textInput} onBlur={() => {currentFieldIsValid(); }} onChangeText={(text) => props.setAccommodation({...props.accommodation, [props.fieldName]: text})}/>
            </ImageBackground>
            {
                error && <Text style={styles.errorText}>{displayMessage}</Text>
            }

        </View>
    );
}

const styles = StyleSheet.create({

    errorText:{
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: 'red',
    },

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