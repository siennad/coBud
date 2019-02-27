/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import { Text, Card, CardItem } from 'native-base';
import { Image, View, StyleSheet } from 'react-native';
import { viewportWidth, viewportHeight } from '../common/constVar';
import { placeData } from '../PlaceData/placeData';

export default class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularData: placeData
    };
  }

  render() {
    return (
      <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {this.state.popularData.map((item, index) => (
          <Card key={index} style={styles.itemAlign}>
            <CardItem cardBody>
              <Image
                source={item.imageUri}
                style={{ height: 140, width: 174, borderRadius: 4, paddingTop: 10 }}
              />
            </CardItem>
            <CardItem>
              <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.name}</Text>
            </CardItem>
          </Card>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemAlign: {
    flex: 0,
    width: viewportWidth / 2 - 10,
    height: viewportHeight / 3 - 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15
  }
});
