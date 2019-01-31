import React, { Component } from 'react';
import {connect} from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  onButtonPress(){
    const { item, phone, shift } = this.props;

    this.props.employeeCreate({ item, phone, shift: shift || 'Game Copy' });
  }

  render() {
    return(
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const {item, phone, shift} = state.employeeForm;

  return { item, phone, shift};
};

export default connect(mapStateToProps, {
  employeeUpdate, employeeCreate
}) (EmployeeCreate);
