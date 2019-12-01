import React, { useState } from 'react'
import { Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import * as firebase from 'firebase';

//passing a userID to this component will display a studentProfile for that userID
export default function StudentProfile(props) {
  const {width: WIDTH} = Dimensions.get('window');
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [homecity, setHomeCity] = useState("");
  const [homestate, setHomeState] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [profilePicURL, setProfilePicURL] = useState("gs://impact-dc23e.appspot.com/profilePictures/ewQai14oIqWoX6U1gfIPWZOLu1x2");

  var userID = props.UserID
  var userDB = firebase.firestore().collection("users")
  var refrence = userDB.doc(userID);


    if(!isLoadingComplete){
    //have a userID be passed to this component and the database info will be based on this user
        refrence.get().then(function(doc) {
            if(doc.exists){
                console.log("document exists");
                setEmail(doc.get("email"));
                setUserName((doc.get("userName")));
                setFirstName(doc.get("firstName"));
                setLastName(doc.get("lastName"));
                setHomeCity(doc.get("city"));
                setHomeState(doc.get("state"));
                setSchool(doc.get("school"));
                setMajor(doc.get("major"));
                setProfilePicURL(doc.get("profilePicURL"))
            } 
            else{
                console.log("Document does not exist");
            }
        });
        setLoadingComplete(true);
    } else {
        return (
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerBackgroundImage}>
                <View style={styles.headerColumn}>
                    <Image
                    style={styles.userImage}
                    source={{
                        uri: profilePicURL,
                    }}
                    />
                    <ProfileData field={"UserName"} data={username}/>
                </View>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <ProfileData field={"Email"} data={email}/>
                <ProfileData field={"First Name"} data={firstname}/>
                <ProfileData field={"Last Name"} data={lastname}/>
                <ProfileData field={"City"} data={homecity}/>
                <ProfileData field={"State"} data={homestate}/>
                <ProfileData field={"School"} data={school}/>
                <ProfileData field={"Major"} data={major}/>
            </View>
            </View>
        )
    }
}
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
  headerContainer: {},
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