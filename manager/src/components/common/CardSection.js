
import React from 'react';
import { View } from 'react-native';
import { withTheme } from 'react-native-material-ui';

const CardSection = (props) => (
  <View style={[styles.containerStyle, props.style]}>
    {props.children}
  </View>
);

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default withTheme(CardSection);
