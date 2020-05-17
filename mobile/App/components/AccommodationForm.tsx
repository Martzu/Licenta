import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    SafeAreaView, Dimensions, Keyboard, ScrollView
} from "react-native";

import KeyboardListener from 'react-native-keyboard-listener';

import * as React from "react";
import FormInput from "./FormInput";
import {useEffect, useState} from "react";
import UserAccommodation from "../types/UserAccommodation";

import axios from 'axios';
import {parse} from "react-native-svg";
import {Overlay} from "react-native-elements";

let BackButton = require('../icons/BackButton.png');
let ConfirmButton = require('../icons/ConfirmButton.png');


const formTypes: string[] = ['Accommodation Name', 'Address', 'Check-in date', 'Check-out date'];
const regexes: string[] = ['^(\\w){3,}$', '^(.){3,}$', '^[0-9]{2}\/[0-9]{2}$', '^[0-9]{2}\/[0-9]{2}$'];

interface AccommodationFormProps{
    setDisplayPages: (displayPages: boolean[]) => void,
    setMultiplier: (multiplier: number) => void,
    setUserAccommodation: (userAccommodation: UserAccommodation) => void
}

function allFieldsValid(accommodation: UserAccommodation){
    const regex: RegExp[] = regexes.map(regex => new RegExp(regex));
    return !Object.keys(accommodation).some((field, index) => !regex[index].test(accommodation[field]));
}

function allDatesNotInPast(accommodation: UserAccommodation){
    let fields = Object.keys(accommodation);
    let dateFields = [accommodation[fields[2]], accommodation[fields[3]]];
    return dateFields.reduce((previousValue, currentValue) => dateNotInPast(previousValue) && dateNotInPast(currentValue));
}

function checkOutDateIsCorrect(accommodation: UserAccommodation){
    let isCorrect = false;
    let checkInRegEx = new RegExp(regexes[2]);
    let checkOutRegEx = new RegExp(regexes[2]);
    if(checkInRegEx.test(accommodation.checkIn) && checkOutRegEx.test(accommodation.checkOut)){

        let [checkInDay, checkInMonth]: number[] = accommodation.checkIn.split('/').map(value => parseInt(value));
        let [checkOutDay, checkOutMonth]: number[] = accommodation.checkOut.split('/').map(value => parseInt(value));

        if(checkInDay < checkOutDay && checkInMonth <= checkOutMonth){
            isCorrect = true;
        }
    }
    return isCorrect;
}

function dateNotInPast(date: string){
    let valid = true;
    if(new RegExp('[0-9]{2}\/[0-9]{2}').test(date)){

        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth();

        const data = date.split('/');
        console.log(parseInt(data[0]));
        console.log(day);
        console.log(parseInt(data[1]));
        console.log(month);
        if(parseInt(data[0]) <= day && parseInt(data[1]) <= month + 1){
            valid = false;
        }
        console.log(valid);
    }
    return valid;



}

export default function AccommodationForm(props: AccommodationFormProps){

    const [keyboardDidShowListener, setKeyboardDidShowListener] = useState<KeyboardListener>();

    const [keyboardDidHideListener, setKeyboardDidHideListener] = useState<KeyboardListener>();

    const [displaySuccessful, setDisplaySuccessful] = useState(false);

    const [accommodation, setAccommodation] = useState<UserAccommodation>({name: '', address: '', checkIn: '', checkOut: ''});

    useEffect(() => {
        setKeyboardDidShowListener(Keyboard.addListener('keyboardDidShow', () => props.setMultiplier(1.75)));
        setKeyboardDidHideListener(Keyboard.addListener('keyboardDidHide', () => props.setMultiplier(1)));

    }, []);

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {
                formTypes.map((formType, index) =>
                    <FormInput inputName={formType} key={index} setAccommodation={setAccommodation} fieldName={Object.keys(accommodation)[index]} accommodation={accommodation} regex={regexes[index]} dateNotInPast={dateNotInPast} checkOutDateIsCorrect={checkOutDateIsCorrect}/>
                )
            }
            <Overlay isVisible={displaySuccessful} onBackdropPress={() => props.setDisplayPages([true, false, false])} overlayStyle={{backgroundColor: '#1f1f1f'}}>
                <Text style={{fontFamily: 'montserrat', textAlign: 'center', color: '#00e600', fontSize: 30}}>
                    Successful!
                </Text>
            </Overlay>
            <TouchableOpacity onPress={() => {
                if(allFieldsValid(accommodation) && allDatesNotInPast(accommodation) && checkOutDateIsCorrect(accommodation)){
                    props.setUserAccommodation(accommodation);
                    setDisplaySuccessful(true);

                    axios.post('http://192.168.1.5:8080/accommodation', {username: 'a', accommodationDTO: accommodation});
                }
            }}>
                <Image source={ConfirmButton} style={styles.backButton}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.setDisplayPages([true, false, false])}>
                <Image source={BackButton} style={styles.backButton}/>
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    backButton:{
        width: 90,
        height: 90
    },

    text:{
        textAlign: 'center',
        fontFamily: 'montserrat',
        color: '#98A3A7',
        marginBottom: 10
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
    },


});