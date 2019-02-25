import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

class Home extends Component {
  componentDidMount() {
    Keyboard.dismiss();
    if (!firebase.auth().currentUser) {
      Actions.auth();
    }
    console.log(firebase.auth().currentUser);
  }

  componentWillUnmount() {
    //Actions.pop();
  }

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Content>
          <Item>
            <Text>home</Text>
          </Item>
        </Content>
      </Container>
    );
  }
}

export default Home;
