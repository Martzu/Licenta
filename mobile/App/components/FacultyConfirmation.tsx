import {Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, ImageBackground} from "react-native";
import {Overlay} from "react-native-elements";
import * as React from "react";
import Faculty from "../types/Faculty";
import {useEffect, useState} from "react";
import axios from "axios";
import {BACKEND_URL} from "../constants/Constants";
import User from "../types/User";

let ConfirmParticipation = require('../icons/ConfirmParticipation.png');
let ConfirmParticipationOff = require('../icons/ConfirmParticipationOff.png');

let UnconfirmAdmission = require('../icons/UnconfirmAdmission.png');
let UnconfirmAdmissionOff = require('../icons/UnconfirmAdmissionOff.png');

let BigCard = require('../icons/BigCard.png');

interface FacultyConfirmationProps{
    currentUser: User,
    isSignUpConfirmationVisible: boolean,
    setIsSignUpConfirmationVisible: (visible: boolean) => void,
    clicked: boolean[],
    waitingForConfirmationAdmissions: Faculty[],
    userAdmissions: Faculty[],
    setUserAdmissions: (userAdmissions: Faculty[]) => void
}


export default function FacultyConfirmation(props: FacultyConfirmationProps){

    const [confirmVisible, setConfirmVisible] = useState<boolean[]>(props.clicked);
    const [removeVisible, setRemoveVisible] = useState<boolean[]>(props.clicked);
    const [admissionFacultyIdToRemove, setAdmissionFacultyIdToRemove] = useState<number[]>([]);

    function handlePress(isConfirm: boolean, buttonIndex: number){
        let array = isConfirm? removeVisible : confirmVisible;
        let modifiedArray = array.map((value, index) => index === buttonIndex ? false : value);
        isConfirm? setRemoveVisible(modifiedArray) : setConfirmVisible(modifiedArray) ;
    }


    //tre le adaug la un array si la sfarsit sa le dau remove, de aia dispar
    function removeAdmission(facultyId){
        setAdmissionFacultyIdToRemove(admissionFacultyIdToRemove => [...admissionFacultyIdToRemove, facultyId]);
        /*let userAdmissions: Faculty[] = props.userAdmissions.filter(faculty => faculty.id !== facultyId);
        props.setUserAdmissions(userAdmissions);*/
    }


    function canExit(): boolean{
        let canExit = false;
        let confirmedAdmissions: number = 0;
        for(let i = 0; i < confirmVisible.length; i++){
            confirmedAdmissions += !(confirmVisible[i] && removeVisible[i]) ?  1 : 0;
        }
        console.log("butoane apasate");
        console.log("confirm");
        console.log(confirmVisible);
        console.log();
        console.log("remove");
        console.log(removeVisible);

        if(confirmedAdmissions === props.clicked.length){

            (async () => axios.all(admissionFacultyIdToRemove.map(facultyId => axios.delete(BACKEND_URL + '/faculty',{data: {username: props.currentUser.username, facultyId: facultyId}}))))();
            let userAdmissions: Faculty[] = [];
            admissionFacultyIdToRemove.forEach(facultyId => {
                userAdmissions = props.userAdmissions.filter(faculty => faculty.id !== facultyId);
            })

            userAdmissions = userAdmissions.map(userAdmission => {return {...userAdmission, ["confirmed"]: true};});
            props.setUserAdmissions(userAdmissions);
            canExit = true;
        }

        return canExit;
    }

    return (
        <Overlay isVisible={props.isSignUpConfirmationVisible} overlayStyle={styles.modalDetails} onBackdropPress={() => props.setIsSignUpConfirmationVisible(!canExit())}>
            <ImageBackground source={BigCard} style={{height: 600,width: 380, alignItems:'center', backgroundColor: 'transparent'}}>
                <Text style={[styles.text, {position: 'relative', top: 50}]}>
                    Confirm the admissions you signed up to {'\n'}before tapping outside!
                </Text>
                <View style={{height: 60}}/>
                <ScrollView>
                    {
                        props.waitingForConfirmationAdmissions.map((admission, index) =>
                            <View style={styles.admissionEntry}>
                                <View style={{width: 140}}>
                                    <Text style={styles.text}>
                                        {
                                            admission.name
                                        }
                                    </Text>
                                </View>
                                {<TouchableOpacity onPress={async() => {handlePress(true, index); await axios.post(BACKEND_URL + "/user-admission/confirm", {username: props.currentUser.username, facultyId: admission.id}) }} style={{marginRight: -15}}><Image style={styles.confirmImage} source={confirmVisible[index] && ConfirmParticipation || ConfirmParticipationOff}/></TouchableOpacity>}
                                {<TouchableOpacity onPress={async() => {handlePress(false, index); removeAdmission(admission.id);}}><Image style={styles.unconfirmImage} source={removeVisible[index] && UnconfirmAdmission || UnconfirmAdmissionOff}/></TouchableOpacity>}
                            </View>

                        )
                    }
                </ScrollView>
                <View style={{height: 50}}/>
            </ImageBackground>
        </Overlay>

    );
}

const styles = StyleSheet.create({

    admissionEntry:{
        flexDirection: 'row',
        alignItems: 'center'
    },

    modalDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 320,
        height: 520
    },

    text:{
        fontFamily: 'montserrat',
        color: "#98A3A7"
    },
    confirmImage:{
        width: 80,
        height: 80
    },

    unconfirmImage:{
        width: 110,
        height: 60,
    }
});