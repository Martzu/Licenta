import {
    View,
    Text,
    Button,
    StatusBar,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView, Dimensions
} from "react-native";
import * as React from 'react';
import {useState} from "react";


let UsernameInput = require('../icons/UsernameInput.png');
let PasswordInput = require('../icons/PasswordInput.png');

let IasiOn = require('../icons/IasiOn.png');
let IasiOff = require('../icons/IasiOff.png');

let ClujOn = require('../icons/ClujOn.png');
let ClujOff = require('../icons/ClujOff.png');

let BucurestiOn = require('../icons/BucurestiOn.png');
let BucurestiOff = require('../icons/BucurestiOff.png');


let TechnicOn = require('../icons/TechnicOn.png');
let TechnicOff = require('../icons/TechnicOff.png');

let UmanisticOn = require('../icons/UmanisticOn.png');
let UmanisticOff = require('../icons/UmanisticOff.png');

let CreateAccountIcon = require('../icons/CreateAccountIcon.png');


function handlePress(array: boolean[], givenIndex: number): boolean[]{
    return array.map((element,index) => index === givenIndex ? ! element : element);
}

export default function SignUp({navigation}){

    const [cityButtonClicked, setCityButtonClicked] = useState<boolean[]>([false, false, false]);

    const [facultyTypeClicked, setFacultyTypeClicked] = useState<boolean[]>([false, false]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.statusBar}/>
            <View style={styles.statusBar}/>

            <View style={styles.topSection}>
                <ImageBackground source={UsernameInput} style={styles.input}>
                    <TextInput style={styles.textInput}/>
                </ImageBackground>

                <ImageBackground source={PasswordInput} style={styles.input}>
                    <TextInput style={styles.textInput}/>
                </ImageBackground>
            </View>

            <Text style={styles.text}>
                Pick a city. You can choose a different one after logging in.
            </Text>

            <View style={styles.bottomSection}>
                <View style={styles.cityContainer}>
                    <TouchableOpacity onPress={() => setCityButtonClicked(handlePress(cityButtonClicked, 0))} style={styles.leftButton}>
                        <Image source={!cityButtonClicked[0] && IasiOff || IasiOn} style={styles.leftButton}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCityButtonClicked(handlePress(cityButtonClicked, 1))} style={styles.middleButton}>
                        <Image source={!cityButtonClicked[1] && ClujOff || ClujOn} style={styles.middleButton}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setCityButtonClicked(handlePress(cityButtonClicked, 2))} style={styles.rightButton}>
                        <Image source={!cityButtonClicked[2] && BucurestiOff || BucurestiOn} style={styles.rightButton}/>
                    </TouchableOpacity>
                </View>
            </View>

            <Text style={styles.text}>
                Pick a domain.
                You can change after logging in.
            </Text>

            <View style={styles.facultyTypeContainer}>
                <TouchableOpacity onPress={() => setFacultyTypeClicked(handlePress(facultyTypeClicked, 0))} style={styles.leftType}>
                    <Image source={!facultyTypeClicked[0] && TechnicOff || TechnicOn} style={styles.leftType}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFacultyTypeClicked(handlePress(facultyTypeClicked, 1))} style={styles.rightType}>
                    <Image source={!facultyTypeClicked[1] && UmanisticOff || UmanisticOn} style={styles.rightType}/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.createAccountIcon}>
                <Image source={CreateAccountIcon} style={styles.createAccountIcon}/>
            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({

    container:{
        display: 'flex',
        backgroundColor: '#343434'
    },

    cityContainer:{
        flexDirection: 'row'
    },

    facultyTypeContainer:{
        flexDirection: 'row',
        justifyContent: "space-between"
    },

    topSection:{
        alignItems: 'center',
        flex: 0.4
    },

    bottomSection:{
        alignItems: 'center',
        flex: 0.6
    },

    input:{
        width: 290,
        height: 65,
        marginBottom: 40
    },

    statusBar:{
        backgroundColor: '#343434',
        height: StatusBar.currentHeight
    },

    middleButton:{
        width: 150,
        height: 150,
        position: 'relative',
        bottom: 10
    },

    leftButton:{
        width: 120,
        height: 100,
        position: 'relative',
        left: 10
    },

    createAccountIcon:{
        width: 130,
        height: 130,
        alignSelf: "center",
        position: "relative",
        bottom: 20
    },

    leftType:{
        width: 130,
        height: 100
    },

    rightType:{
        width: 130,
        height: 100
    },

    rightButton:{
        width: 120,
        height: 100,
        position: 'relative',
        right: 10
    },

    text:{
        color: '#98A3A7',
        fontFamily: 'montserrat',
        textAlign: 'center',
        marginBottom: 20
    },

    textInput:{
        width: 275,
        height: 40,
        marginLeft: 10,
        marginTop: 32,
        fontFamily: 'montserrat',
        color: '#98A3A7'
    }

});