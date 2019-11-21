import React, {useState} from 'react';
import { ImagePicker} from 'expo';
import {Permissions } from 'expo-permissions';
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Button,
  ImageEditor,
} from 'react-native';
import * as firebase from "firebase";

export default function SettingsScreen() {
  const[avatar, setAvatar] = useState("");

 
  return (
    <View>
      <Text>Change Profile Picture</Text>
    </View>
  )
 
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
