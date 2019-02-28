import React, { Component } from 'react';
import { Spinner, Icon, Text, Container, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { GiftedChat, Send, Actions as chatActions } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import themeColor from './../../../native-base-theme/variables/material';
import { turnOffChat, loadMessages, sendMessage } from '../../actions/ChatActions';
import { viewportWidth } from '../common/constVar';

class ChatPrivate extends Component {
  state = { messages: [], initLoading: true };

  componentDidMount() {
    console.log('did mount');
    const { messages, loading } = this.props;
    this.setState({ initLoading: true });
    this.props.loadMessages(false, this.props.uid);
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
    const { uid } = this.props;
    //const { messageIdGenerator, user, text } = obj;
    //console.log('send msg');
    this.props.sendMessage(obj, false, uid);
    this.props.loadMessages(false, this.props.uid);
  }

  renderInputToolbar() {}

  renderActions() {}

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
        {!this.state.initLoading && this.renderChat(messages, user)}
        {this.state.initLoading && <Spinner />}
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
)(ChatPrivate);

//----------------Testing Private Chat before implement to gifted chat--------------

// import React, { Component } from 'react';
// import {
//   Container,
//   Content,
//   Header,
//   Item,
//   Icon,
//   Input,
//   Text,
//   Button,
//   Form,
//   Left,
//   Label,
//   Row,
//   Body
// } from 'native-base';
// import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';
// import { UserInputHandle, sendPrivateMessage, loadPrivateMessages } from '../../actions';

// class ChatPrivate extends Component {
//   state = { messageInput: '', username: '' };
//   componentDidMount() {
//     this.props.loadPrivateMessages(this.props.uid);
//   }
//   componentWillUnmount() {
//     Actions.pop();
//   }

//   onButtonPress() {
//     const { messageInput } = this.state;
//     // console.log('login user');
//     const { uid } = this.props;

//     // this.props.UserInputHandle(messageInput);
//     if (messageInput) {
//       this.props.sendPrivateMessage(messageInput, uid);
//     }
//     this.setState({
//       messageInput: ''
//     });
//     this.props.loadPrivateMessages(uid);
//   }

//   UserInputHandle(text) {
//     this.setState({
//       messageInput: text
//     });
//   }

//   render() {
//     const { messageInput } = this.state;
//     const { messageOutput } = this.props;
//     // console.log(messageOutput);
//     let data;
//     if (messageOutput) {
//       data = messageOutput.map(val => (
//         // console.log(val);
//         <Row>
//           <Item>
//             <Label>{val.user.name}</Label>
//           </Item>
//           <Item>
//             <Text>{val.user.text}</Text>
//           </Item>
//         </Row>
//       ));
//     }

//     return (
//       <Container>
//         <Header searchBar rounded>
//           <Left>
//             <Button iconLeft onPress={() => Actions.connectionsHome()} transparent>
//               <Icon ios="ios-arrow-back" android="md-arrow-back" />
//               <Text>Back</Text>
//             </Button>
//           </Left>
//           <Body />
//         </Header>
//         <Content>
//           <Item>
//             <Text>connections</Text>
//           </Item>
//           <Form>
//             <Item>
//               <Input onChangeText={this.UserInputHandle.bind(this)} value={messageInput} />

//               <Button onPress={() => this.onButtonPress()}>
//                 <Text>Send chat</Text>
//               </Button>
//             </Item>
//           </Form>
//           <Item>
//             <Text>Message show here</Text>
//           </Item>
//           {data}
//         </Content>
//       </Container>
//     );
//   }
// }
// const mapStateToProps = ({ chatPrivate }) => {
//   const { messageInput, messageOutput } = chatPrivate;
//   return { messageInput, messageOutput };
// };
// export default connect(
//   mapStateToProps,
//   { sendPrivateMessage, loadPrivateMessages }
// )(ChatPrivate);
