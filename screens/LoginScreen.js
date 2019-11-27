
import React, { useState } from 'react';
import {Image,
    Platform,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert } from 'react-native';

import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window')
export default function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {props.navigation.navigate("Main") }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        props.navigation.navigate("Signup");
    }

    onForgotPasswordPress = () => {
        props.navigation.navigate("ForgotPassword");
    }

    return(
        <View style={styles.backgroundContainer}>
        
        <View style={styles.logoContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo}/>
        <Text style={styles.logoText}>SIGN IN</Text>
        </View> 

        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text) }
          placeholder=".edu Email"
          placeholderTextColor={ 'rgba(255,255,255,0.7)'}
          keyboardType="email-address"
          autoCapitalize="none"
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

      <TouchableOpacity style={styles.btnLogin} onPress={onLoginPress}>
           <Text style={styles.text}>Login</Text> 
        </TouchableOpacity>
            <Button title="Create account" onPress={onCreateAccountPress} />
            <Button title="Forgot Password" onPress={onForgotPasswordPress} />
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
      btnLogin:{
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
