/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
import React, { Component } from 'react';
import firebase from 'firebase';
import {
  Container,
  Content,
  Header,
  Item,
  Input,
  Icon,
  Text,
  Segment,
  Button,
  Left,
  Body,
  Right
} from 'native-base';
import { Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Feature from './Feature';
import Newsfeed from './NewsFeed';
import YourPosts from './YourPosts';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      firstpageactive: true,
      secondpageactive: false,
      thirdpageactive: false
    };
  }

  componentDidMount() {
    Keyboard.dismiss();
    if (!firebase.auth().currentUser) {
      Actions.auth();
    }
  }

  firstpage() {
    this.setState({
      page: 1,
      firstpageactive: true,
      secondpageactive: false,
      thirdpageactive: false
    });
  }

  secondpage() {
    this.setState({
      page: 2,
      firstpageactive: false,
      secondpageactive: true,
      thirdpageactive: false
    });
  }

  thirdpage() {
    this.setState({
      page: 3,
      firstpageactive: false,
      secondpageactive: false,
      thirdpageactive: true
    });
  }

  render() {
    const page = this.state.page;
    let shows = null;
    if (page === 1) {
      shows = <Feature />;
    } else if (page === 2) {
      shows = <Newsfeed />;
    } else {
      shows = <YourPosts />;
    }

    return (
      <Container style={{ paddingBottom: 50 }}>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>

        <Segment>
          <Button first active={this.state.firstpageactive} onPress={() => this.firstpage()}>
            <Text>Most Popular</Text>
          </Button>
          <Button active={this.state.secondpageactive} onPress={() => this.secondpage()}>
            <Text>Newsfeed</Text>
          </Button>
          <Button last active={this.state.thirdpageactive} onPress={() => this.thirdpage()}>
            <Text>Upload</Text>
          </Button>
        </Segment>

        <Content>{shows}</Content>
      </Container>
    );
  }
}

export default Home;
