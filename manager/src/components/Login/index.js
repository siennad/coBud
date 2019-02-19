/* eslint-disable no-extra-boolean-cast */
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { Container, Content, Grid, Row } from 'native-base';
import LoginForm from './LoginForm';

class Login extends Component {

  componentDidMount() {
    console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser) {
      Actions.main();
    }
  }

  render() {
    return (
      <Container >
        <Content style={{ flex: 1, }} >
          <Grid>
            <Row />
            <Row>
              <LoginForm />
            </Row>
            <Row />
          </Grid>

        </Content>
      </Container>
    );
  }
}

export default Login;
