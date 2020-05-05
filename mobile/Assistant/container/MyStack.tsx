import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from "react-native-safe-area-context/lib/typescript/example/App";
import Home from "../screen/Home";
import Second from "../screen/Second";

const Stack = createStackNavigator();

export default function MyStack(){
    return(
      <NavigationContainer>
        <Stack.Navigator>


            <Stack.Screen
                name = "Second"
                component = {Second}
                options={{title: 'Welcome again'}}
            />

            <Stack.Screen
                name = "Home"
                component={Home}
                options={{title: 'Welcome'}}
            />

        </Stack.Navigator>
      </NavigationContainer>
    );
}