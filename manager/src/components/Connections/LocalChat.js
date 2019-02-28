import React, { Component } from 'react';
import { Spinner, Icon, Text, Container, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import themeColor from './../../../native-base-theme/variables/material';
import { turnOffChat, loadMessages, sendMessage } from '../../actions/ChatActions';
import { viewportWidth } from '../common/constVar';

class LocalChat extends Component {
  state = { messages: [], initLoading: true };

  componentDidMount() {
    console.log('did mount');
    const { messages, loading } = this.props;
    this.setState({ initLoading: true });
    this.props.loadMessages(true);
    if (messages) {
      this.setState(prevState => ({
        messages
      }));
    }

    if (!loading) {
      this.setState({ initLoading: false });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { loading, messages } = nextProps;
    console.log(nextProps.messages);
    if (nextProps.messages) {
      this.setState(prevState => ({
        messages
      }));
    }
    if (!loading) {
      this.setState({ initLoading: false });
    }
  }

  componentWillUnmount() {
    //Actions.pop()
    turnOffChat();
  }

  onSendMessage(obj) {
    console.log('--send msg');
    console.log(obj);
    //const { messageIdGenerator, user, text } = obj;
    //console.log('send msg');
    this.props.sendMessage(obj, true);
  }

  renderChat(messages, user) {
    return (
      <GiftedChat
        messages={messages}
        onSend={msg => {
          console.log(msg);
          this.onSendMessage(msg);
        }}
        user={{
          _id: user.user.uid,
          name: user.user.displayName ? user.user.displayName : user.user.email
        }}
        renderUsernameOnMessage
        keyboardShouldPersistTaps="never"
        showUserAvatar
        renderUsernameOnMessage
        onPressAvatar={thisuser => Actions.viewprofile({ uid: thisuser._id })}
        renderSend={props => (
          <Send {...props}>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                width: viewportWidth * 0.2,
                padding: 5
              }}
            >
              <Icon name="send" type="FontAwesome" />
            </View>
          </Send>
        )}
        renderLoading={() => (
          <Container>
            <Spinner />
            <Text>Loading messages...</Text>
          </Container>
        )}
      />
    );
  }

  render() {
    const { user } = this.props;
    const { messages } = this.state;
    //console.log(this.state);
    return (
      <React.Fragment>
        <View flex={1} style={{ marginTop: 50 }}>
          {!this.state.initLoading && this.renderChat(messages, user)}
          {this.state.initLoading && <Spinner />}
        </View>
      </React.Fragment>
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
