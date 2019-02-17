import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MainFooterBar from '../common/MainFooterBar';
import { navigateToHome } from '../../actions/NavigationActions';

class Home extends Component {

  componentDidMount() {
    navigateToHome();
  }

  componentWillUnmount() {
    Actions.pop();
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
        <MainFooterBar />
      </Container>
    );
  }
}

export default connect(undefined, { navigateToHome })(Home);