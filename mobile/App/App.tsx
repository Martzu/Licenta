import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from "./container/MyStack";

export default function App() {
  return (
    <MyStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
