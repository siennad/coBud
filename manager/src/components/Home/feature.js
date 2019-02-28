/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-mixed-operators */
import React, { Component } from 'react';
import { Content, Text, Card, CardItem } from 'native-base';
import { Image, View, ScrollView, Animated, StyleSheet } from 'react-native';
import { viewportWidth, viewportHeight } from '../common/constVar';
import { placeData, placeBanner } from '../PlaceData/placeData';

const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

export default class Feature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularData: placeData
    };
  }
  numItems = placeBanner.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  render() {
    const imageArray = [];
    const barArray = [];
    placeBanner.forEach((image, i) => {
      console.log(image, i);
      const thisImage = (
        <Image
          key={`image${i}`}
          source={image.imageUri}
          style={{ width: viewportWidth, height: viewportHeight / 4 + 80 }}
        />
      );
      imageArray.push(thisImage);
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [viewportWidth * (i - 1), viewportWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp'
      });

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE
            }
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [{ translateX: scrollBarVal }]
              }
            ]}
          />
        </View>
      );

      barArray.push(thisBar);
    });
    return (
      <Content>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            onScroll={Animated.event([
              {
                nativeEvent: {
                  contentOffset: { x: this.animVal }
                }
              }
            ])}
          >
            {imageArray}
          </ScrollView>
          <View style={styles.barContainer}>{barArray}</View>
        </View>
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
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: viewportHeight / 4 + 75,
    flexDirection: 'row'
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2
  },
  bar: {
    backgroundColor: '#9b0513',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  itemAlign: {
    flex: 0,
    width: viewportWidth / 2 - 10,
    height: viewportHeight / 3 - 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15
  }
});
