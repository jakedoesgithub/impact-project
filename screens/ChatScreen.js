import React, { Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Picker
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



export default function ChatScreen (props) {
  const[messages,setMessages]=useState([]);
  const[roomID, setRoomID] = useState("");
  





  getRoomID = () => {
    const chatIDpre = [];
    chatIDpre.push(props.chaterID);
    chatIDpre.push(props.chateeID);
    chatIDpre.sort();
    const finalID = chatIDpre.join('_');
    return finalID;
  };




  getConnectionName = (userID) => {
    const db = firebase.firestore();
    db.collection("users").doc(userID).get().then((doc) =>{
      return doc.get("userName");
    })
  }



  onSend = (ms = []) => {
    let temp = messages
    let a = GiftedChat.append(temp,ms)
    setMessages(a)
  }

  useEffect(() => {
    setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
   ])},[])

   renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
              provider={PROVIDER_GOOGLE}
              style={[styles.mapView]}
              region={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker
                coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
                }}
              />
            </MapView>
        </View>
      );
    }
    return null
  }

   return (
    <>
    {messages.length === 0 && (
      <View style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 50
        }]}>
        <Image 
          source={{ uri: 'https://i.stack.imgur.com/qLdPt.png' }}
          style={{
            ...StyleSheet.absoluteFillObject,
            resizeMode: 'contain'
          }}
        />
    </View>
    )}
    <GiftedChat
     messages={messages}
     onSend={(messages) => onSend(messages)}
     renderCustomView={renderCustomView}
     user={{
       _id: 1,
     }}
     parsePatterns={linkStyle => [
        {
          pattern: /#(\w+)/,
          style: { ...linkStyle, color: 'lightgreen' },
          onPress: props => alert(`press on ${props}`),
        },
      ]}
   />
   </>
  );
    //     <View style={styles.container}>
    //       <View style={styles.footer}>
    //         <View style={styles.inputContainer}>
    //           <TextInput style={styles.inputs}
    //               placeholder="Write a message..."
    //               underlineColorAndroid='transparent'
    //               onChangeText={(name_address) => this.setState({name_address})}/>
    //         </View>
    //           <TouchableOpacity style={styles.btnSend}>
    //             <Image source={{uri:"https://png.icons8.com/small/75/ffffff/filled-sent.png"}} style={styles.iconSend}  />
    //           </TouchableOpacity>
    //       </View>
    //     </View>
    //   </View> */
    // )
    
  }
  

ChatScreen.navigationOptions = {
  title: 'Chat',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="search" size={25} color={tintColor} />
  )
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: 15,
    backgroundColor: '#B5E3FF',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
  list:{
    paddingHorizontal: 17,
  },
  footer:{
    flexDirection: 'row',
    height:60,
    backgroundColor: "#368DEB",
    paddingHorizontal:10,
    padding:5,
  },
  btnSend:{
    backgroundColor:"#368DEB",
    width:40,
    height:40,
    borderRadius:360,
    alignItems:'center',
    justifyContent:'center',
  },
  iconSend:{
    width:30,
    height:30,
    alignSelf:'center',
  },
  inputContainer: {
    borderBottomColor: "#368DEB",
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:40,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginRight:10,
  },
  inputs:{
    height:40,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 20,
  },
  itemIn: {
    alignSelf: 'flex-start'
  },
  itemOut: {
    alignSelf: 'flex-end'
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize:12,
    color:"#808080",
  },
  item: {
    marginVertical: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor:"#eeeeee",
    borderRadius:300,
    padding:5,
  },
});  