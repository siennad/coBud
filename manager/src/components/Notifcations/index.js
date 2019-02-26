import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text
} from "native-base";
import { Keyboard } from "react-native";

class Notifications extends Component {
  componentDidMount() {
    Keyboard.dismiss();
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
            <Text>Notifications Page: Coming up later!</Text>
          </Item>
        </Content>
      </Container>
    );
  }
}

export default Notifications;
