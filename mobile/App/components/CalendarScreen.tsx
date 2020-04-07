import {View, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import CalendarEntryProps from "../types/CalendarEntryProps";
import * as React from "react";
import CalendarEntry from "./CalendarEntry";
import MonthConverter from "../types/MonthConverter";


const days: CalendarEntryProps[] = [];

const Months: MonthConverter = {0: 'January', 1:'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6:'July', 7:'August', 8:'September', 9: 'October', 10: 'November', 11: 'December'};



export default function CalendarScreen(){

    const [render, setRender] = useState(false);

    let todayDate = new Date();

    let currentMonthDays = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();

    useEffect(() => {

        if(days.length === 0){
            for(let i = 1; i <= currentMonthDays; i++){
                days[days.length] = {dayNumber: i.toString(), description: "Going for a ride", month: Months[todayDate.getMonth()], textColor: i === todayDate.getDate() ? '#00e600' : '#000000'};
        }}

        setRender(true);

    },[]);

    if(!render){
        return <ActivityIndicator/>
    }
    return(
        <ScrollView>
            {
                days.map((day, index) =>
                    <CalendarEntry dayNumber={day.dayNumber} month={day.month} description={day.description} textColor={day.textColor}/>
                )
            }
        </ScrollView>

    );
};


