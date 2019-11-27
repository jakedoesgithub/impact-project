import * as WebBrowser from 'expo-web-browser';
import React, {useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import * as firebase from 'firebase';
import "firebase/firestore";
import StudentProfileScreen from "./../screens/StudentProfileScreen";
import MentorProfileScreen from "./../screens/MentorProfileScreen";


export default function HomeScreen(props) {
  const [type, setType] = useState("");
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if(!isLoadingComplete){
    var user = firebase.auth().currentUser;
    var userDB = firebase.firestore().collection("users")
    var refrence = userDB.doc(user.uid);
    refrence.get().then(function(doc) {
      if(doc.exists){
        console.log("document exists")
        setType(String(doc.get("userType")))
        console.log(type)
      }
      else{
        console.log("document doesnt exist")
      }
    });
    setLoadingComplete(true);
  }
  else{
    if (type == "student") {
      return(<StudentProfileScreen/>)
    }
    else if (type == "mentor"){
      return(<MentorProfileScreen/>)
    }
    else{
      return(<TextInput>You fucked up</TextInput>)
    }
  }
 
}

HomeScreen.navigationOptions = {
  header: null,
};
