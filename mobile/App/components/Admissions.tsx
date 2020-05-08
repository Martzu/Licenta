import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import Faculty from "../types/Faculty";
import axios from "axios";
import LocationData from "../types/LocationData";

let AvailableOff = require('../icons/Available.png');
let AvailableOn = require('../icons/AvailableOn.png');

let GoingOff  = require('../icons/Going.png');
let GoingOn = require('../icons/GoingOn.png');

interface AdmissionsProps{
    faculties: Faculty[],
    setFaculties: (faculties: Faculty[]) => void,
    setUserAdmissions: (userAdmissions: Faculty[]) => void,
    handleFacultyLocationPress: (destinations: LocationData[]) => void,
    userAdmissions: Faculty[]
}


export default function Admissions(props: AdmissionsProps){

    const[goingOn, setGoingOn] = useState(false);

    const[faculties, setFaculties] = useState<Faculty[]>(props.faculties);

    useEffect(() => {
        props.userAdmissions.sort((faculty1, faculty2) => faculty1.name.localeCompare(faculty2.name));
    },[props.userAdmissions]);

    useEffect(() => {
        props.faculties.sort((faculty1, faculty2) => faculty1.name.localeCompare(faculty2.name));
    }, [props.faculties]);

    async function handleCancelOrParticipate(currentFaculty: Faculty){
        if(goingOn){
            const response = await axios.delete('http://192.168.1.5:8080/faculty', {data: {username: 'a', facultyId: currentFaculty.id}});
            if(response.status === 200){
                let userAdmissions: Faculty[] = props.userAdmissions.filter(faculty => faculty.id !== currentFaculty.id);
                setFaculties(userAdmissions);
                props.setUserAdmissions(userAdmissions);
                props.setFaculties([...props.faculties, currentFaculty]);
            }
        }
        else{
            const response = await axios.post('http://192.168.1.5:8080/faculty', {username: 'a', facultyId: currentFaculty.id});
            if(response.status === 200){
                let filteredFaculties = props.faculties.filter(faculty => faculty.id !== currentFaculty.id);
                setFaculties(filteredFaculties);
                props.setUserAdmissions([...props.userAdmissions, currentFaculty]);
                props.setFaculties(filteredFaculties);
            }
        }
    }

    function handleOnPress(going: boolean){
        setGoingOn(going);
        setFaculties(going ? props.userAdmissions : props.faculties);
    }

    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            <View style={styles.buttonFilterContainer}>

                <TouchableOpacity onPress={() => handleOnPress(false)}>
                    <ImageBackground source={!goingOn ? AvailableOn : AvailableOff} style={styles.button}>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => handleOnPress(true)}>
                    <ImageBackground source={goingOn ? GoingOn : GoingOff} style={styles.button}>
                    </ImageBackground>
                </TouchableOpacity>

            </View>

            {
                faculties.map((faculty, index) =>
                        <Entry faculty={faculty} key={index} going={goingOn} handleBottomButtonClick={handleCancelOrParticipate} handleFacultyLocationPress={props.handleFacultyLocationPress}/>
                    )
            }
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    buttonFilterContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },

    buttonText:{
        marginTop: 10,
        marginLeft: 35,
    },

    button:{
        width: 120,
        height: 40
    }

});