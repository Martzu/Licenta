import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from "../screen/Home";
import Second from "../screen/Second";

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator headerMode={null}>

                <Stack.Screen
                    name = "Second"
                    component = {Second}
                />

                <Stack.Screen
                    name = "Home"
                    component={Home}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}