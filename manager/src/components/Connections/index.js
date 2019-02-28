import React, { Component } from 'react';
import { Alert, ListView, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import UserAvatar from 'react-native-user-avatar';
import { connect } from 'react-redux';

import _ from 'lodash';
import { viewportWidth } from '../common/constVar';

class Connections extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      listViewData: []
    };
  }

  componentDidMount() {
    Keyboard.dismiss();
    const { userDetails } = this.props;
    if (userDetails) {
      this.setState({
        listViewData: _.slice(userDetails, 0, 10)
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (!nextProps.user) {
      Actions.main();
      return false;
    }
    return true;
  }

  componentWillUnmount() {
    //Actions.pop();
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  aler(msg) {
    console.log(msg);
  }

  render() {
    const { user } = this.props;
    // console.log('userDetails load from connection');
    // console.log(userDetails);
    // console.log(user);
    // console.log('userDetails load from connection');

    return (
      <Container style={{ marginBottom: 50 }}>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Content>
          <Button
            dark
            block
            rounded
            style={{ marginTop: 15 }}
            onPress={() => Actions.localChat()}
            iconRight
          >
            <Text style={styles.textTitle} uppercase={false}>
              Local Chatroom
            </Text>
            <Icon name="sign-in" type="FontAwesome" />
          </Button>
          <Item>
            <Left>
              <Text style={styles.textTitle}>My Connections</Text>
            </Left>
            <Right>
              <Button transparent dark style={{ marginRight: 19 }}>
                <Icon name="person-add" />
              </Button>
            </Right>
          </Item>
          <List
            leftOpenValue={75}
            rightOpenValue={-75}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={rowData => {
              console.log(rowData);
              if (rowData.userUid === user.user.uid) {
                return <React.Fragment />;
              }
              const name = rowData.userName ? rowData.userName : rowData.userEmail;
              return (
                <TouchableOpacity style={{ marginHorizontal: 28 }}>
                  <ListItem
                    avatar
                    key={rowData.userUid}
                    onPress={() => Actions.chatPrivate({ uid: rowData.userUid })}
                  >
                    <Left>
                      {name && (
                        <UserAvatar
                          colors={['#2EDFB7', '#FF484A', '#DA5F8E']}
                          name={name}
                          size="50"
                        />
                      )}
                    </Left>
                    <Body>
                      <Text>{rowData.userName ? rowData.userName : rowData.userEmail}</Text>
                      <Text note>Tap to chat</Text>
                    </Body>
                  </ListItem>
                </TouchableOpacity>
              );
            }}
            renderLeftHiddenRow={rowData => (
              <Button
                full
                success
                onPress={() =>
                  Alert.alert(
                    'User info',
                    rowData.userName ? rowData.userName : rowData.userEmail,
                    [{ text: 'OK', onPress: () => Actions.viewprofile({ uid: rowData.userUid }) }]
                  )
                }
              >
                <Icon active name="information-circle" />
              </Button>
            )}
            renderRightHiddenRow={(rowData, secId, rowId, rowMap) => (
              <Button
                full
                danger
                onPress={() =>
                  Alert.alert(
                    'Warning',
                    'Do you want to delete this user out of list?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed!')
                      },
                      {
                        text: 'OK',
                        onPress: () => {
                          this.deleteRow(secId, rowId, rowMap);
                          this.setState({
                            listViewData: _.pull(this.state.listViewData, rowData)
                          });
                        }
                      }
                    ],
                    { cancelable: true }
                  )
                }
              >
                <Icon active name="trash" />
              </Button>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textTitle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'left',
    lineHeight: 40,
    marginLeft: 28
  }
});

const mapStateToProps = state => ({
  userDetails: state.auth.userDetails,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Connections);
