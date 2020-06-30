import * as React from 'react';
import {useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import axios from "axios";
import Faculty from "../types/Faculty";
import LocationData from "../types/LocationData";
import displayFromText, {BACKEND_URL} from '../constants/Constants';
import ConflictCard from "./ConflictCard";

let Details = require('../icons/Details.png');
let Cancel = require('../icons/RemoveAdmission.png');
let Location = require('../icons/Location.png');
let Box = require('../icons/Box.png');
let FacultyDetails = require('../icons/FacultyDetails.png');
let Participate = require('../icons/Participate.png');

let CheckResults = require('../icons/CheckResults.png');


interface EntryProps{
    faculty: Faculty;
    handleFacultyLocationPress: (destinations: LocationData[]) => void;
    handleBottomButtonClick: (faculty: Faculty) => void;
    setOverlayVisible: (visible: boolean) => void;
    username: string;
    going: boolean;
}


export default function Entry(props: EntryProps){

    const [render, setRender] = useState<boolean>(true);

    const [resultsVisible, setResultsVisible] = useState<boolean>(false);

    let today = new Date();

    let day = today.getDate();

    useEffect(() => {
        setRender(day <= parseInt(props.faculty.signUpDate.slice(-2)));

    },[]);

    function handleCheckResults(){//also set the message for the overlay and we are good togo
        setResultsVisible(true);
    }

    return(

            props.going ? <ImageBackground source={Box} style={styles.container}>

                    <View style={styles.auxTopSection}/>
                    <View style={styles.topSection}>
                        <Text style={styles.text}>
                            {displayFromText(props.faculty.name) + '\n' + props.faculty.university}
                        </Text>
                    </View>


                    <View style={styles.middleSection}>
                        {!props.going && <TouchableOpacity onPress={() => props.setOverlayVisible(true)}>
                            <Image source={FacultyDetails} style={styles.button}/>
                        </TouchableOpacity> }

                        <TouchableOpacity onPress={() => props.handleFacultyLocationPress([
                            {
                                location: {latitude: props.faculty.latitude, longitude: props.faculty.longitude, title: props.faculty.name},
                                accommodationDetails: {title: props.faculty.name, distance: '0', address: props.faculty.address, phoneNumber: '0', website: ''}
                            }])}>
                            <Image source={Location} style={styles.button}/>
                        </TouchableOpacity>
                    </View>
                    <ConflictCard conflictMessage={day < parseInt(props.faculty.resultsDate) ? 'Not yet available!' : 'Admitted Tax Free!'} setOverlayVisible={setResultsVisible} overlayVisible={resultsVisible}/>
                    <View style={styles.bottomSection}>
                        <TouchableOpacity onPress={props.faculty.confirmed ? () => handleCheckResults(): () => props.handleBottomButtonClick(props.faculty)}>
                            <Image source={props.faculty.confirmed ? CheckResults : Cancel} style={props.faculty.confirmed ? styles.participateButton : styles.cancelButton}/>
                        </TouchableOpacity>
                    </View>

            </ImageBackground> :

                render && <ImageBackground source={Box} style={styles.container}>

                    <View style={styles.auxTopSection}/>
                    <View style={styles.topSection}>
                        <Text style={styles.text}>
                            {displayFromText(props.faculty.name) + '\n' + props.faculty.university}
                        </Text>
                    </View>


                    <View style={styles.middleSection}>
                        {!props.going && <TouchableOpacity onPress={() => props.setOverlayVisible(true)}>
                            <Image source={FacultyDetails} style={styles.button}/>
                        </TouchableOpacity> }

                        <TouchableOpacity onPress={() => props.handleFacultyLocationPress([
                            {
                                location: {latitude: props.faculty.latitude, longitude: props.faculty.longitude, title: props.faculty.name},
                                accommodationDetails: {title: props.faculty.name, distance: '0', address: props.faculty.address, phoneNumber: '0', website: ''}
                            }])}>
                            <Image source={Location} style={styles.button}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableOpacity onPress={() => props.handleBottomButtonClick(props.faculty)}>
                            <Image source={props.going ? Cancel : Participate} style={props.going ? styles.cancelButton : styles.participateButton}/>
                        </TouchableOpacity>
                    </View>


                </ImageBackground>


    );

};

const styles = StyleSheet.create({


    text:{
        marginTop: 7,
        fontFamily: 'montserrat',
        color: "#98A3A7",
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10
    },

    participateButton:{
        height: 60,
        width: 200
    },

    container:{
        display: 'flex',
        flex: 0.4,
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 50,
        marginTop: 30,
        marginRight: 50,
        height: 270,
        backgroundColor: "#343434"
    },

    auxTopSection:{
        display: 'flex',
        flex: 0.1
    },

    topSection:{
        display: 'flex',
        textAlign: 'center',
        flex: 0.1
    },

    middleSection:{
        marginTop: 20,
        justifyContent: 'space-around',
        display: 'flex',
        flex: 0.2,
        flexDirection: 'row'
    },

    button:{
        width: 80,
        height: 80
    },

    cancelButton:{
        height: 80,
        width: 160
    },

    bottomSection:{
        marginTop: 'auto',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flex: 0.7
    }
});