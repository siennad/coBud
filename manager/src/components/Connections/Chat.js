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

class Chat extends Component {
  componentDidMount() {}

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
            <Text>connections</Text>
          </Item>
        </Content>
      </Container>
    );
  }
}

export default Chat;
