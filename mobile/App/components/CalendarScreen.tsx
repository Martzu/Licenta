import {
    View,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Image,
    ImageBackground,
    TouchableHighlight,
    Text, TouchableOpacity
} from "react-native";
import {useEffect, useState} from "react";
import CalendarEntryProps from "../types/CalendarEntryProps";
import * as React from "react";
import CalendarEntry from "./CalendarEntry";
import MonthConverter from "../types/MonthConverter";
import ButtonContainer from "./ButtonContainer";
import Faculty from "../types/Faculty";
import CalendarDays from "../types/CalendarDays";




const Months: MonthConverter = {0: 'January', 1:'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6:'July', 7:'August', 8:'September', 9: 'October', 10: 'November', 11: 'December'};

let TodayOn = require('../icons/TodayOn.png');
let TodayOff = require('../icons/TodayOff.png');

let MonthOn = require('../icons/MonthOn.png');
let MonthOff = require('../icons/MonthOff.png');

let WeekOn = require('../icons/WeekOn.png');
let WeekOff = require('../icons/WeekOff.png');

interface CalendarScreenProps {
    userAdmissions: Faculty[]
}



function addToCalendar(monthDays: CalendarDays, date: number, facultyName: string, detail: string){
    if(date !== 0){
        if(monthDays[date] !== undefined){
            monthDays[date] += facultyName + ' ' + detail + '\n';
        }
        else{
            monthDays[date] = facultyName + ' ' + detail + '\n';
        }
    }
}

function addSignUpDatesToCalendar(monthDays: CalendarDays, signUpDate: string, facultyName: string){

    let dates: string[] = signUpDate.split('-');
    let startDate: number = parseInt(dates[0]);
    let endDate: number = parseInt(dates[1]);
    for(let date = startDate; date <= endDate; date++){
        addToCalendar(monthDays, date, facultyName, 'sign up');
    }
}

function filterCalendarDays(days: CalendarEntryProps[], setDaysToDisplay: (daysToDisplay: CalendarEntryProps[]) => void, filterType: number){
    let todayDate = new Date();
    let today: number = todayDate.getDate();
    switch(filterType){

        case 0:

            setDaysToDisplay([days[today - 1]]);
            break;

        case 1:
            let currentDaysToDisplay: CalendarEntryProps[] = [];
            //let today: number = todayDate.getDate();
            let dayOfTheWeek: number = todayDate.getDay();

            for(let startingDayOfTheWeek = today - dayOfTheWeek; startingDayOfTheWeek < today; startingDayOfTheWeek++){
                currentDaysToDisplay[currentDaysToDisplay.length] = days[startingDayOfTheWeek];
            }

            for(let startingDayOfTheWeek = dayOfTheWeek; startingDayOfTheWeek < 7; startingDayOfTheWeek++){
                currentDaysToDisplay[currentDaysToDisplay.length] = days[today + (startingDayOfTheWeek - dayOfTheWeek)];
            }

            setDaysToDisplay(currentDaysToDisplay);

            //for a week
            break;

        default:
            setDaysToDisplay(days);
            break;

    }

}



export default function CalendarScreen(props: CalendarScreenProps){

    const [days, setDays] = useState<CalendarEntryProps[]>([]);

    const [daysToDisplay, setDaysToDisplay] = useState<CalendarEntryProps[]>([]);

    const [render, setRender] = useState(false);

    let todayDate = new Date();

    const [buttons, setButtons] = useState<boolean[]>([false, true, false]);

    let currentMonthDays = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).getDate();

    function handleButtonPress(index: number){
        let newState: boolean[] = [false, false, false];
        newState[index] = true;
        setButtons(newState);
    }

    useEffect(() => {

        let monthDays: CalendarDays = {};
        props.userAdmissions.forEach(faculty => {
            let signUpDates: string[] = faculty.signUpDate.length > 2 ? faculty.signUpDate.split(' ') : [faculty.signUpDate];
            if(signUpDates.length > 1){
                signUpDates.forEach(signUpDate => {
                    addSignUpDatesToCalendar(monthDays, signUpDate, faculty.name);
                });
            }
            else{
                addSignUpDatesToCalendar(monthDays, signUpDates[0], faculty.name);
            }
            let resultsDate: number = parseInt(faculty.resultsDate);
            let examDate: number = faculty.examDate.length > 2 ? 0 : parseInt(faculty.examDate);

            addToCalendar(monthDays, resultsDate, faculty.name, 'results');
            addToCalendar(monthDays, examDate, faculty.name, 'exam');


        });
        console.log('yes');
        console.log(monthDays);

        if(days.length === 0){
            for(let i = 1; i <= currentMonthDays; i++){
                days[days.length] = {dayNumber: i.toString(), description: monthDays[i.toString()], month: Months[todayDate.getMonth()], textColor: i === todayDate.getDate() ? '#00e600' : '#98A3A7'};
        }}

        filterCalendarDays(days, setDaysToDisplay,2);

        setRender(true);

    },[]);

    if(!render){
        return <ActivityIndicator/>
    }
    return(
        <ScrollView>
            <View style={styles.imageContainer}>
                <View style={styles.topButtonContainer}>

                    <TouchableOpacity onPress={() => {filterCalendarDays(days, setDaysToDisplay, 1); handleButtonPress(0);}}>
                            <Image source={!buttons[0] && WeekOff || buttons[0] && WeekOn} style={[styles.image, {position: 'relative', left: 70}]}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {filterCalendarDays(days, setDaysToDisplay, 2); handleButtonPress(1);}}>
                        <Image source={!buttons[1] && MonthOff || buttons[1] && MonthOn} style={[styles.image, {position: 'relative', right: 70}]}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity onPress={() => {filterCalendarDays(days, setDaysToDisplay, 0); handleButtonPress(2);}} style={{position: 'relative', bottom: 70, width: 180, height: 100}}>
                        <Image source={!buttons[2] && TodayOff || buttons[2] && TodayOn} style={[styles.todayImage, {position: 'relative', bottom: 70}]}/>
                    </TouchableOpacity>
                </View>

            </View>




            {
                daysToDisplay.map((day, index) =>
                    <CalendarEntry dayNumber={day.dayNumber} month={day.month} description={day.description} textColor={day.textColor} key={index}/>
                )
            }
        </ScrollView>

    );
};

const styles = StyleSheet.create({

    imageContainer:{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: -50
    },

    image:{
        width: 170,
        height: 170
    },

    todayImage:{
        width: 180,
        height: 180
    },

    leftButtonContainer:{
        //backgroundColor: '#ffffff',
        display: 'flex',
        marginLeft: -125,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end'
    },

    topButtonContainer:{
        display: 'flex',
        //backgroundColor: '#000000',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    bottomButtonContainer:{
        //marginTop: -115,
        display: 'flex',
        //backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center'

    }

});



