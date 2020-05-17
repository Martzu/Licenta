import {Image, TouchableOpacity, View, StyleSheet, Text, ImageBackground} from "react-native";
import {Overlay} from "react-native-elements";
import * as React from "react";
import {useState} from "react";
import Faculty from "../types/Faculty";

let Card = require('../icons/Card.png');
let Fees = require('../icons/Fees.png');

function calculateTotalFees(userAdmissions: Faculty[]): number[]{
    let universityFeeIncluded = false;
    return userAdmissions.map(faculty => (faculty.universityAdmissionFee !== 0 && !universityFeeIncluded) ? faculty.universityAdmissionFee + faculty.facultyAdmissionFee : faculty.facultyAdmissionFee);

}


interface AdmissionFeesProps{
    userAdmissions: Faculty[]
}

export default function AdmissionFees(props: AdmissionFeesProps){

    const [visible, setVisible] = useState(false);

    let once = true;

    return(
        <View>
            <Overlay animationType={"fade"} overlayStyle={styles.modalDetails} isVisible={visible} onBackdropPress={() => setVisible(false)}>
                <View>
                    {
                        <ImageBackground source={Card} style={{height: 250,width: 250, alignItems:'flex-start', backgroundColor: 'transparent'}}>
                            {
                                props.userAdmissions.map(faculty => {
                                    let fees = (faculty.universityAdmissionFee !== 0 && once ? faculty.universityAdmissionFee + faculty.facultyAdmissionFee : faculty.facultyAdmissionFee);
                                    once = false;
                                    return <Text style={styles.text}>{faculty.name + ': ' + fees}</Text>;
                                })
                            }
                        </ImageBackground>
                    }
                </View>
            </Overlay>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.container}>
                <Image source={Fees} style={styles.button}/>
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