import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MainFooterBar from '../common/MainFooterBar';
import { navigateToMap } from '../../actions/NavigationActions';

class Map extends Component {

  componentDidMount() {
    navigateToMap();
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
            <Text>map</Text>
          </Item>
        </Content>
        <MainFooterBar />
      </Container>
    );
  }
}

export default connect(undefined, { navigateToMap })(Map);
