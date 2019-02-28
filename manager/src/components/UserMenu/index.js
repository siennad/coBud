import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Icon,
  Input,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Text
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';
import UserAvatar from 'react-native-user-avatar';

import { logoutUser } from '../../actions/AuthActions';
import { getUserProfile } from '../../actions/UserProfileActions';

class UserMenu extends Component {
  async componentDidMount() {
    Keyboard.dismiss();

    if (!this.props.userProfile) {
      await this.props.getUserProfile(this.props.user.user.uid);
    } else if (this.props.userProfile._id === this.props.user.user.uid) {
      await this.setState({
        userProf: this.props.userProfile
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.userProfile) {
      this.setState({
        userProf: nextProps.userProfile
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

  render() {
    const { user, userProfile } = this.props;

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <UserAvatar
                  colors={['#2EDFB7', '#FF484A', '#DA5F8E']}
                  name={userProfile ? userProfile.name && userProfile.name : user.user.email}
                  size="50"
                />
              </Left>
              <Body>
                <Text>{userProfile ? userProfile.name && userProfile.name : user.user.email}</Text>
              </Body>
            </ListItem>

            <ListItem button onPress={() => Actions.viewprofile()}>
              <Left>
                <Text>My Profiles</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button>
              <Left>
                <Text>Change Password</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button onPress={() => Actions.connections()}>
              <Left>
                <Text>My connections</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button>
              <Left>
                <Text>My Places</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button>
              <Left>
                <Text>My Feedbacks</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button>
              <Left>
                <Text>App Settings</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button>
              <Left>
                <Text>Support</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem button onPress={() => this.props.logoutUser()}>
              <Left>
                <Text>Log Out</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userProfile: state.userProfile.userinfo
});

export default connect(
  mapStateToProps,
  { logoutUser, getUserProfile }
)(UserMenu);
