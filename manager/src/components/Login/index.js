import React, { Component } from 'react';
import { Container, Content, Card } from 'native-base';
import LoginForm from './LoginForm';

class Login extends Component {

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
