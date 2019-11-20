import React, { useState } from 'react'
import { Icon, Divider } from 'react-native-elements'
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

const {width: WIDTH} = Dimensions.get('window')
export default function LoginScreenOld(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    return (
      <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerBackgroundImage}>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: 'http://www.carderator.com/assets/avatar_placeholder_small.png',
              }}
            />
            <Text style={styles.userNameText}>John Doe</Text>

          </View>
        </View>
        </View>
        <View style={styles.socialRow}>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#3B5A98"
              name="facebook-with-circle"
            />
          </View>
          <View style={styles.socialIcon}>
            <Icon
              size={30}
              type="entypo"
              color="#56ACEE"
              name="twitter-with-circle"
            />
          </View>
          <View>
            <Icon
              size={30}
              type="entypo"
              color="#DD4C39"
              name="google--with-circle"
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.info}>Email: cludwi4@lsu.edu</Text>
            <Text style={styles.info}>School: Louisiana State University</Text>
            <Text style={styles.info}>Degree: Bachelor's in Computer Science</Text>
            <Text style={styles.info}>Grad: May 2020</Text>
            <Icon
              size={25}
              type="feather"
              name="edit"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Message Mentor</Text>
              </TouchableOpacity>
            </View>
        </View>
      </View>
    )
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
