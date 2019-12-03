import React, {useState} from 'react';
import { ScrollView, Image, StyleSheet, Dimensions, TouchableOpacity, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';
import { TestComponent, PhoneButton } from './../components/AppComponents';
import { Icon } from 'react-native-elements';
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window');
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
    //<ScrollView style={{flex: 1, flexDirection: "column",backgroundColor: '#a9a9a9', paddingVertical: 50, paddingHorizontal: 10,}}>
      <View style={styles.background}>
        <Image source={require('../assets/images/BGI.png')} style={styles.backgroundContainer}/>
        <View style={styles.container}>
          <TextInput style={styles.textInput} value={currentPassword}
            placeholder="Current Password" placeholderTextColor={ 'rgba(255,255,255,0.7)'} autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) => setCurrentPassword(text) }
          />

          <TextInput style={styles.textInput} value={newPassword}
            placeholder="New Password" placeholderTextColor={ 'rgba(255,255,255,0.7)'} autoCapitalize="none" secureTextEntry={true}
            onChangeText={(text) =>  setNewPassword(text) }
          />

        <TextInput style={styles.textInput} value={newEmail}
          placeholder="New Email" placeholderTextColor={ 'rgba(255,255,255,0.7)'} autoCapitalize="none" keyboardType="email-address"
          onChangeText={(text) => setNewEmail(text) }
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onChangeEmailPress, onChangePasswordPress}>
            <Text style={styles.text}>SAVE CHANGES</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signOutContainer}>
          <TouchableOpacity onPress={onSignoutPress}>
            <Text style={styles.text}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>

    //</ScrollView>
  );
};


const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'absolute'
  },
  text: {
    color: 'white',
  },
  textInput: {
    width : WIDTH -55,
    height: 45,
    borderRadius:25,
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: '#0075C4',
    color: '#1F2421',
    marginHorizontal: 25,
    marginTop: 20,
  },
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width : WIDTH -55,
    height: 45,
    borderRadius:25,
    backgroundColor: '#579c61',
    marginTop: 20,
    marginHorizontal: 25,
  },
  signOutContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    width : WIDTH -55,
    height: 45,
    borderRadius:25,
    backgroundColor: '#d1242c',
    marginTop: 20,
    marginHorizontal: 25,
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute'
  }


});

SettingsScreen.navigationOptions = {
  title: 'Account Settings',
  headerStyle: {
      backgroundColor: '#2398f4',
    },
    headerTintColor: '#B5E3FF',
    headerTitleStyle: {
    fontWeight: 'bold',
    }
};
