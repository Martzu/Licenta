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
    Animated, ImageStyle
} from 'react-native';
import * as React from 'react';
import TouchableItem from "@react-navigation/stack/lib/typescript/src/views/TouchableItem";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {SafeAreaView} from "react-navigation";
import {useEffect, useState} from "react";
import FadeInAnimation from "../animations/FadeIn";


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

    useEffect(() => {
        setFirstMapsIcon(true);
        setFirstAccIcon(true);
        setFirstUniIcon(true);

    },[]);

    function changeSize(){
        setEnlarge(!enlarge);
        setFirstUniIcon(!firstUniIcon);
        let value = enlarge == true ? 70 : 50;
        Animated.timing(
            enlargeAnimation,
            {
                toValue: value,
                duration: 200
            }).start();

    }

    const[enlargeAnimation] = useState(new Animated.Value(50));
    const[enlarge, setEnlarge] = useState(true);

    const [firstMapsIcon, setFirstMapsIcon] = useState(true);
    const [firstAccIcon, setFirstAccIcon] = useState(true);
    const [firstUniIcon, setFirstUniIcon] = useState(true);

    return (

        <View style={styles.container}>
            <View style={styles.statusBar}/>

            <Animated.View style={styles.topContainer}>

                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => navigate(navigation)} style={styles.topContainerButtonHighlight}>
                    <Image source={firstMapsIcon && mapsOff || !firstMapsIcon && mapsOn} style={styles.image}/>
                </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                <TouchableHighlight onPress={() => changeSize()} style={styles.topContainerButtonHighlight} >
                    <Animated.Image source={firstUniIcon && uniOff || !firstUniIcon && uniOn} style={{borderRadius: 50, width: enlargeAnimation, height: enlargeAnimation}}/>
                </TouchableHighlight>
                </View>

                <View style={styles.buttonContainer}>
                <Image source={firstAccIcon && accOff || !firstAccIcon && accOn} style={styles.image}/>
                </View>
            </Animated.View>

            <Animated.View style={styles.middleContainer}>
                <FadeInAnimation>
                    <Text>aa</Text>
                </FadeInAnimation>
            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({


    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#343434',
    },
    middleContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    }
});
