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
import { ExpoLinksView } from '@expo/samples';
import { GiftedChat } from "react-native-gifted-chat";
import * as firebase from "firebase";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client/react-native';


export default function ChatPicker(props) {

    return(

            <View>
                <Text>Select a connection to message </Text>
                    <Picker
                        selectedValue={chatee}
                        style={{height: 50, width: 100}}
                        placeholder="Select Account Type"
                        onValueChange={(itemValue) => {
                            props.setE(itemValue);
                        }
                    }>
                        <Picker.Item label={"test"} value={"test"}/>
                        {props.connects.map(x => {<Picker.Item label={x} value={x}/>})}
                    </Picker>
            </View>
    )
}