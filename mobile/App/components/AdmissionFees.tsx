import {Image, TouchableOpacity, View, StyleSheet, Text} from "react-native";
import {Overlay} from "react-native-elements";
import * as React from "react";
import {useState} from "react";
import Faculty from "../types/Faculty";


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
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
                <View>
                    {
                        props.userAdmissions.map(faculty =>
                            {
                                let fees = (faculty.universityAdmissionFee !== 0 && once ? faculty.universityAdmissionFee + faculty.facultyAdmissionFee : faculty.facultyAdmissionFee);
                                once = false;
                                return <Text>{faculty.name + ': ' + fees}</Text>;
                            }
                        )
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

    container:{
        alignSelf: 'center'
    },

    button:{
        width: 80,
        height: 80
    }
});