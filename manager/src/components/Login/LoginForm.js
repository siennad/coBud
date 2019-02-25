import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Form, Input, Text, Item, Button, Container, Grid, Row } from 'native-base';

import { emailChanged, passwordChanged, loginUser } from '../../actions';
//import { Card, CardSection, Input, Button, Spinner } from '../common';
import { Spinner } from '../common';

class LoginForm extends Component {
  state = {
    email: '',
    password: ''
  };
  componentWillUnmount() {}

  onEmailChange(text) {
    this.setState({
      email: text
    });
  }

  onPasswordChange(text) {
    this.setState({
      password: text
    });
  }

  onButtonPress() {
    Keyboard.dismiss();

    const email = this.state.email;
    const password = this.state.password;

    this.props.emailChanged(email);
    this.props.passwordChanged(password);

    this.props.loginUser({ email, password });
  }

  render() {
    const { error, loading } = this.props;
    return (
      <Container>
        <Form>
          <Grid style={{ width: '100%', padding: 10 }}>
            <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
              <Item last padder rounded style={{ width: '100%' }}>
                <Input
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.state.email}
                  placeholder="Email"
                  placeholderTextColor="rgba(0,0,0,0.5)"
                />
              </Item>
            </Row>
            <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
              <Item last padder rounded style={{ width: '100%' }}>
                <Input
                  secureTextEntry
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.state.password}
                  placeholderTextColor="rgba(0,0,0,0.5)"
                  placeholder="Password"
                />
              </Item>
            </Row>
            {!!error && (
              <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
                <Text style={styles.errorTextStyle}>{error}</Text>
              </Row>
            )}

            <Row style={{ height: 70, width: '100%', marginBottom: 10 }}>
              {loading ? (
                <Spinner size="large" style={{ width: '100%' }} />
              ) : (
                <Button
                  primary
                  rounded
                  full
                  onPress={this.onButtonPress.bind(this)}
                  style={{ width: '100%' }}
                >
                  <Text style={{ color: 'white' }}>Login</Text>
                </Button>
              )}
            </Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(
  mapStateToProps,
  {
    emailChanged,
    passwordChanged,
    loginUser
  }
)(LoginForm);
