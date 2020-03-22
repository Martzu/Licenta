import {
    Button,
    Image,
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Animated, ImageStyle, Dimensions
} from 'react-native';
import * as React from 'react';
import TouchableItem from "@react-navigation/stack/lib/typescript/src/views/TouchableItem";
import {ScrollView, TouchableNativeFeedback} from "react-native-gesture-handler";
import {SafeAreaView} from "react-navigation";
import {useEffect, useState} from "react";
import FadeInAnimation from "../animations/FadeIn";
import Home from "./Home";
import Entry from "../components/Entry";
import Admissions from "../components/Admissions";


let uniOn = require('../icons/UniOn.png');
let uniOff = require('../icons/UniOff.png');
let accOff = require('../icons/AccOff.png');
let accOn = require('../icons/AccOn.png');
let mapsOff = require('../icons/MapsOff.png');
let mapsOn = require('../icons/MapsOn.png');


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
                break;
            }

            case 'maps':{
                setFirstMapsIcon(false);
                setFirstAccIcon(true);
                setFirstUniIcon(true);
                break;
            }

            default:{
                setFirstAccIcon(false);
                setFirstUniIcon(true);
                setFirstMapsIcon(true);
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
                        })
                ]).start():
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
                        })
                ]).start();
    }

    const[currentSelected, setCurrentSelected] = useState('');

    const[enlargeAnimationUni] = useState(new Animated.Value(50));
    const[enlargeAnimationAcc] = useState(new Animated.Value(50));
    const[enlargeAnimationMaps] = useState(new Animated.Value(50));

    const[enlarge, setEnlarge] = useState(true);

    const [firstMapsIcon, setFirstMapsIcon] = useState(true);
    const [firstAccIcon, setFirstAccIcon] = useState(true);
    const [firstUniIcon, setFirstUniIcon] = useState(true);

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
                    <Animated.Image source={firstUniIcon && uniOff || !firstUniIcon && uniOn} style={{borderRadius: 50, width: enlargeAnimationUni, height: enlargeAnimationUni}}/>
                </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableHighlight onPress={() => handleButtonPress('acc')} style={styles.topContainerButtonHighlight}>
                        <Animated.Image source={firstAccIcon && accOff || !firstAccIcon && accOn} style={{borderRadius: 50, width: enlargeAnimationAcc, height: enlargeAnimationAcc}}/>
                    </TouchableHighlight>
                </View>

            </Animated.View>

            <Animated.View style={styles.middleContainer}>
                {!firstMapsIcon && <Home navigation={navigation}/> ||
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
