import {ScrollView} from "react-native-gesture-handler";
import Entry from "./Entry";
import * as React from "react";



let faculties = ['Computer Science', 'History', 'Literature', 'Foreign Language', 'Mechanics', 'Electrical Engineering'];

export default function Admissions(){
    return (
        <ScrollView style={{backgroundColor: "#343434"}}>
            {
                faculties.map((faculty, index)=>
                    <Entry faculty={faculty} key={index}/>
                )
            }
        </ScrollView>

    );
};