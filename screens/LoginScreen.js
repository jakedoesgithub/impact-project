
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


export default function LoginScreenOld(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        props.navigation.navigate("Signup");
    }

    onForgotPasswordPress = () => {
        props.navigation.navigate("ForgotPassword");
    }

    return(
        <View style={{paddingTop:50, alignItems:"center"}}>

            <Text>Login</Text> 

            <TextInput style={{width: 200, height: 40, borderWidth: 1}}
                value={email}
                onChangeText={(text) => setEmail(text) }
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

            <Button title="Login" onPress={onLoginPress} />
            <Button title="Create account..." onPress={onCreateAccountPress} />
            <Button title="Forgot Password..." onPress={onForgotPasswordPress} />
        </View>
    );
        
    
}

const styles = StyleSheet.create({

});