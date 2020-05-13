import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";
import {Button, Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import Faculty from "../types/Faculty";
import axios from "axios";
import LocationData from "../types/LocationData";
import Details from "./AdmissionDetails";
import {Overlay} from "react-native-elements";
import AdmissionDetails from "./AdmissionDetails";
import ConflictCard from "./ConflictCard";

let AvailableOff = require('../icons/Available.png');
let AvailableOn = require('../icons/AvailableOn.png');

let GoingOff  = require('../icons/Going.png');
let GoingOn = require('../icons/GoingOn.png');


function checkAdmissionsConflict(currentFaculty: Faculty, userAdmissions: Faculty[], setConflictMessage: (message: string) => void){
    let conflict: boolean = false;
    let conflictMessage = '';
    userAdmissions.forEach(userAdmission => {
        if(parseInt(currentFaculty.examDate) === parseInt(userAdmission.examDate)){
            conflictMessage = userAdmission.name + ' conflicts with ' + currentFaculty.name + ' admission. Cannot ' +
                'participate to two admissions with the same exam date. Remove ' +
                userAdmission.name + ' admission from Going in order to participate to ' + currentFaculty.name + ' admission.';
            conflict = true;
        }
    });
    setConflictMessage(conflictMessage);
    console.log(conflict);
    return conflict;
}

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

    const[overlayVisible, setOverlayVisible] = useState(false);

    const[conflict, setConflict] = useState(false);

    const[conflictMessage, setConflictMessage] = useState('');

    const[requiredDocuments, setRequiredDocuments] = useState('');

    useEffect(() => {
        (async () => {
            let documentsResponse = await axios.get('http://192.168.1.5:8080/documents');
            let documents: string = documentsResponse.data.reduce((previousValue, currentValue) => previousValue + '\n' + currentValue);
            console.log(documents);
            setRequiredDocuments('Required documents: \n\n' + documents);
        })();

    }, []);

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
            if(!checkAdmissionsConflict(currentFaculty, props.userAdmissions, setConflictMessage)){
                const response = await axios.post('http://192.168.1.5:8080/faculty', {username: 'a', facultyId: currentFaculty.id});
                if(response.status === 200){
                    let filteredFaculties = props.faculties.filter(faculty => faculty.id !== currentFaculty.id);
                    setFaculties(filteredFaculties);
                    props.setUserAdmissions([...props.userAdmissions, currentFaculty]);
                    props.setFaculties(filteredFaculties);
                }
            }
            else{
                setConflict(true);
            }

        }
    }

    function handleOnPress(going: boolean){
        setGoingOn(going);
        setFaculties(going ? props.userAdmissions : props.faculties);
    }

    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            <ConflictCard conflictMessage={conflictMessage} overlayVisible={conflict} setOverlayVisible={setConflict}/>
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

            <AdmissionDetails overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} displayText={requiredDocuments}/>
            {
                faculties.map((faculty, index) =>
                        <Entry faculty={faculty} key={index} going={goingOn} handleBottomButtonClick={handleCancelOrParticipate} handleFacultyLocationPress={props.handleFacultyLocationPress} setOverlayVisible={setOverlayVisible}/>
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