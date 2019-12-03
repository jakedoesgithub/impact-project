import React, { useState, useEffect}  from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  ScrollView,
  Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Icon} from 'react-native-elements'
import * as firebase from 'firebase';
import ProfileData from "../components/ProfileData";
import ProfileUpdater from "./../components/ProfileUpdater";
import PhotoUploader from "./../components/PhotoUploader";

const {width: WIDTH} = Dimensions.get('window');
export default function ProfileScreen(props) {

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [homecity, setHomeCity] = useState("");
  const [homestate, setHomeState] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [isUpdateProfile, setUpdateProfile] = useState(false);
  const [URL, setURL] = useState("");
  const [urlLoaded, setUrlLoaded] = useState(false);
  const [bio, setBio] = useState("");

    const userID = String(firebase.auth().currentUser.uid);
    const userDB = firebase.firestore().collection("users");
    const refrence = userDB.doc(userID);


  onUpdateProfilePress = () => {
    setUpdateProfile(!isUpdateProfile);
  }

  useEffect(() => {
    setUrlLoaded(true);
  }, [URL])


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
        setURL(doc.get("profilePicURL"));
        setBio(doc.get("bio"));
      }
      else{
        console.log("Document does not exist");
      }})
    setLoadingComplete(true);
  } else{
      return (
        <View style={styles.container}>
        <Image source={require('../assets/images/BGI.png')} style={styles.backgroundContainer}/>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.headerBackgroundImage}>
              <View style={styles.headerColumn}>
                {(!urlLoaded)?
                  (<Image
                  style={styles.userImage}
                  source={{
                    uri: "gs://impact-dc23e.appspot.com/images/avatar_placeholder_small.png"
                  }} />) :
                  (<Image
                    style={styles.userImage}
                    source={{
                      uri: URL
                    }}
                  />)}
                  <View style={styles.row}>
                    <ProfileData data={firstname}/>
                    <ProfileData data={lastname}/>
                  </View>
                  </View>
            </View>
          </View>
          <View style={styles.bodyContainer}>
            <View style={styles.row}>
              <Text style={styles.rowText}>Email:</Text>
              <ProfileData data={email}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Username:</Text>
              <ProfileData data={username}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>City:</Text>
              <ProfileData data={homecity} />
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>State:</Text>
              <ProfileData data={homestate}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>School:</Text>
              <ProfileData data={school}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Major:</Text>
              <ProfileData data={major}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowText}>Bio:</Text>
              <ProfileData data={bio}/>
            </View>
          {isUpdateProfile? (
             <ProfileUpdater UserID = {userID}  />
          ): (<View></View>)}
          </View>
          <View>
          {!isUpdateProfile ? (
            <View style={styles.updateButtonContainer}>
              <TouchableOpacity onPress={onUpdateProfilePress}>
                <Text style={styles.buttonText}>Update Profile</Text>
              </TouchableOpacity>
            </View>
          ):(
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={onUpdateProfilePress}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) }
          </View>

          <PhotoUploader/>
          </ScrollView>
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
  backgroundContainer: {
    flex: 1,
    position: 'absolute'
  },
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  row: {
    flexDirection: 'row',
    color: 'white'
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
    borderColor: '#696969',
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
  updateButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width : 300,
    height: 35,
    borderRadius:25,
    backgroundColor: '#579c61',
    marginTop: 10,
    marginHorizontal: 25,
  },
  closeButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width : 300,
    height: 35,
    borderRadius:25,
    backgroundColor: '#d1242c',
    marginTop: 10,
    marginHorizontal: 25,
  },
  buttonText: {
    fontSize: 15,
    color: 'white'
  },
  rowText: {
    marginTop: 10,
    marginLeft:5,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  }
})

ProfileScreen.navigationOptions = {
  title: "Profile",
  headerStyle: {
      backgroundColor: '#2398f4',
    },
    headerTintColor: '#B5E3FF',
    headerTitleStyle: {
    fontWeight: 'bold',
    }
};
