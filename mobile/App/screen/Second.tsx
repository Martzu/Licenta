import {
    StatusBar,
    StyleSheet,
    TouchableHighlight,
    View,
    Animated
} from 'react-native';
import * as React from 'react';
import {useEffect, useState} from "react";

import Admissions from "../components/Admissions";
import CalendarScreen from "../components/CalendarScreen";
import Accommodation from "../components/Accommodation";
import MarkerCoordinates from "../types/MarkerCoordinates";
import Home from "./Home";
import LocationData from "../types/LocationData";


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

    {location: {latitude: 47.516924599, longitude: 25.8585465658, title: 'Voronet'}, accommodationDetails: {title: "", address: "", distance: ""}}

];

const facultyCoordinates: MarkerCoordinates[] = [

    {latitude: 47.63333, longitude: 26.25, title: 'Suceava'},
    {latitude: 47.45, longitude: 26.3, title: 'Falticeni'},
    {latitude: 47.35, longitude: 25.25, title: 'Dorna'}
];

export default function Second({navigation}){

    function navigate(navigation){
        setFirstMapsIcon(!firstMapsIcon);
        navigation.navigate('Home');
    };

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

    };

    useEffect(() => {
        setFirstMapsIcon(true);
        setFirstAccIcon(true);
        setFirstUniIcon(true);

    },[]);

    function changeSize(source:string){

        //setCurrentSelected(source);
        //setEnlarge(!enlarge);

        let shrunk = new Animated.Value(70);

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



    const[destinations, setDestinations] = useState<LocationData[]>(destinationsStartData);

    const[currentSelected, setCurrentSelected] = useState('');

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

    return (

        <View style={styles.container}>
            <View style={styles.statusBar}/>

            <Animated.View style={styles.topContainer}>

                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => handleButtonPress('maps')} style={styles.topContainerButtonHighlight}>
                    <Animated.Image source={firstMapsIcon && mapsOff || !firstMapsIcon && mapsOn} style={{borderRadius: 50, width: enlargeAnimationMaps, height: enlargeAnimationMaps}}/>
                </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => handleButtonPress('uni')} style={styles.topContainerButtonHighlight}>
                    <Animated.Image source={!firstUniIcon && uniOn || firstUniIcon && uniOff} style={{borderRadius: 50, width: enlargeAnimationUni, height: enlargeAnimationUni}}/>
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

            <Animated.View style={styles.middleContainer}>
                {!firstMapsIcon && <Home destinations={destinations} currentLocation={currentLocation}/> ||
                    !firstCalIcon && <CalendarScreen/> ||
                    !firstAccIcon && <Accommodation closeAccommodation={setFirstAccIcon} displayMap={setFirstMapsIcon} setAccommodationDetails={setDestinations} coordinates={facultyCoordinates} setCurrentLocation={setCurrentLocation}/> ||
                    <Admissions/>
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
    statusBar:{
        height: StatusBar.currentHeight,
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
