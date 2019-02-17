import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import React, { Component } from 'react';
import { Container, Content, Card } from 'native-base';
import LoginForm from './LoginForm';

class Login extends Component {

  componentDidMount() {
    if (firebase.auth()) {
      Actions.main();
    }
  }

  render() {
    return (
      <Container >
        <Content style={{ flex: 1, }} >
          <Card
            padder
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <LoginForm />
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Login;
