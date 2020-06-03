import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";
import {
    ActivityIndicator,
    Button,
    Image,
    ImageBackground,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import * as Font from 'expo-font';
import {useEffect, useState} from "react";
import Faculty from "../types/Faculty";
import axios from "axios";
import LocationData from "../types/LocationData";
import Details from "./AdmissionDetails";
import {Overlay} from "react-native-elements";
import AdmissionDetails from "./AdmissionDetails";
import ConflictCard from "./ConflictCard";
import AdmissionFees from "./AdmissionFees";
import UserAdmissionsDetails from "./UserAdmissionsDetails";
import {BACKEND_URL} from "../constants/Constants";
import User from "../types/User";

let AvailableOff = require('../icons/Available.png');
let AvailableOn = require('../icons/AvailableOn.png');

let GoingOff  = require('../icons/Going.png');
let GoingOn = require('../icons/GoingOn.png');

let ClujOn = require('../icons/ClujOn.png');
let ClujOff = require('../icons/ClujOff.png')

let IasiOn = require('../icons/IasiOn.png');
let IasiOff = require('../icons/IasiOff.png');

let BucurestiOn = require('../icons/BucurestiOn.png');
let BucurestiOff = require('../icons/BucurestiOff.png');

let TechnicOn = require('../icons/TechnicOn.png');
let TechnicOff = require('../icons/TechnicOff.png');

let UmanisticOn = require('../icons/UmanisticOn.png');
let UmanisticOff = require('../icons/UmanisticOff.png');


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
    return conflict;
}

function handlePress(array: boolean[], givenIndex: number): boolean[]{
    return array.map((element,index) => index === givenIndex ? ! element : element);
}



interface AdmissionsProps{
    faculties: Faculty[],
    setFaculties: (faculties: Faculty[]) => void,
    setUserAdmissions: (userAdmissions: Faculty[]) => void,
    handleFacultyLocationPress: (destinations: LocationData[]) => void,
    userAdmissions: Faculty[],
    currentUsername: string,
    cityFilter: boolean[],
    facultyTypeFilter: boolean[],
    updateUserFilters: (cityFilter: boolean[], facultyTypeFilter: boolean[]) => void,
}

