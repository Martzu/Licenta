import {
    View,
    Text,
    Button,
    StyleSheet,
    StatusBar,
    ImageBackground,
    TextInput,
    Image,
    TouchableOpacity, ScrollView, Keyboard, Dimensions
} from "react-native";
import * as React from 'react';
import {useEffect, useState} from "react";
import KeyboardListener from 'react-native-keyboard-listener';

let UsernameInput = require('../icons/UsernameInput.png');
let PasswordInput = require('../icons/PasswordInput.png');

let LoginButton = require('../icons/LoginButton.png');
let SignUpButton = require('../icons/SignUpButton.png');

export default function Login({navigation}){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (

        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.statusBar}/>
            <View style={styles.topSection}/>
            <View style={styles.middleSection}>
                <ImageBackground source={UsernameInput} style={styles.input}>
                    <TextInput style={styles.textInput} onChangeText={text => setUsername(text)}/>
                </ImageBackground>
                <ImageBackground source={PasswordInput} style={styles.input}>
                    <TextInput style={styles.textInput} onChangeText={text => setPassword(text)} secureTextEntry={true}/>
                </ImageBackground>
            </View>



            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Second')}>
                <Image source={LoginButton} style={styles.loginButton}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signUpButton}>
                <Image source={SignUpButton} style={styles.signUpButton}/>
            </TouchableOpacity>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        height: Dimensions.get('screen').height,
        display: 'flex',
        backgroundColor: '#343434',
        alignItems: 'center',

    },

    topSection:{
        flex: 0.2
    },

    middleSection:{
        flex: 0.5,
        alignItems: 'center'
    },


    loginButton:{
        width: 200,
        height: 200,
        marginTop: 30
    },

    signUpButton:{
        width: 310,
        height: 100,
        marginTop: 30
    },

    textInput:{
        width: 275,
        height: 40,
        marginLeft: 10,
        marginTop: 32,
        fontFamily: 'montserrat',
        color: '#98A3A7'
    },

    input:{
        width: 290,
        height: 65,
        marginBottom: 40
    },

    statusBar:{
        backgroundColor: '#343434',
        height: StatusBar.currentHeight
    }
});