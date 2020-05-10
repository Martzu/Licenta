import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from "react-native";
import * as React from "react";
import FormInput from "./FormInput";
import {useState} from "react";

const formTypes: string[] = ['Accommodation Name', 'Address', 'Check-in date', 'Check-out date'];
let BackButton = require('../icons/BackButton.png');
let ConfirmButton = require('../icons/ConfirmButton.png');

interface AccommodationFormProps{
    setDisplayPages: (displayPages: boolean[]) => void
}

export default function AccommodationForm(props: AccommodationFormProps){

    const [fieldClicked, setFieldClicked] = useState(false);

    return(
        <SafeAreaView style={styles.container}>
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

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

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

    statusBar:{
        height: StatusBar.currentHeight,
    },

});