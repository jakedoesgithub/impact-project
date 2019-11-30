import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { GiftedChat } from "react-native-gifted-chat";

export default class ChatScreen extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "test message",
          createdAt: new Date(),
          user: {
            _id: 1,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  render() {
    return <GiftedChat messages={this.state.messages} />;
  }
}

ChatScreen.navigationOptions = {
  title: 'Chat',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="search" size={25} color={tintColor} />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
