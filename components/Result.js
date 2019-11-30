import React from 'react';
import {Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert,
    ScrollView} from 'react-native';
import * as firebase from 'firebase';

export default function Result(props) {

    return (
        <View>
            <Text>Username: {props.UserName}</Text>
            <Text>Name: {props.FirstName} {props.LastName}</Text>
            <Text>City: {props.City}</Text>
            <Text>State: {props.State}</Text>
            <Text>School: {props.School}</Text>
        </View>
    )
}