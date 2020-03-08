import {
    Button,
    Image,
    ImageBackground,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import * as React from 'react';
import TouchableItem from "@react-navigation/stack/lib/typescript/src/views/TouchableItem";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {SafeAreaView} from "react-navigation";

let bg = require('../icons/bullet.png');

function navigate(navigation){

    navigation.navigate('Home');
};

export default function Second({navigation}){
    return (

        <View style={styles.container}>
            <View style={styles.statusBar}/>

            <View style={styles.topContainer}>

                <TouchableHighlight onPress={() => navigate(navigation)} style={styles.topContainerButtonHighlight}>
                    <Image source={bg} style={styles.image}/>
                </TouchableHighlight>
                <Image source={bg} style={styles.image}/>
                <Image source={bg} style={styles.image}/>

            </View>

            <View style={styles.middleContainer}>
                <Text>Hey</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    statusBar:{
        height: StatusBar.currentHeight,
    },
    image:{
        width: 50,
        height: 50
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
        backgroundColor: '#bbbbbb',
    },
    middleContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc',
    }
});