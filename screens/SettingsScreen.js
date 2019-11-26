<<<<<<< HEAD
<<<<<<< HEAD
import React, {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {Permissions } from 'expo-permissions';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
  ImageEditor,
  Alert,
} from 'react-native';
import * as firebase from "firebase";

export default function SettingsScreen() {

  onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled){
      this.uploadImage(result.uri, "test-image")
      .then(() => {
        Alert.alert("Success")
      })
      .catch((error) => {
        Alert.alert(error.message)
      });
    }
  }

  uploadImage = async (uri, imageName) => {
    var user = firebase.auth().currentUser;
    var userID =  user.uid;
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child("profilePictures/" + userID);
    return ref.put(blob);
  }

  const[avatar, setAvatar] = useState("");


  return (
    <View>
      <Text>Change Profile Picture</Text>
      <Button title="Choose Image..." onPress={this.onChooseImagePress} />
    </View>
  )

=======
import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default function SettingsScreen() {
=======
import React from 'react';
import { ExpoConfigView } from '@expo/samples';

export default function SettingsScreen() {
>>>>>>> 0e745f063dfa83acc89c3c1d57366cc81ba943b9
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <ExpoConfigView />;
<<<<<<< HEAD
>>>>>>> 0e745f063dfa83acc89c3c1d57366cc81ba943b9
=======
>>>>>>> 0e745f063dfa83acc89c3c1d57366cc81ba943b9
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
