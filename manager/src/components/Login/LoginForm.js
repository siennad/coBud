import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Form, Input, Label, Item, Button, Container } from 'native-base';

import { emailChanged, passwordChanged, loginUser } from '../../actions';
//import { Card, CardSection, Input, Button, Spinner } from '../common';
import { Spinner } from '../common';

class LoginForm extends Component {

  componentWillUnmount() {

  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    console.log('login user');
    this.props.loginUser({ email, password });
  }

  render() {
    const { email, password, error, loading } = this.props;
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              onChangeText={this.onEmailChange.bind(this)}
              value={email}
            />
          </Item>
          <Item floatingLabel last>
            <Label>Password</Label>
            <Input
              secureTextEntry
              onChangeText={this.onPasswordChange.bind(this)}
              value={password}
            />
          </Item>
          <Text style={styles.errorTextStyle}>
            {error}
          </Text>


          {
            (loading)
              ? <Spinner size="large" />
              : <Button primary rounded full onPress={this.onButtonPress.bind(this)} >
                <Text style={{ color: 'white' }}>Login</Text>
              </Button>
          }

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

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