export default function Admissions(props: AdmissionsProps){

    const[goingOn, setGoingOn] = useState(false);

    const[faculties, setFaculties] = useState<Faculty[]>(props.faculties);

    //sa inceapa cu faculatile dupa filtrul userului
    //const[facultiesToDisplay, setFacultiesToDisplay] = useState<Faculty[]>(props.faculties);

    const[overlayVisible, setOverlayVisible] = useState(false);

    const[conflict, setConflict] = useState(false);

    const[conflictMessage, setConflictMessage] = useState('');

    const[facultyTypeFilter, setFacultyTypeFilter] = useState<boolean[]>(props.facultyTypeFilter);

    const[requiredDocuments, setRequiredDocuments] = useState('');

    //must be user's filter
    const[cityFilter, setCityFilter] = useState<boolean[]>(props.cityFilter);

    const[render, setRender] = useState(false);

    function filterFacultiesAccordingToUserFilter(faculties: Faculty[]): Faculty[]{

        let currentFilter: number[] = cityFilter.map((city, index) => city ? index : -1).filter(city => city !== -1);
        let admissionsToDisplay: Faculty[] = [];
        let facultiesToIterate = goingOn ? props.userAdmissions : faculties;
        currentFilter.map(city =>
            city === 0 ? facultiesToIterate.filter(faculty => faculty.address.includes('Iași')) :
                city === 1 ? facultiesToIterate.filter(faculty => faculty.address.includes('Cluj')) :
                    facultiesToIterate.filter(faculty => faculty.address.includes('București'))
        ).forEach(cityFaculties => {
            admissionsToDisplay = [...admissionsToDisplay, ...cityFaculties];
        });
        if(facultyTypeFilter[0] !== facultyTypeFilter[1]){
            admissionsToDisplay = admissionsToDisplay.filter(admission => !facultyTypeFilter[0] ? admission.isTechnic : !admission.isTechnic);
        }

        return admissionsToDisplay;
    }

    function computeFacultiesToDisplay(): Faculty[]{

        return filterFacultiesAccordingToUserFilter(goingOn ? props.userAdmissions : props.faculties);

    }

    useEffect(() => {
        let admissionsToDisplay: Faculty[] = computeFacultiesToDisplay();
        setFaculties(admissionsToDisplay);
        (async() => await props.updateUserFilters(cityFilter, facultyTypeFilter))();

    },[cityFilter, goingOn, facultyTypeFilter]);

    useEffect(() => {
        (async () => {
            let documentsResponse = await axios.get(BACKEND_URL + '/documents');

            let documents: string = documentsResponse.data.reduce((previousValue, currentValue) => previousValue + '\n' + currentValue);
            setRequiredDocuments('Required documents: \n\n' + documents);

            setRender(true);
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
            const response = await axios.delete(BACKEND_URL + '/faculty', {data: {username: 'a', facultyId: currentFaculty.id}});
            if(response.status === 200){
                let userAdmissions: Faculty[] = props.userAdmissions.filter(faculty => faculty.id !== currentFaculty.id);
                setFaculties(userAdmissions);
                props.setUserAdmissions(userAdmissions);
                props.setFaculties([...props.faculties, currentFaculty]);
            }
        }
        else{
            if(!checkAdmissionsConflict(currentFaculty, props.userAdmissions, setConflictMessage)){
                const response = await axios.post(BACKEND_URL + '/faculty', {username: 'a', facultyId: currentFaculty.id});

                //dFaculties = filterFacultiesAccordingToUserFilter(props.faculties.filter(faculty => faculty.id !== currentFaculty.id));
                if(response.status === 200){
                    //let filteredFaculties = faculties.filter(faculty => faculty.id !== currentFaculty.id);

                    let remainingFaculties = props.faculties.filter(faculty => faculty.id !== currentFaculty.id);
                    let filteredFacultiesToDisplay = filterFacultiesAccordingToUserFilter(props.faculties).filter(faculty => faculty.id !== currentFaculty.id);
                    //console.log(filteredFaculties);
                    //filteredFaculties tre sa-l mai filtrez odata dupa filtru userului
                    setFaculties(filteredFacultiesToDisplay);
                    props.setFaculties(remainingFaculties);
                    props.setUserAdmissions([...props.userAdmissions, currentFaculty]);
                    //props.setFaculties(filteredFaculties);
                }
            }
            else{
                setConflict(true);
            }

        }
    }

    function handleOnPress(going: boolean){
        setGoingOn(going);
        //setFaculties(going ? props.userAdmissions : props.faculties);
        //TODO: acel faculties, filteredFAculties tre sa fie props.faculties dar cred ca-i ok si asa
        //setFacultiesToDisplay(going ? props.userAdmissions : filteredFaculties);
        console.log(props.userAdmissions);
        setFaculties(going ? props.userAdmissions : faculties);
       // setFaculties(props.userAdmissions);
    }

    if(!render){
        return <ActivityIndicator/>
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
            <View style={[styles.buttonFilterContainer, {marginTop: 15}]}>
                <TouchableOpacity onPress={() => setCityFilter(handlePress(cityFilter, 0))} style={styles.leftButton}>
                    <Image source={!cityFilter[0] && IasiOff || IasiOn} style={styles.leftButton}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCityFilter(handlePress(cityFilter, 1))} style={styles.middleButton}>
                    <Image source={!cityFilter[1] && ClujOff || ClujOn} style={styles.middleButton}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setCityFilter(handlePress(cityFilter, 2))} style={styles.rightButton}>
                    <Image source={!cityFilter[2] && BucurestiOff || BucurestiOn} style={styles.rightButton}/>
                </TouchableOpacity>

            </View>

            <View style={styles.facultyTypeContainer}>
                <TouchableOpacity onPress={() => setFacultyTypeFilter(handlePress(facultyTypeFilter, 0))} style={styles.leftRightType}>
                    <Image source={!facultyTypeFilter[0] && TechnicOff || TechnicOn} style={styles.leftRightType}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFacultyTypeFilter(handlePress(facultyTypeFilter, 1))} style={styles.leftRightType}>
                    <Image source={!facultyTypeFilter[1] && UmanisticOff || UmanisticOn} style={styles.leftRightType}/>
                </TouchableOpacity>
            </View>

            {props.userAdmissions.length > 0 && goingOn && <UserAdmissionsDetails userAdmissions={props.userAdmissions} setOverlayVisible={setOverlayVisible}/>}
            <AdmissionDetails goingOn={goingOn} overlayVisible={overlayVisible} setOverlayVisible={setOverlayVisible} displayText={requiredDocuments} userAdmissionsNumber={props.userAdmissions.length}/>
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

    leftRightType:{
        width: 130,
        height: 100
    },

    facultyTypeContainer:{
        flexDirection: 'row',
        justifyContent: "space-around",
        position: 'relative',
        bottom: 45,
        marginBottom: -50
    },


    buttonText:{
        marginTop: 10,
        marginLeft: 35,
    },

    button:{
        width: 120,
        height: 40
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

    rightButton:{
        width: 120,
        height: 100,
        position: 'relative',
        right: 10
    }

});