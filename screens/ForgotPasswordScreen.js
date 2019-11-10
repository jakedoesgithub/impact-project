
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

export default function ForgotPasswordScreen(props) {
    const [email, setEmail] = useState("");


    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        props.navigation.navigate("Login");
    }

    return (
        <View style={{paddingTop:50, alignItems:"center"}}>

            <Text>Forgot Password</Text>

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <Button title="Reset Password" onPress={onResetPasswordPress} />
            <Button title="Back to Login..." onPress={onBackToLoginPress} />
        </View>
    );
    
}

const styles = StyleSheet.create({

});