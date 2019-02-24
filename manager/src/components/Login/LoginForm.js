//This is the index.js file
import React, { Component } from 'react';
import { Keyboard, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Text,
  Item,
  Button,
  Container,
  Grid,
  Row
} from 'native-base';

import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { Spinner } from '../common';
import { viewportWidth } from '../common/constVar';
import theme from './../../../native-base-theme/variables/material';

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
        <KeyboardAvoidingView
          enabled
          behavior="padding"
          style={{ height: '100%' }}
        >
          <Form>
            <Grid style={{ width: '100%', padding: 10 }}>
              <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
                <Item
                  last
                  padder
                  rounded
                  style={{ width: '100%', backgroundColor: 'white' }}
                >
                  <Input
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.state.email}
                    placeholder="Email"
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    style={{ color: 'black' }}
                  />
                </Item>
              </Row>
              <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
                <Item
                  last
                  padder
                  rounded
                  style={{ width: '100%', backgroundColor: 'white' }}
                >
                  <Input
                    secureTextEntry
                    onChangeText={this.onPasswordChange.bind(this)}
                    value={this.state.password}
                    placeholderTextColor="rgba(0,0,0,0.5)"
                    placeholder="Password"
                    style={{ color: 'black' }}
                  />
                </Item>
              </Row>
              {!!error && (
                <Row style={{ height: 50, width: '100%', marginBottom: 10 }}>
                  <Text style={styles.errorTextStyle}>{error}</Text>
                </Row>
              )}

              <Row
                style={{
                  height: 70,
                  width: '100%',
                  marginBottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {loading ? (
                  <Spinner size="large" style={{ width: '100%' }} />
                ) : (
                  <Button
                    info
                    rounded
                    block
                    center
                    onPress={this.onButtonPress.bind(this)}
                    style={{
                      width: viewportWidth / 3 + 20,
                      marginHorizontal: 'auto',
                      margin: 'auto',
                      display: 'flex'
                    }}
                  >
                    <Text style={{ color: theme.textColor }}>LOGIN</Text>
                  </Button>
                )}
              </Row>
            </Grid>
          </Form>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: theme.inverseTextColor
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
