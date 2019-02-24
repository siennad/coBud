import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text
} from 'native-base';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const messages2 = [
  {
    _id: 123,
    text: 'abc',
    user: {
      _id: 123456,
      name: 'user'
    }
  }
];
class Chat extends Component {
  componentDidMount() {}

  render() {
    return (
      <GiftedChat
        messages={messages2}
        onSend={msg => this.onSendMessage(msg)}
        user={{
          _id: 12345,
          name: 'quqhj'
        }}
        placeholder="type her"
        bottomOffset={100}
        minInputToolbarHeight={50}
      />
    );
  }
}

export default Chat;
