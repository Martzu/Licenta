import {ImageBackground, StyleSheet, Text, TextInput, View} from "react-native";
import * as React from "react";

let InputField = require('../icons/InputField1.png');

interface FormInputProps{
    inputName: string
    setFieldClicked: (fieldClicked: boolean) => void
}


export default function FormInput(props: FormInputProps){
    return(
        <View>
            <Text style={styles.text}>
                {props.inputName}
            </Text>
            <ImageBackground source={InputField} style={styles.inputForm}>
                <TextInput style={styles.textInput} onBlur={() => props.setFieldClicked(false)} onFocus={() => props.setFieldClicked(true)}/>
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