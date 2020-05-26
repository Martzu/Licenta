import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import MyStack from "./container/MyStack";
import * as Font from "expo-font";
import Expo from 'expo';
import Second from "./screen/Second";



export default function App() {

  const [render, setRender] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({'montserrat': require('./assets/fonts/montserrat.ttf')});

      setRender(true);
    })();
  },[]);

  if(!render){
    return <ActivityIndicator/>
  }

  return(
      <MyStack/>
  );
  /*return (
      <Second/>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
