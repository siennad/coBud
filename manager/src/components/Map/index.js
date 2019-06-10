import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon } from 'native-base';
import { Keyboard } from 'react-native';

class Map extends Component {
  componentDidMount() {
    Keyboard.dismiss();
  }
  render() {
    return (
      <Container style={{ paddingBottom: 50 }}>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
      </Container>
    );
  }
}

export default Map;
