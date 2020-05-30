import {
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View,
    Text,
    Animated, ActivityIndicator
} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from "react";

import Admissions from "../components/Admissions";
import CalendarScreen from "../components/CalendarScreen";
import Accommodation from "../components/Accommodation";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Home from "./Home";
import LocationData from "../types/LocationData";
import Faculty from "../types/Faculty";
import axios from 'axios';
import UserAccommodation from "../types/UserAccommodation";
import {parse} from "react-native-svg";
import {Overlay} from "react-native-elements";
import FacultyConfirmation from "../components/FacultyConfirmation";
import {BACKEND_URL} from "../constants/Constants";
import User from "../types/User";

let uniOn = require('../icons/UniOn.png');
let uniOff = require('../icons/UniOff.png');
let accOff = require('../icons/AccOff.png');
let accOn = require('../icons/AccOn.png');
let mapsOff = require('../icons/MapsOff.png');
let mapsOn = require('../icons/MapsOn.png');
let calOn = require('../icons/CalendarOn.png');
let calOff = require('../icons/CalendarOff.png');




//47.516924599 25.8585465658
const destinationsStartData:  LocationData[] = [

    {location: {latitude: 47.516924599, longitude: 25.8585465658, title: 'Voronet'}, accommodationDetails: {title: "", address: "", distance: "", phoneNumber: '', website: ''}}

];



