import React, { Component } from 'react';
import {
  Container,
  Content,
  Header,
  Item,
  Text,
  Left,
  Body,
  Button,
  Icon,
  Form,
  Input,
  Label,
  Textarea,
  Right,
  Spinner
} from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Keyboard } from 'react-native';

import { accordionBorderColor } from '../../../native-base-theme/variables/commonColor';

import {
  updateProfile,
  getUserProfile
} from '../../actions/UserProfileActions';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        name: '',
        address: '',
        city: '',
        hobby: ''
      },
      formDirty: false
    };
  }

  async componentDidMount() {
    await this.props.getUserProfile(this.props.user.user.uid);
    if (this.props.userProfile) {
      console.log('uodate prof yes');
      console.log(this.props.userProfile);
      this.setState({
        ...this.state,
        values: this.props.userProfile
      });
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps);
    console.log(nextContext);
  }

  componentWillUnmount() {
    // Actions.pop();
  }

  handleChange(props, val) {
    const values = this.state.values;
    values[props] = val;
    this.setState({
      formDirty: true,
      values
    });
  }

  updateProfile() {
    Keyboard.dismiss();
    this.props.updateProfile({
      userId: this.props.user.user.uid,
      value: this.state.values
    });
  }

  render() {
    const { values } = this.state;

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
            <Text style={{ color: 'white' }}>Update Profile</Text>
          </Body>
          <Right>
            <Button onPress={() => this.updateProfile()}>
              <Text>Update</Text>
            </Button>
          </Right>
        </Header>
        <Content padder>
          {this.props.loading && !this.state.formDirty ? (
            <Spinner color={accordionBorderColor} />
          ) : (
            <Form>
              <Item stackedLabel underline={false}>
                <Label>Name</Label>
                <Input
                  bordered
                  placeholder="Full name"
                  onChangeText={value => this.handleChange('name', value)}
                  style={styles.rootInput}
                  value={values.name}
                />
              </Item>
              <Item stackedLabel underline={false}>
                <Label>Address</Label>
                <Input
                  bordered
                  placeholder="Address"
                  onChangeText={value => this.handleChange('address', value)}
                  style={styles.rootInput}
                  value={values.address}
                />
              </Item>
              <Item stackedLabel underline={false}>
                <Label>City</Label>
                <Input
                  bordered
                  placeholder="City"
                  onChangeText={value => this.handleChange('city', value)}
                  style={styles.rootInput}
                  value={values.city}
                />
              </Item>
              <Item stackedLabel underline={false}>
                <Label>Hobby</Label>
                <Textarea
                  rowSpan={3}
                  placeholder="Your hobbies, favourites"
                  onChangeText={value => this.handleChange('hobby', value)}
                  style={styles.rootInput}
                  value={values.hobby}
                />
              </Item>
              <Button block onPress={() => this.updateProfile()}>
                <Text>Save</Text>
              </Button>
            </Form>
          )}
        </Content>
       
      </Container>
    );
  }
}

const styles = {
  rootInput: {
    width: '100%'
  },

  root: {
    width: '100%',
    height: '100%'
  }
};

const mapStateToProps = state => ({
  user: state.auth.user,
  userProfile: state.userProfile.userinfo,
  loading: state.userProfile.loading
});

export default connect(
  mapStateToProps,
  { updateProfile, getUserProfile }
)(UpdateProfile);
