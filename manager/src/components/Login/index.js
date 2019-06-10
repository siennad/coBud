/* eslint-disable no-extra-boolean-cast */
import React, { Component } from 'react';
import { Image, Platform, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import { Container, Content, Item } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import LoginForm from './LoginForm';

import { viewportHeight } from '../common/constVar';

class Login extends Component {
  componentDidMount() {
    if (firebase.auth().currentUser) {
      Actions.main();
    }
  }

  componentWillUnmount() {
    Actions.pop();
  }

  render() {
    let url;
    if (Platform.OS === 'android') {
      url = 'asset:/img/cobud-logo.png';
    } else {
      url =
        'http://i0.wp.com/sgtravelconnect.com/wp-content/uploads/2018/06/cropped-TravelConnect.sg-Logo-V3-1.jpg?fit=512%2C512'; //change later to img
    }

    return (
      <Container>
        <Content>
          <Grid
            style={{
              height: viewportHeight,
              backgroundColor: 'rgba(155,5,19,1)'
            }}
          >
            <Row
              style={{
                height: viewportHeight / 2
                /* justifyContent: 'center',
                alignItems: 'center' */
              }}
            >
              <Image source={{ uri: url }} style={{ width: '100%' }} />
            </Row>

            <Row
              style={{
                height: viewportHeight / 2
              }}
            >
              <Item
                style={{
                  position: 'absolute',
                  top: 50,
                  width: '100%',
                  padding: 10
                }}
              >
                <LoginForm />
              </Item>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

export default Login;
