import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";


export default function Admissions(){
    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            <Entry/>
            <Entry/>
            <Entry/>
            <Entry/>
        </ScrollView>

    );
};