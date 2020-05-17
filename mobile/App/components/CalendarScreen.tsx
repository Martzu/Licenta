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
import UserAccommodation from "../types/UserAccommodation";
import {Overlay} from "react-native-elements";




const Months: MonthConverter = {0: 'January', 1:'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6:'July', 7:'August', 8:'September', 9: 'October', 10: 'November', 11: 'December'};

let TodayOn = require('../icons/TodayOn.png');
let TodayOff = require('../icons/TodayOff.png');

let MonthOn = require('../icons/MonthOn.png');
let MonthOff = require('../icons/MonthOff.png');

let WeekOn = require('../icons/WeekOn.png');
let WeekOff = require('../icons/WeekOff.png');

let Card = require('../icons/Card.png');

interface CalendarScreenProps {
    userAdmissions: Faculty[],
    userAccommodation: UserAccommodation,
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

function userHasAccommodation(userAccommodation: UserAccommodation){
    return userAccommodation.name && userAccommodation.address && userAccommodation.checkOut && userAccommodation.checkIn;
}

function addAccommodationToCalendar(monthDays: CalendarDays, userAccommodation: UserAccommodation){
    if(userHasAccommodation(userAccommodation)){
        console.log('inside');
        console.log(userAccommodation);
        let checkInDay = parseInt(userAccommodation.checkIn.split('/')[0]);
        let checkOutDay = parseInt(userAccommodation.checkOut.split('/')[0]);

        addToCalendar(monthDays, checkInDay, userAccommodation.name + ' accommodation', 'check in');
        addToCalendar(monthDays, checkOutDay, userAccommodation.name + ' accommodation', 'check out');

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

function fitCalendarEntryData(data: string){
    let transformed: string = '';
    if(data){
        let nrOfEnters: number = data.split('\n').length - 1;
        transformed = nrOfEnters === 1 ? data : data.substr(0,60) + '...';
    }
    return transformed;
}

export default function CalendarScreen(props: CalendarScreenProps){

    const [days, setDays] = useState<CalendarEntryProps[]>([]);

    const [daysToDisplay, setDaysToDisplay] = useState<CalendarEntryProps[]>([]);

    const [render, setRender] = useState(false);

    let todayDate = new Date();

    const [displayCalendarDayData, setDisplayCalendarDayDate] = useState(false);

    const [currentSelectedDayData, setCurrentSelectedDayData] = useState('');

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
        console.log("1");
        addAccommodationToCalendar(monthDays, props.userAccommodation);

        console.log('yes');
        console.log(monthDays);

        if(days.length === 0){
            for(let i = 1; i <= currentMonthDays; i++){
                days[days.length] = {

                    dayNumber: i.toString(), description: monthDays[i.toString()], month: Months[todayDate.getMonth()], textColor: i === todayDate.getDate() ? '#00e600' : '#98A3A7'};
        }}

        filterCalendarDays(days, setDaysToDisplay,2);

        setRender(true);

    },[]);

    if(!render){
        return <ActivityIndicator/>
    }
    return(
        <ScrollView>
            <Overlay animationType={"fade"} overlayStyle={styles.modalDetails} isVisible={displayCalendarDayData} onBackdropPress={() => setDisplayCalendarDayDate(false)}>
                <ImageBackground source={Card} style={{height: 250,width: 250, alignItems:'center', backgroundColor: 'transparent'}}>
                    <Text style={styles.modalText}>
                        {currentSelectedDayData}
                    </Text>
                </ImageBackground>


            </Overlay>
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
                    <CalendarEntry dayNumber={day.dayNumber} month={day.month} wholeDescription={day.description} description={fitCalendarEntryData(day.description)}
                                   textColor={day.textColor}
                                   key={index}
                                   setCurrentSelectedDayData={setCurrentSelectedDayData}
                                   setDisplayCalendarDayDate={setDisplayCalendarDayDate}
                    />
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

    modalText:{
        marginTop: 25,
        marginLeft: 25,
        marginRight: 25,
        fontFamily: 'montserrat',
        color: "#98A3A7"
    },

    modalDetails:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: 150,
        height: 150
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



