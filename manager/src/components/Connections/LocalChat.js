import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Icon,
  Left,
  Body,
  Button,
  Text,
  Spinner
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import UserAvatar from 'react-native-user-avatar';

import {
  turnOffChat,
  loadMessages,
  sendMessage
} from '../../actions/ChatActions';

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
class LocalChat extends Component {
  state = { messages: [], initLoading: false };

  componentDidMount() {
    const { messages, loading } = this.props;
    this.setState({ initLoading: true });
    this.props.loadMessages(true);
    if (messages) {
      this.setState(prevState => ({
        messages: GiftedChat.append(prevState.messages, messages)
      }));
    }

    if (!loading) {
      this.setState({ initLoading: false });
    }
  }

  componentWillUnmount() {
    //Actions.pop();
    turnOffChat();
  }

  onSendMessage(message) {
    this.props.sendMessage(message, true);
  }

  renderChat(messages, user) {
    return (
      <GiftedChat
        messages={messages2}
        onSend={msg => this.onSendMessage(msg)}
        user={{
          _id: user.user.uid,
          name: user.user.displayName ? user.user.displayName : user.user.email
        }}
        renderAvatar={() => (
          <UserAvatar
            colors={['#ccc', '#fafafa', '#ccaabb']}
            name={
              user.user.displayName ? user.user.displayName : user.user.email
            }
            size="50"
          />
        )}
        onPressAvatar={() => Actions.viewprofile({ uid: user.user.uid })} // to render view user profile
        renderUsernameOnMessage
        keyboardShouldPersistTaps="never"
        showUserAvatar
      />
    );
  }

  render() {
    const { messages, user } = this.props;
    console.log(this.state);
    return (
      <Container>
        <Header>
          <Left>
            <Button iconLeft onPress={() => Actions.pop()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              Local Chat
            </Text>
          </Body>
        </Header>
        <Content
          style={{
            backgroundColor: 'rgba(0,0,0,0.1)'
          }}
        >
          {!this.state.initLoading && this.renderChat(messages, user)}
          {this.state.initLoading && <Spinner />}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  messages: state.chat.messages,
  loading: state.chat.loading
});

export default connect(
  mapStateToProps,
  { loadMessages, sendMessage }
)(LocalChat);
