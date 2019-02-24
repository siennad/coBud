import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab,  Left, Right, Body, Icon, Text, Button } from 'native-base';
export default class MainScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <Button onPress={() => this.props.navigation.navigate('Chat')}>
                <Text>to Chat</Text>
            </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}