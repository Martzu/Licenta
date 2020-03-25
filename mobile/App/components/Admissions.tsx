import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";
import {Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";

let Available = require('../icons/Available.png');
let Going  = require('../icons/Going.png');

let faculties = ['Computer Science', 'History', 'Literature', 'Foreign Language', 'Mechanics', 'Electrical Engineering'];

export default function Admissions(){
    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            <View style={styles.buttonFilterContainer}>

                <TouchableOpacity>
                    <ImageBackground source={Available} style={styles.button}>
                        <Text style={styles.buttonText}>Available</Text>
                    </ImageBackground>


                </TouchableOpacity>
                <TouchableOpacity>
                    <ImageBackground source={Going} style={styles.button}>
                        <Text style={styles.buttonText}>Going</Text>
                    </ImageBackground>
                </TouchableOpacity>

            </View>

            {
                faculties.map((faculty, index)=>
                    <Entry faculty={faculty} key={index}/>
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
        marginLeft: 35
    },

    button:{
        width: 120,
        height: 40
    }

});