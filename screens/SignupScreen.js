
import React, { useState } from 'react';
import {Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


const {width: WIDTH} = Dimensions.get('window')
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
        <View style={styles.backgroundContainer}>
        
        <View style={styles.logoContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo}/>
        <Text style={styles.logoText}>SIGN UP</Text>
        </View> 

        <View style={styles.inputContainer}>
            
            <TextInput 
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder=".edu Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
                autoCorrect={false}
            />

            </View>
            <View style={styles.inputContainer}>
          <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
            />
            </View>

            <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                value={passwordConfirm}
                onChangeText={(text) => setPasswordConfirm(text)}
                placeholder="Confirm Password"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                underlineColorAndroid='transparent'
            />
            </View>
            <TouchableOpacity style={styles.btnSignUp} onPress={onSignupPress}>
           <Text style={styles.text}>Signup</Text> 
        </TouchableOpacity>

            <Button title="Back to Login" onPress={onBackToLoginPress} />
        </View>

    );
}

const styles = StyleSheet.create({
    backgroundContainer: {
        flex:1,
        width: null,
        height: null, 
        backgroundColor: '#B5E3FF'    
          },
    LogoContainer: {
        alignItems: 'center',
            alignContent: 'center',
            marginBottom: 90
          },
          logo:{
            marginTop: 30,
            marginLeft: 40,
            width: 300,
            height: 300,
            alignItems:'center',
            justifyContent: 'center',
          },
          logoText:{
            textAlign: 'center',
            color:'white',
            fontSize: 35,
            fontWeight: '500',
            opacity: 0.5,
            alignItems: 'center',
            fontStyle: 'normal',
          },
          inputContainer: {
            marginTop : 5
          },
          input: {
            width : WIDTH -55,
            height: 45,
            borderRadius:25,
            fontSize: 16,
            paddingLeft: 20,
            backgroundColor: '#368DEB',
            color: 'rgba(255,255,255,0.7)',
            marginHorizontal: 25
          },
          inputIcon: {
            position:"relative",
            top: 8, 
            left: 37
          },
          btnSignUp:{
            justifyContent: 'center',
            alignItems: 'center',
            width : WIDTH -55,
            height: 45,
            borderRadius:25,
            backgroundColor: '#EFA00B',
            marginTop: 20,
            marginLeft: 25
          },
          text:{
            color: 'rgba(255,255,255,0.7)',
            fontSize: 16,
            textAlign: 'center'
          }
    });