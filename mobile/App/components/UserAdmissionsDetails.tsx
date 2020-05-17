import {View, Text, ImageBackground, TouchableOpacity, Image, StyleSheet} from "react-native";
import * as React from "react";
import Faculty from "../types/Faculty";
import AdmissionFees from "./AdmissionFees";

let RequiredDocuments = require('../icons/Details.png');

interface UserAdmissionsDetailsProps{
    userAdmissions: Faculty[],
    setOverlayVisible: (visible: boolean) => void
}

export default function UserAdmissionsDetails(props : UserAdmissionsDetailsProps) {
    return (
        <View>
            <AdmissionFees userAdmissions={props.userAdmissions}/>
            <TouchableOpacity style={styles.container} onPress={() => props.setOverlayVisible(true)}>
                <Image source={RequiredDocuments} style={styles.button}/>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({

    modalDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 150,
        height: 150
    },

    text:{
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
        fontFamily: 'montserrat',
        color: "#98A3A7"
    },

    container:{
        alignSelf: 'center'
    },

    button:{
        width: 80,
        height: 80
    }
});