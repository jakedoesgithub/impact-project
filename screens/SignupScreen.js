
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default function SignupScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    onSignupPress = () => {
        if (password !== passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onBackToLoginPress = () => {
        props.navigation.navigate("Login");
    }

 
    return (
        <View style={{paddingTop:50, alignItems:"center"}}>

            <Text>Signup</Text>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <View style={{paddingTop:10}} />

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <View style={{paddingTop:10}} />

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                value={passwordConfirm}
                onChangeText={(text) => setPasswordConfirm(text)}
                placeholder="Password (confirm)"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Button title="Signup" onPress={onSignupPress} />

            <Button title="Back to Login" onPress={onBackToLoginPress} />
        </View>
        
    );
}

const styles = StyleSheet.create({

});