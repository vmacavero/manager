import React, { Component } from 'react';
import _ from 'lodash';
import Communications from 'react-native-communications';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { 
  employeeUpdate, 
  employeeSave, 
  employeeFormClear, 
  employeeDelete } from '../actions';
import { 
  Card, 
  CardSection, 
  Button, 
  Confirm } from './common';


class EmployeeEdit extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Edit of Employee !'
    });   
    
    state = { showModal: false };

    componentWillMount() {
      _.each(this.props.navigation.state.params.employee, (value, prop) => {
        this.props.employeeUpdate({ prop, value });
      });     
    }
    
    componentWillUnmount() {
      //calling the action to delete form data !
      this.props.employeeFormClear();
    }


    onButtonPress() {
      const { name, phone, shift } = this.props;
      this.props.employeeSave({ 
        name, 
        phone, 
        shift, 
        uid: this.props.navigation.state.params.employee.uid,
        navi: this.props.navigation
      });
    }
    onTextPress() {
        const { phone, shift } = this.props;
        Communications.text(phone, `Your Upcoming Shift is on${shift}`);
    }

    onAccept() {
      const { uid } = this.props.navigation.state.params.employee;
      this.props.employeeDelete({ uid, navi: this.props.navigation });
    }

    onDecline() {
      this.setState({ showModal: false });
    }

  render() {
    return (
      <Card>
        <EmployeeForm />
          <CardSection>
            <Button
              onPress={this.onButtonPress.bind(this)}
            >
              Save Changes
            </Button>
          </CardSection>
          <CardSection>
            <Button onPress={this.onTextPress.bind(this)}>
              Text Schedule
            </Button>
          </CardSection>
          
          <CardSection>
            <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
              Fire Employee
            </Button>
          </CardSection>

          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Are You sure you want to delete this?
          </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { 
  employeeUpdate, 
  employeeSave, 
  employeeFormClear,
  employeeDelete
})(EmployeeEdit);
