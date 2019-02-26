import React, { Component } from 'react';
<<<<<<< HEAD
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
=======
import { Container, Content, Header, Item, Icon, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import MainFooterBar from '../common/MainFooterBar';
import { navigateToNotifications } from '../../actions/NavigationActions';
>>>>>>> c18f4eea... Add Chat, routes, navigations

class Notifications extends Component {
  componentDidMount() {
<<<<<<< HEAD
=======
    this.props.navigateToNotifications();
>>>>>>> c18f4eea... Add Chat, routes, navigations
    Keyboard.dismiss();
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
            <Text>Notifications Page: Coming up later!</Text>
          </Item>
        </Content>
      </Container>
    );
  }
}

export default Notifications;
