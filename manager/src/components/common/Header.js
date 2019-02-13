/* @flow */

import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
  const { textStyle } = styles;

  return (
    <View style={styles.viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 0,
    position: 'relative',
    elevation: 4,
    shadowColor: 'red',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  textStyle: {
    fontSize: 20,
  }
};

export { Header };
