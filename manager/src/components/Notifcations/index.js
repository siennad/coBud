/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text,
  Segment,
  Button,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body
} from 'native-base';
import { Keyboard } from 'react-native';

const newsData = [
  {
    id: 1,
    title: 'Market Hall will be close for renovation until 2020',
    content: 'example1'
  },
  {
    id: 2,
    title: 'International concert night in City Theater',
    content: 'example2'
  },
  {
    id: 3,
    title: 'Tietomaa offers entrance fee discount with valid students card',
    content: 'example3'
  }
];

const chatData = [
  {
    id: 1,
    first_name: 'Google Business',
    message: 'I just need to be alone',
    image: require('../Connections/images/business.png')
  },
  {
    id: 2,
    first_name: 'Facebook',
    message: 'What is in your mind ?',
    image: require('../Connections/images/facebook.png')
  },
  {
    id: 2,
    first_name: 'LinkedIn',
    message: 'I got a new connection for you',
    image: require('../Connections/images/linkedin.png')
  },
  {
    id: 2,
    first_name: 'Tweeter',
    message: 'Hashtag has changed your business',
    image: require('../Connections/images/tweet.png')
  }
];

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.firstpage = this.firstpage.bind(this);
    this.secondpage = this.secondpage.bind(this);
    this.state = {
      page: 1,
      firstpageactive: true,
      secondpageactive: false,
      listChat: chatData,
      listNews: newsData
    };
  }
  componentDidMount() {
    Keyboard.dismiss();
  }

  firstpage() {
    this.setState({
      page: 1,
      firstpageactive: true,
      secondpageactive: false
    });
  }

  secondpage() {
    this.setState({
      page: 2,
      firstpageactive: false,
      secondpageactive: true
    });
  }

  render() {
    const page = this.state.page;
    let shows = null;
    if (page === 1) {
      shows = this.state.listChat.map((item, i) => (
        <List key={i}>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={item.image} />
            </Left>
            <Body>
              <Text>{item.first_name}</Text>
              <Text note>{item.message}</Text>
            </Body>
          </ListItem>
        </List>
      ));
    } else if (page === 2) {
      shows = this.state.listNews.map((item, i) => (
        <List key={i}>
          <ListItem>
            <Body>
              <Text>{item.title}</Text>
              <Text note>{item.content}</Text>
            </Body>
          </ListItem>
        </List>
      ));
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Segment style={{ paddingBottom: 10 }}>
          <Button first active={this.state.firstpageactive} onPress={this.firstpage}>
            <Text>Yours</Text>
          </Button>
          <Button last active={this.state.secondpageactive} onPress={this.secondpage}>
            <Text>News</Text>
          </Button>
        </Segment>
        <Content padder>{shows}</Content>
      </Container>
    );
  }
}

export default Notifications;
