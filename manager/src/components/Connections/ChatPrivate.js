import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text,
  Button,
  Form,
  Left,
  Label,
  Row,
  Body
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { UserInputHandle, sendPrivateMessage, loadPrivateMessages } from '../../actions';

class ChatPrivate extends Component {
  state = { messageInput: '', username: '' };
  componentDidMount() {
    this.props.loadPrivateMessages(this.props.uid);
  }
  componentWillUnmount() {
    Actions.pop();
  }

  onButtonPress() {
    const { messageInput } = this.state;
    // console.log('login user');
    const { uid } = this.props;

    // this.props.UserInputHandle(messageInput);
    this.props.sendPrivateMessage(messageInput, uid);
    this.setState({
      messageInput: ''
    });
    this.props.loadPrivateMessages(uid);
  }

  UserInputHandle(text) {
    this.setState({
      messageInput: text
    });
  }

  render() {
    const { messageInput } = this.state;
    const { messageOutput } = this.props;
    // console.log(messageOutput);
    let data;
    if (messageOutput) {
      data = messageOutput.map(val => (
        // console.log(val);
        <Row>
          <Item>
            <Label>{val.user.name}</Label>
          </Item>
          <Item>
            <Text>{val.user.text}</Text>
          </Item>
        </Row>
      ));
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button iconLeft onPress={() => Actions.connectionsHome()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body />
        </Header>
        <Content>
          <Item>
            <Text>connections</Text>
          </Item>
          <Form>
            <Item>
              <Input onChangeText={this.UserInputHandle.bind(this)} value={messageInput} />

              <Button onPress={() => this.onButtonPress()}>
                <Text>Send chat</Text>
              </Button>
            </Item>
          </Form>
          <Item>
            <Text>Message show here</Text>
          </Item>
          {data}
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({ chatPrivate }) => {
  const { messageInput, messageOutput } = chatPrivate;
  return { messageInput, messageOutput };
};
export default connect(
  mapStateToProps,
  { sendPrivateMessage, loadPrivateMessages }
)(ChatPrivate);
