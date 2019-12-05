import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  Button,
  Picker,
  ActivityIndicator
} from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";
import ChatScreen from "./../screens/ChatScreen";


export default function ChatSelectScreen(props) {
    const[chater, setChater] = useState("");
    const[chatee, setChatee] = useState("");
    const[isLoaded, setIsLoaded] = useState(false);
    const[connections, setConnections] = useState([]);
    const[isChatting, setChatting] = useState(false)
    var currentUser = firebase.auth().currentUser.uid;

    getConnectionName = (userID) => {
      const db = firebase.firestore();
      db.collection("users").doc(userID).get().then((doc) =>{
        return (doc.get("userName"))})
    }

    getChaterNameAndConnections = () => {
        const db = firebase.firestore();
        db.collection("users")
          .doc(currentUser).get().then((doc) => {
            const un = doc.get("userName");
            console.log(un);
            const co = doc.get("connections");
            console.log(co);
            setChater(un);
            setConnections(co);
            console.log(connections);
          }).then(()=> {console.log(connections); setIsLoaded(true)})
      }


    
      getRoomID = (chateeID, chatterID) => {
        const chatIDpre = [];
        chatIDpre.push(chatterID);
        chatIDpre.push(chateeID);
        chatIDpre.sort();
        const finalID = chatIDpre.join('_');
        return finalID;
      };


    useEffect(()=>{
      getChaterNameAndConnections()
    }, [])

    onChatPress = ()=> {
      setChatting(true)
    }

    


    return (
        <View>
          {(!isLoaded) ? 
          (
            <ActivityIndicator
            animating={true}
            style={styles.indicator}
            size="large"
          />)
          :(
          <View>
              <Text>Select a connection to message </Text>
                  <Picker
                      selectedValue={chatee}
                      style={{height: 50, width: 100}}
                      placeholder="Select Account Type"
                      onValueChange={(itemValue) => {
                          setChatee(itemValue);
                      }
                  }>
                      <Picker.Item label={"test"} value={"test"}/>
                      {connections.map(x => (x!==null)? (<Picker.Item label={x} value={x}/>) : (null) )}
                  </Picker>
                  <Button title={"Chat Selected User"} onPress={onChatPress}></Button>
          </View>
          )}
          {isChatting? (<ChatScreen chateeID={chatee} chaterID={chater}/>):(null)}
        </View>
    )
}
const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});