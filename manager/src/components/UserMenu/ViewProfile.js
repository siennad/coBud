/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Text,
  Left,
  Body,
  Spinner,
  Right,
  Button,
  Icon,
  List,
  ListItem
} from 'native-base';
import { Dimensions, View } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import UserAvatar from 'react-native-user-avatar';

import { accordionBorderColor } from '../../../native-base-theme/variables/commonColor';
import { getUserProfile, reset } from '../../actions/UserProfileActions';
import { viewportHeight } from './../common/constVar';

const viewport = Dimensions.get('window').width;

const styles = {
  listHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginVertical: 3,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  link: {
    paddingBottom: 0,
    fontSize: 0.0275 * viewport,
    color: 'rgba(0,0,0,0.7)',
    alignSelf: 'center'
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    paddingTop: 16
  }
};

class ViewProfile extends Component {
  componentDidMount() {
    const { uid, userProfile, user } = this.props;
    const isMyProfile = !uid ? true : user.user.uid === uid;
    /**
     * Workflow:
     * if not my profile: get user's profile
     * if my profile: check if there's exists
     * if exists, check if there is the record of my profile
     */
    /* if (!isMyProfile) {
      this.props.getUserProfile(uid);
    } else if (userProfile) {
      if (!userProfile._id === user.user.uid) {
        this.props.getUserProfile(uid);
      } else {
        this.props.getUserProfile(user.user.uid);
      }
    } */
    if (uid) {
      this.props.getUserProfile(uid);
    } else {
      this.props.getUserProfile(user.user.uid);
    }
  }

  render() {
    const { uid, userProfile, loading, user } = this.props;

    //check if this is view your own profile or other
    const isMyProfile = !uid ? true : user.user.uid === uid;

    return (
      <Container>
        <Header>
          <Left>
            <Button iconLeft onPress={() => Actions.pop()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            {!isMyProfile && (
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white' }}>
                View Profile
              </Text>
            )}
            {isMyProfile && (
              <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: 'white' }}>
                View My Profile
              </Text>
            )}
          </Body>
          <Right>
            {isMyProfile && (
              <Button iconRight onPress={() => Actions.updateprofile()}>
                <Icon name="edit" type="FontAwesome" />
              </Button>
            )}
          </Right>
        </Header>

        <Content>
          {loading && <Spinner color={accordionBorderColor} />}
          {!loading && (
            <Content>
              <View
                style={{
                  height: viewportHeight / 4,
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Item style={{ paddingTop: viewportHeight / 8 }}>
                  <UserAvatar
                    colors={['#2EDFB7', '#FF484A', '#DA5F8E']}
                    name={userProfile ? userProfile.name && userProfile.name : user.user.email}
                    size="100"
                  />
                </Item>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <List
                  style={{
                    height: viewportHeight / 2 + 100,
                    width: viewport / 2 + 160,
                    alignContent: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {userProfile && (
                    <React.Fragment>
                      <ListItem itemHeader style={styles.listHeader}>
                        <Left>
                          <Text style={styles.textHeader}>Name: </Text>
                        </Left>
                        <Body style={{ flexDirection: 'row', alignSelf: 'center' }}>
                          <Text style={{ fontSize: 14, paddingTop: 18 }}>{userProfile.name}</Text>
                        </Body>
                      </ListItem>

                      <ListItem itemHeader style={styles.listHeader}>
                        <Left>
                          <Text style={styles.textHeader}>City: </Text>
                        </Left>
                        <Body style={{ flexDirection: 'row', alignSelf: 'center' }}>
                          <Text style={{ fontSize: 14, paddingTop: 18 }}>{userProfile.city}</Text>
                        </Body>
                      </ListItem>
                      <ListItem itemHeader style={styles.listHeader}>
                        <Left>
                          <Text style={styles.textHeader}>Place Visited</Text>
                        </Left>
                        <Right style={{ flexDirection: 'column', paddingTop: 12 }}>
                          <Button transparent dark iconRight>
                            <Text style={styles.link}>view</Text>
                            <Icon name="arrow-forward" />
                          </Button>
                        </Right>
                      </ListItem>

                      <ListItem itemHeader style={styles.listHeader}>
                        <Left>
                          <Text style={styles.textHeader}>My Reviews</Text>
                        </Left>
                        <Right style={{ flexDirection: 'column', paddingTop: 12 }}>
                          <Button transparent dark iconRight>
                            <Text style={styles.link}>view</Text>
                            <Icon name="arrow-forward" />
                          </Button>
                        </Right>
                      </ListItem>

                      <ListItem itemHeader style={styles.listHeader}>
                        <Left>
                          <Text style={styles.textHeader}>My Place</Text>
                        </Left>
                        <Right style={{ flexDirection: 'column', paddingTop: 12 }}>
                          <Button transparent dark iconRight>
                            <Text style={styles.link}>view</Text>
                            <Icon name="arrow-forward" />
                          </Button>
                        </Right>
                      </ListItem>
                    </React.Fragment>
                  )}

                  {isMyProfile && !userProfile && (
                    <React.Fragment>
                      <ListItem>
                        <Text>You haven't set up your profile</Text>
                      </ListItem>
                      <ListItem>
                        <Button
                          style={{ margin: 'auto' }}
                          iconRight
                          onPress={() => Actions.updateprofile()}
                        >
                          <Text>Tap here to update your profile</Text>
                          <Icon name="edit" type="FontAwesome" />
                        </Button>
                      </ListItem>
                    </React.Fragment>
                  )}

                  {!isMyProfile && !userProfile && (
                    <React.Fragment>
                      <ListItem>
                        <Text danger>There's something wrong. Please try again later!</Text>
                      </ListItem>
                      <ListItem padder button>
                        <Button>
                          <Text>Tap here to go back</Text>
                        </Button>
                      </ListItem>
                    </React.Fragment>
                  )}
                </List>
              </View>
            </Content>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userProfile: state.userProfile.userinfo,
  loading: state.userProfile.loading
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(ViewProfile);
