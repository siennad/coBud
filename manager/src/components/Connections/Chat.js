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
  Left
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MainFooterBar from '../common/MainFooterBar';
import { navigateToConnections } from '../../actions/NavigationActions';
import { UserInputHandle, sendMessage, loadMessages } from '../../actions';

class Chat extends Component {
  state = { messageInput: '' };
  componentDidMount() {
    this.props.navigateToConnections();
  }
  componentWillUnmount() {
    Actions.pop();
  }

  onButtonPress() {
    const { messageInput } = this.state;
    // console.log('login user');
    // this.props.UserInputHandle(messageInput);
    this.props.sendMessage(messageInput);
    this.setState({
      messageInput: ''
    });
    this.props.loadMessages();
    console.log(this.props.loadMessages);
    const { messageOutput } = this.props;
    console.log(messageOutput);
  }

  UserInputHandle(text) {
    this.setState({
      messageInput: text
    });
  }
  render() {
    const { messageInput } = this.state;
    const { messageOutput } = this.props;
    console.log(messageOutput);
    //const data = messageOutput.toJSON().map(res => <Text>{res.text}</Text>);
    return (
      <Container>
        <Header searchBar rounded>
          <Left>
            <Button iconLeft onPress={() => Actions.pop()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
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
            {/* {data} */}
          </Item>
        </Content>
        <MainFooterBar page={this.props.sceneKey} />
      </Container>
    );
  }
}
const mapStateToProps = ({ chat }) => {
  const { messageInput, messageOutput } = chat;

  return { messageInput, messageOutput };
};
export default connect(
  mapStateToProps,
  { sendMessage, loadMessages, navigateToConnections }
)(Chat);
