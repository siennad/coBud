/* @flow */

import React from 'react';
import { Header, Right, Body, Left, Item, Icon, Input, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

const renderHeader = (props) => (
  <Header {...props}>
    {!props.searchBar &&
      <React.Fragment>
        {
          (props.left || props.backBtn) && <Left>
            {
              props.backBtn && <Button iconLeft onPress={() => Actions.pop()}>
                <Icon ios="ios-arrow-back" android="md-arrow-back" />
                <Text>Back</Text>
              </Button>
            }
            {props.left && props.left}
          </Left>
        }
        <Body>{props.title && props.title}</Body>
        <Right>{props.right && props.right}</Right>
      </React.Fragment>
    }
    {props.searchBar && <Item>
      <Icon ios="ios-search" android="md-search" />
      <Input placeholder="Search" />
    </Item>}
  </Header>
);

export default renderHeader;
