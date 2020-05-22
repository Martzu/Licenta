import UserAccommodation from "../types/UserAccommodation";
import {View, Text, StyleSheet} from "react-native";
import * as React from "react";


interface AccommodationDisplayProps{
    userAccommodation: UserAccommodation
}

function capitalize(text: string){
    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function AccommodationDisplay(props: AccommodationDisplayProps){
    return(
        <View style={styles.container}>
            <Text style={{fontFamily: 'montserrat', textAlign: 'center', color: '#98A3A7', fontSize: 40, marginTop: -60, marginBottom: 50}}>Accommodation Details</Text>
            {
                Object.keys(props.userAccommodation).map(field => <Text style={styles.text}>{capitalize(field) + '\n' + props.userAccommodation[field]}</Text>)
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'column',
        //alignItems: 'center',
    },
    text:{
        fontFamily: 'montserrat',
        textAlign: 'center',
        color: '#98A3A7',
        fontSize: 24,
        marginBottom: 30
    }
});