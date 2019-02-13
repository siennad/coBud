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
import { Keyboard } from 'react-native';

class Map extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    Keyboard.dismiss();
  }

  componentWillUnmount() {
    // Actions.pop();
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
            <Text>map</Text>
          </Item>
        </Content>
      </Container>
    );
  }
}

export default Map;
