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

const formTypes: string[] = ['Accommodation Name', 'Address', 'Check-in date', 'Check-out date'];
let BackButton = require('../icons/BackButton.png');
let ConfirmButton = require('../icons/ConfirmButton.png');

interface AccommodationFormProps{
    setDisplayPages: (displayPages: boolean[]) => void,
    setMultiplier: (multiplier: number) => void
}

//const multiplier = 2; //pentru status bar, modificat de tastatura cand apare si dispare


const {height} = Dimensions.get('window');

export default function AccommodationForm(props: AccommodationFormProps){

    const [fieldClicked, setFieldClicked] = useState(false);

    const [keyboardDidShowListener, setKeyboardDidShowListener] = useState<KeyboardListener>();

    const [keyboardDidHideListener, setKeyboardDidHideListener] = useState<KeyboardListener>();

    useEffect(() => {
        setKeyboardDidShowListener(Keyboard.addListener('keyboardDidShow', () => props.setMultiplier(1.75)));
        setKeyboardDidHideListener(Keyboard.addListener('keyboardDidHide', () => props.setMultiplier(1)));

        /*return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };*/

    }, []);

    return(
        <ScrollView contentContainerStyle={styles.container}>
            {
                formTypes.map((formType, index) =>
                    <FormInput inputName={formType} key={index} setFieldClicked={setFieldClicked}/>
                )
            }

            <TouchableOpacity>
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