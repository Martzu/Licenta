import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "../screen/Home";
import Second from "../screen/Second";
import Login from "../screen/Login";
import SignUp from "../screen/SignUp";

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode={null}>
                <Stack.Screen
                    name= 'SignUp'
                    component = {SignUp}
                />

                <Stack.Screen
                    name = 'Login'
                    component = {Login}
                />

                <Stack.Screen
                    name = "Second"
                    component = {Second}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
}