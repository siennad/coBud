/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Content, Header, Item, Icon, Input, Tab, Tabs } from 'native-base';
import { Keyboard, Image, View, ScrollView, Animated, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { viewportWidth, viewportHeight } from '../common/constVar';
import { placeBanner } from '../PlaceData/placeData';
import Feature from './feature';
import Newsfeed from './newsfeed';

const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

class Home extends Component {
  componentDidMount() {
    Keyboard.dismiss();
    if (!firebase.auth().currentUser) {
      Actions.auth();
    }
  }

  numItems = placeBanner.length;
  itemWidth = FIXED_BAR_WIDTH / this.numItems - (this.numItems - 1) * BAR_SPACE;
  animVal = new Animated.Value(0);

  render() {
    let imageArray = [];
    let barArray = [];
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
      <Container style={{ paddingBottom: 50 }}>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
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
          <Tabs>
            <Tab heading="Most Popular">
              <Feature />
            </Tab>
            <Tab heading="Newsfeed">
              <Newsfeed />
            </Tab>
          </Tabs>
        </Content>
      </Container>
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

export default Home;
