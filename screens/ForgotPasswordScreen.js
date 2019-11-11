
import React, { useState } from 'react';
import { Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions, Button, Alert} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';



const {width: WIDTH} = Dimensions.get('window')
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
        <View style={styles.backgroundContainer}>
        
        <View style={styles.logoContainer}>
        <Image source={require('../assets/images/icon.png')} style={styles.logo}/>
        <Text style={styles.logoText}>Forgot Password</Text>
        </View> 
        
        <View style={styles.inputContainer}>
        <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email used"
                keyboardType="email-address"
                placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                autoCapitalize="none"
                underlineColorAndroid='transparent'
                autoCorrect={false}
            />

      <TouchableOpacity style={styles.btnReset} onPress={onResetPasswordPress}>
           <Text style={styles.text}>Reset Password</Text> 
        </TouchableOpacity>

        <Button title="Back to Login" onPress={onBackToLoginPress} />
           
        </View>
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
          btnReset:{
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