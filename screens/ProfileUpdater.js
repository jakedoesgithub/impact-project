//this component is called from the profie page. 

import React, { useState}  from 'react'
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Dimensions,
  Alert,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import * as firebase from 'firebase';

const {width: WIDTH} = Dimensions.get('window');
//need to pass the userID to it to make the database update easier
export default function ProfileUpdater(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [user_name, setUserName] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_state, setUserState] = useState("");
    const [user_city, setUserCity] = useState("");
    const [school, setSchool] = useState("");
    const [major, setMajor] = useState("");
    const [type, setType] = useState("");
    const [majortext, setMajorText] = useState("");

    var userID = props.UserID
    var userDB = firebase.firestore().collection("users")
    var refrence = userDB.doc(userID);


    onUpdatePress = () => {
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
        if (school.length < 1){
          Alert.alert("School must not be blank")
          return;
        }
        if (major.length < 1){
            Alert.alert("Major must not be blank")
            return;
        }
        updateUserInDB();
    };

    onBackToProfilePress = () => {
        console.log("Profile Update Pressed")
        props.navigation.navigate("Main");
    };
    


    updateUserInDB = () =>{ 
        refrence.update({
            firstName: first_name,
            lastName: last_name,
            userName: user_name,
            city: user_city,
            state: user_state,
            major: major,
            school: school,
        }).then(()=> {
            console.log("Document updated for user with ID: ", userID);
        }).catch(function(error) {
            console.error("Error updating document: ", error);
    });
};


        if(!isLoadingComplete){
            //have a userID be passed to this component and the database info will be based on this user
                refrence.get().then(function(doc) {
                    if(doc.exists){
                        console.log("document exists for profile udpater");
                        setUserName((doc.get("userName")));
                        setFirstName(doc.get("firstName"));
                        setLastName(doc.get("lastName"));
                        setUserCity(doc.get("city"));
                        setUserState(doc.get("state"));
                        setSchool(doc.get("school"));
                        setMajor(doc.get("major"));
                        setType(doc.get("userType"));
                        if(type === "mentor"){
                            setMajorText("Update Majors to Mentor")
                        }
                        else{
                            setMajorText("Update Major")
                        }
                    } 
                    else{
                        console.log("Document does not exist");
                    }
                });
                setLoadingComplete(true);
            } else {
                return (
                <View style={styles.backgroundContainer}>
                    
                    <View style={styles.infoCenter}>
                        <Text style={styles.info}>Change Profile Info</Text>
                    </View> 
                    
                    <Text style={styles.info}>Update First Name</Text>
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
            
                    <Text style={styles.info}>Update Last Name</Text>
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
                    
                    <Text style={styles.info}>Update User Name</Text>
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
                    
                    <Text style={styles.info}>Update City</Text>
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
            
                    <Text style={styles.info}>Update State</Text>
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

                    <Text style={styles.info}>Update School</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={school}
                            onChangeText={(text) => setSchool(text)}
                            placeholder="State"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Text style={styles.info}>{majortext}</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            value={major}
                            onChangeText={(text) => setMajor(text)}
                            placeholder="Major"
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                        />
                    </View>

                    <Button title="Click to Update Profile" onPress={onUpdatePress} />

                </View>
                );
            }
};

const styles = StyleSheet.create({
    bodyContainer: {
      flex: 2,
      //alignItems: 'center'
    },
    info: {
      marginTop: 10,
      marginLeft:10,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#696969',
    },
    infoCenter: {
      marginTop: 10,
      alignItems: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      color: '#696969',
    },
    infoRow: {
      flexDirection: 'row',
    },
    socialIcon: {
      marginLeft: 14,
      marginRight: 14,
    },
    container: {
      flex: 1,
      backgroundColor: '#B5E3FF',
    },
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 35,
    },
    socialRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: null
    },
    inputContainer: {
      flexDirection: 'row',
      width : WIDTH -55,
      height:30,
      marginLeft:16,
      borderRadius:25,
      backgroundColor: '#368DEB',
      paddingHorizontal:10,
      padding:5,
    },
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    userImage: {
      borderColor: 'black',
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 35,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
    buttonContainer: {
      alignItems: 'center'
    },
    button: {
      marginTop:30,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF"
    },
    buttonText: {
      fontSize: 20
    }
  })