export default function Second({route, navigation}){

    function handleButtonPress(source: string) {
        changeSize(source);
        switch (source) {
            case 'uni':{
                setFirstUniIcon(false);
                setFirstMapsIcon(true);
                setFirstAccIcon(true);
                setFirstCalIcon(true);
                break;
            }

            case 'cal':{
                setFirstMapsIcon(true);
                setFirstUniIcon(true);
                setFirstAccIcon(true);
                setFirstCalIcon(false);
                break;
            }

            case 'maps':{
                setFirstMapsIcon(false);
                setFirstAccIcon(true);
                setFirstUniIcon(true);
                setFirstCalIcon(true);
                setDestinations(destinationsStartData);
                break;
            }

            default:{
                setFirstAccIcon(false);
                setFirstUniIcon(true);
                setFirstMapsIcon(true);
                setFirstCalIcon(true);
                break;
            }


        }

    }


    useEffect(() => {

        (async() => {

            const unAttendingFacultiesRequest = () => axios.post(BACKEND_URL + '/unattending', {username: 'a'});
            const userAdmissionsRequest = () => axios.post(BACKEND_URL + '/user/faculties', {username: 'a'});
            const userAccommodationRequest = () => axios.post(BACKEND_URL + '/userAccommodation', {username: 'a'});

            const [unAttendingFacultiesResponse, userAdmissionsResponse, userAccommodationResponse] = await axios.all([unAttendingFacultiesRequest(), userAdmissionsRequest(), userAccommodationRequest()]);

            setFaculties(unAttendingFacultiesResponse.data);
            setUserAccommodation(userAccommodationResponse.data);
            setFacultiesName(unAttendingFacultiesResponse.data.map(faculty => faculty.name));
            setUserAdmissions(userAdmissionsResponse.data);
            setRender(true);
        })();

    },[]);

    async function updateUserFilters(cityFilter: boolean[], facultyTypeFilter: boolean[]){

        currentUser = {...currentUser, iasiFilter: cityFilter[0], clujFilter: cityFilter[1], bucurestiFilter: cityFilter[2],
            technicFilter: facultyTypeFilter[0], umanisticFilter: facultyTypeFilter[1]
        }
        navigation.setParams({currentUser});
        await axios.post(BACKEND_URL + '/user', {username: currentUser.username, cityFilter, facultyTypeFilter: facultyTypeFilter});
    }



    function changeSize(source:string){

        source === "uni" ?
        Animated.parallel([

            Animated.timing(
                enlargeAnimationUni,
                {
                    toValue: 70,
                    duration: 200
                }),
            Animated.timing(
                enlargeAnimationMaps,
                {
                    toValue: 50,
                    duration: 200
                }),
            Animated.timing(
                enlargeAnimationAcc,
                {
                    toValue: 50,
                    duration: 200
                }),
            Animated.timing(
                enlargeAnimationCal,
                {
                    toValue: 50,
                    duration: 200
                })
        ]).start()
            :
            source === "maps" ?
                Animated.parallel([

                    Animated.timing(
                        enlargeAnimationMaps,
                        {
                            toValue: 70,
                            duration: 200
                        }),
                    Animated.timing(
                        enlargeAnimationUni,
                        {
                            toValue: 50,
                            duration: 200
                        }),
                    Animated.timing(
                        enlargeAnimationAcc,
                        {
                            toValue: 50,
                            duration: 200
                        }),
                    Animated.timing(
                        enlargeAnimationCal,
                        {
                            toValue: 50,
                            duration: 200
                        })
                ]).start():
                source === 'cal' ?
                    Animated.parallel([
                        Animated.timing(
                            enlargeAnimationMaps,
                            {
                                toValue: 50,
                                duration: 200
                            }),
                        Animated.timing(
                            enlargeAnimationUni,
                            {
                                toValue: 50,
                                duration: 200
                            }),
                        Animated.timing(
                            enlargeAnimationAcc,
                            {
                                toValue: 50,
                                duration: 200
                            }),
                        Animated.timing(
                            enlargeAnimationCal,
                            {
                                toValue: 70,
                                duration: 200
                            })
                    ]).start() :
                    Animated.parallel([

                        Animated.timing(
                            enlargeAnimationAcc,
                        {
                            toValue: 70,
                            duration: 200
                        }),
                        Animated.timing(
                            enlargeAnimationUni,
                        {
                            toValue: 50,
                            duration: 200
                        }),
                        Animated.timing(
                            enlargeAnimationMaps,
                        {
                            toValue: 50,
                            duration: 200
                        }),
                        Animated.timing(
                            enlargeAnimationCal,
                        {
                            toValue: 50,
                            duration: 200
                        })
                ]).start();
    }

    function handleFacultyLocationPress(destinations: LocationData[]){
        setFirstMapsIcon(false);
        setDestinations(destinations);
    }

    const [userAccommodation, setUserAccommodation] = useState<UserAccommodation>({name: '', address: '', checkIn: '', checkOut: ''});

    let {currentUser} = route.params;

    const[destinations, setDestinations] = useState<LocationData[]>([]);

    const[currentSelected, setCurrentSelected] = useState('');

    const[render, setRender] = useState(false);
    const [renderMaps, setRenderMaps] = useState(false);

    const[faculties, setFaculties] = useState<Faculty[]>([]);
    const[facultiesName, setFacultiesName] = useState<string[]>([]);
    const[userAdmissions, setUserAdmissions] = useState<Faculty[]>([]);

    const[enlargeAnimationUni] = useState(new Animated.Value(70));
    const[enlargeAnimationAcc] = useState(new Animated.Value(50));
    const[enlargeAnimationMaps] = useState(new Animated.Value(50));
    const[enlargeAnimationCal] = useState(new Animated.Value(50));

    const[enlarge, setEnlarge] = useState(true);

    const [currentLocation, setCurrentLocation] = useState<MarkerCoordinates>();

    const [firstMapsIcon, setFirstMapsIcon] = useState(true);
    const [firstAccIcon, setFirstAccIcon] = useState(true);
    const [firstUniIcon, setFirstUniIcon] = useState(false);
    const [firstCalIcon, setFirstCalIcon] = useState(true);


    const [runOnce, setRunOnce] = useState(true);

    useEffect( () => {
        //let today = new Date();
        //const currentDay = today.getDate();
        /*let userAdmissionsWithExpiredSignUp: Faculty[] = userAdmissions.filter((userAdmission, index) =>
            parseInt(userAdmission.signUpDate.slice(-2)) + 4 === currentDay//modify here to check for expiration date of sign up
        );*/
        /*if(userAdmissions.length === 3){
            let userAdmissionsWithExpiredSignUp: Faculty[] = userAdmissions;

            let clicked: boolean[] = [];
            for(let i = 0; i < userAdmissionsWithExpiredSignUp.length; i++){
                clicked.push(true);
            }

            setClicked(clicked);
            setIsSignUpConfirmationVisible(userAdmissionsWithExpiredSignUp.length > 0);
            setWaitingForConfirmationAdmissions(userAdmissionsWithExpiredSignUp);
        }*/


    },[userAdmissions]);

    const [multiplier, setMultiplier] = useState(1);

    const [clicked, setClicked] = useState<boolean[]>([]);

    const [waitingForConfirmationAdmissions, setWaitingForConfirmationAdmissions] = useState<Faculty[]>([]);

    const [isSignUpConfirmationVisible, setIsSignUpConfirmationVisible] = useState(false);

    if(!render) {
        return <ActivityIndicator/>
    }
    return (

        <View style={styles.container}>
            <View style={{height: multiplier * StatusBar.currentHeight, backgroundColor: '#343434'}}/>

            <Animated.View style={styles.topContainer}>


                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => handleButtonPress('uni')} style={styles.topContainerButtonHighlight}>
                    <Animated.Image source={firstUniIcon && uniOff || !firstUniIcon && uniOn} style={{borderRadius: 50, width: enlargeAnimationUni, height: enlargeAnimationUni}}/>
                </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={() => handleButtonPress('acc')} style={styles.topContainerButtonHighlight}>
                        <Animated.Image source={firstAccIcon && accOff || !firstAccIcon && accOn} style={{borderRadius: 50, width: enlargeAnimationAcc, height: enlargeAnimationAcc}}/>
                    </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={() => handleButtonPress('cal')} style={styles.topContainerButtonHighlight}>
                        <Animated.Image source={firstCalIcon && calOff || !firstCalIcon && calOn} style={{borderRadius: 50, width: enlargeAnimationCal, height: enlargeAnimationCal}}/>
                    </TouchableHighlight>
                </View>

            </Animated.View>

            <FacultyConfirmation isSignUpConfirmationVisible={isSignUpConfirmationVisible} waitingForConfirmationAdmissions={waitingForConfirmationAdmissions} clicked={clicked} setIsSignUpConfirmationVisible={setIsSignUpConfirmationVisible} setUserAdmissions={setUserAdmissions} userAdmissions={userAdmissions}/>

            <Animated.View style={styles.middleContainer}>
                {!firstMapsIcon && <Home destinations={destinations} currentLocation={currentLocation}/> ||
                    !firstCalIcon && <CalendarScreen userAdmissions={userAdmissions} userAccommodation={userAccommodation}/> ||
                    !firstAccIcon && <Accommodation displayMap={setFirstMapsIcon} setAccommodationDetails={setDestinations} setCurrentLocation={setCurrentLocation} faculties={[...faculties, ...userAdmissions]} setMultiplier={setMultiplier} setUserAccommodation={setUserAccommodation} userAccommodation={userAccommodation}/> ||
                    <Admissions updateUserFilters={updateUserFilters} currentUsername={currentUser.username} facultyTypeFilter={[currentUser.technicFilter, currentUser.umanisticFilter]} cityFilter={[currentUser.iasiFilter, currentUser.clujFilter, currentUser.bucurestiFilter]} faculties={faculties} userAdmissions={userAdmissions} setFaculties={setFaculties} setUserAdmissions={setUserAdmissions} handleFacultyLocationPress={handleFacultyLocationPress}/>
                }



            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({

    admission:{
        margin: 'auto'
    },

    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    image:{
        width: 50,
        height: 50,
        borderRadius: 50
    },
    enlargedImage:{
        width: 60,
        height: 60,
        borderRadius: 50
    },
    topContainerButtonHighlight:{
        borderRadius: 50,
        backgroundColor: '#000000',
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#aaaaaa',
    },
    topContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#343434',
    },
    middleContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#343434',
    }
});
