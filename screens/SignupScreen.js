import React, { useState } from 'react';
import {Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert,
    ScrollView,
    Picker  } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';


const {width: WIDTH} = Dimensions.get('window')
export default function SignupScreen(props) {
    const [email_address, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName] = useState("");
    const [user_type, setUserType] = useState("none");
    const [user_city, setUserCity] = useState("");
    const [user_state, setUserState] = useState("");
  

    onSignupPress = async () => {
        if (password !== passwordConfirm) {
            Alert.alert("Passwords do not match")
            return;
        }
        var emailRegex = /.edu$/;
        if (!emailRegex.test(email_address)){
          Alert.alert("Email must be a university email ending in .edu")
          return;
        }
        if (first_name.length < 1){
          Alert.alert("First Name must not be blank")
          return;
        }
        if (last_name.length < 1){
          Alert.alert("Last Name must not be blank")
          return;
        }
        if (user_name.length < 1){
          Alert.alert("User Name must not be blank")
          return;
        }
        if (user_city.length < 1){
          Alert.alert("City must not be blank")
          return;
        }
        if (user_state.length < 1){
          Alert.alert("State must not be blank")
          return;
        }
        if (user_type == "none"){
          Alert.alert("You must select either Mentor or Student as User Type")
          return;
        }
        //insert condition to check userType

        firebase.auth().createUserWithEmailAndPassword(email_address, password)
            .then(async({user}) => {
              Alert.alert("Account successfuly created");
              createUserInDB(user);
            })
    }

    onBackToLoginPress = () => {
        props.navigation.navigate("Login");
    }

    createUserInDB = async (userToken) => { 
      const storageRef = await firebase.storage().ref();
      const defaultPicURL = await  storageRef.child("images/avatar_placeholder_small.png").getDownloadURL()
      await firebase.firestore().collection("users").doc(userToken.uid).set({
        email:email_address,
        userID: userToken.uid,
        firstName: first_name,
        lastName: last_name,
        userName: user_name,
        userType: user_type,
        city: user_city,
        state: user_state,
        major: "N/A",
        school: "N/A",
        creationDate: firebase.firestore.FieldValue.serverTimestamp(),
        profilePicURL: String(defaultPicURL),
        connections: [userToken.uid],
        bio: ""
      }).then(()=> {
        console.log("Document written to users with ID: ", userToken.uid);
    }).catch(function(error) {
        console.error("Error adding document: ", error);
  });

    }
    return (
        <ScrollView>
          <View style={styles.backgroundContainer}>
          
            <View style={styles.logoContainer}>
              <Image source={require('../assets/images/icon.png')} style={styles.logo}/>
              <Text style={styles.logoText}>SIGN UP</Text>
            </View> 

            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input}
                value={email_address}
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
                  value={first_name}
                  onChangeText={(text) => setFirstName(text)}
                  placeholder="First Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
              />
            </View>
                
            <View style={styles.inputContainer}>
              <TextInput
                  style={styles.input}
                  value={last_name}
                  onChangeText={(text) => setLastName(text)}
                  placeholder="Last Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.inputContainer}>
               <TextInput
                  style={styles.input}
                  value={user_name}
                  onChangeText={(text) => setUserName(text)}
                  placeholder="User Name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={user_city}
                  onChangeText={(text) => setUserCity(text)}
                  placeholder="City"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={user_state}
                  onChangeText={(text) => setUserState(text)}
                  placeholder="State"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                  underlineColorAndroid='transparent'
                />
              </View>

              <View style={styles.inputContainer}>
                <Picker
                    style={styles.input}
                    selectedValue={user_type}
                    onValueChange={(itemValue) => setUserType(itemValue)}
                    placeholder="Select Account Type"
                    placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                    underlineColorAndroid='transparent'
                >
                  <Picker.Item label = "Select A User Type" value = "none" />
                  <Picker.Item label = "Mentor" value = "mentor" />
                  <Picker.Item label = "Student" value = "student" />
                </Picker>
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
        </ScrollView>

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