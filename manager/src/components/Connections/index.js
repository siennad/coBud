import React, { Component } from 'react';
import {
  Container, Content, Header, Item, Icon, Input, Text,
  List, ListItem, Left, Body, Right, Thumbnail,
} from 'native-base';
import { ListView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MainFooterBar from '../common/MainFooterBar';
import { navigateToConnections } from '../../actions/NavigationActions';

const image1 = require('./images/business.png');

const image2 = require('./images/facebook.png');

const image3 = require('./images/linkedin.png');

const image4 = require('./images/tweet.png');

const data = [{
  id: 1,
  first_name: 'Google Business',
  message: 'I just need to be alone',
  image: image1
}, {
  id: 2,
  first_name: 'Facebook',
  message: 'What is in your mind ?',
  image: image2
}, {
  id: 2,
  first_name: 'LinkedIn',
  message: 'I got a new connection for you',
  image: image3
}, {
  id: 2,
  first_name: 'Tweeter',
  message: 'Hashtag has changed your business',
  image: image4
}];

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Connections extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: ds.cloneWithRows(data),
    };
  }

  componentDidMount() {
    navigateToConnections();
  }

  componentWillUnmount() {
    Actions.pop();
  }

  eachMessage(x) {
    return (
      <List>
        <TouchableOpacity>
          <ListItem avatar>
            <Left>
              <Thumbnail source={x.image} />
            </Left>
            <Body>
              <Text>{x.first_name}</Text>
              <Text note>{x.message}</Text>
            </Body>
          </ListItem>
        </TouchableOpacity>
      </List>
    );
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
            <Left>
              <Text style={styles.textStyle}>My Connections</Text>
            </Left>
            <Right>
              <Icon name="person-add" />
            </Right>
          </Item>
          <View style={{ flex: 1 }}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(rowData) => this.eachMessage(rowData)}
            />
          </View>
        </Content>
        <MainFooterBar page={this.props.sceneKey} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 40
  }
});

export default connect(undefined, { navigateToConnections })(Connections);
