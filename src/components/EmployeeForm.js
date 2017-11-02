import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Picker } from 'react-native';
import { CardSection, Input } from './common';
import { employeeUpdate } from '../actions';

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
          label="name"
          placeholder="jane"
          value={this.props.name}
          onChangeText={
            value => this.props.employeeUpdate({ prop: 'name', value })
          }
          />
      </CardSection> 

      <CardSection>
        <Input
        label="phone"
        placeholder="555-55522"
        value={this.props.phone}
        onChangeText={
          value => this.props.employeeUpdate({ prop: 'phone', value })
        }
        />
      </CardSection> 

      <CardSection style={{ flexDirection: 'column' }}>
        <Text style={styles.pickerTextStyle}>
          SHIFT SELECTION
        </Text>
        <Picker
          selectedValue={this.props.shift}
          onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
        </Picker>
      </CardSection>
    </View> 
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20
  }
};

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
