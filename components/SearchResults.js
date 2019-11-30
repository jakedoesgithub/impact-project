import React, {useState}from 'react';
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
import "firebase/firestore";
import Result from "./Result";

/*
props:
    City
    State
    School
    Major
*/
export default function SearchResults(props){
    const[city, setCity] = useState(props.City);
    const[homeState, setHomeState] = useState(props.State)
    const[school, setSchool] = useState(props.School);
    const[major, setMajor] = useState(props.Major);
    const[isLoadingComplete, setLoadingComplete] = useState(false);
    const[data, setData] = useState([]);
    let query = firebase.firestore().collection("users")
    

    

    if(!isLoadingComplete){
        if(city !== ""){
            query = query.where("city", "==", city);
        }
        if(homeState !== ""){
            query = query.where("state", "==", homeState)
        }
        if(school !== ""){
            query = query.where("school", "==", school);
        }
        query = query.where("major", "==", major);
        props.ResultFunction(query);
        setLoadingComplete(true);
    }     
}

