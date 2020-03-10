import {useEffect, useState} from "react";
import {Animated} from "react-native";
import * as React from 'react';

const FadeInAnimation = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1000
            }
        ).start();
    },[]);

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: fadeAnim
            }}
        >
            {props.children}
        </Animated.View>
    );
};

export default FadeInAnimation;