import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';
import { TestComponent, PhoneButton } from './../components/AppComponents';
import * as firebase from 'firebase';


export default function SettingsScreen(props) {

  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
 
    // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

  return (
    <ScrollView style={{flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10,}}>
      <Button title="Sign out" onPress={onSignoutPress} />

      <TextInput style={styles.textInput} value={currentPassword}
        placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
        onChangeText={(text) => setCurrentPassword(text) }
      />

      <TextInput style={styles.textInput} value={newPassword}
        placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
        onChangeText={(text) =>  setNewPassword(text) }
      />

      <Button title="Change Password" onPress={onChangePasswordPress} />

      <TextInput style={styles.textInput} value={newEmail}
        placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
        onChangeText={(text) => setNewEmail(text) }
      />

      <Button title="Change Email" onPress={onChangeEmailPress} />

    </ScrollView>
  );
};


const styles = StyleSheet.create({
  text: { color: "white", fontWeight: "bold", textAlign: "center", fontSize: 20, },
  textInput: { borderWidth:1, borderColor:"gray", marginVertical: 20, padding:10, height:40, alignSelf: "stretch", fontSize: 18, },
});

SettingsScreen.navigationOptions = {
  title: 'app.json',
};

