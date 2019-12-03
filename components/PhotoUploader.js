import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Button, Text, View, Alert} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";



export default function PhotoUploader(props){
  let currentUser = firebase.auth().currentUser;
  let userID = currentUser.uid;
  let db = firebase.firestore().collection("users").doc(userID)


    onChangeProfilePicPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled){
          uploadImage(result.uri)
          .then( async () => {
            const ref = await firebase.storage().ref()
            const picRef = await ref.child("pics/"+userID)
            const URL = await picRef.getDownloadURL();
            let userID = firebase.auth().currentUser.uid;
            firebase.firestore().collection("users").doc(userID).update({
              profilePicURL: URL
            })
            Alert.alert("Success")
          })
        }
    }

    uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = await firebase.storage().ref();
      var picRef = await ref.child("pics/" + userID);
      return(picRef.put(blob));
    }

      uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = await firebase.storage().ref();
        var picRef = await ref.child("pics/" + userID);
        return(picRef.put(blob));
      }


    return(
        <Button title="Change Profile Picture" onPress={onChangeProfilePicPress}/>

    )
    
}