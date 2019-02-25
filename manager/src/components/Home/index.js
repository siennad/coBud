/* eslint-disable no-mixed-operators */
/* eslint-disable prefer-const */
import React, { Component } from 'react';
import firebase from 'firebase';
import { Container, Content, Header, Item, Text, Icon, Input, Card, CardItem } from 'native-base';
import { Keyboard, Image, View, ScrollView, Animated, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { viewportWidth, viewportHeight } from '../common/constVar';
import { placeBanner, placeData } from '../PlaceData/placeData';

const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: placeData
    };
  }

  componentDidMount() {
    this.props.navigateToHome();
    console.log(firebase.auth().currentUser);
    Keyboard.dismiss();
    if (!firebase.auth().currentUser) {
      Actions.auth();
    }
  }

  componentWillUnmount() {
    //Actions.pop();
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

    console.log(this.ds);
    console.log(this.state.listViewData);

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <View style={styles.container} flex={1}>
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
        <Content>
          <Item>
            <Text>Most popular</Text>
          </Item>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {this.state.listData.map((item, index) => (
              <Card
                key={index}
                style={{
                  flex: 0,
                  width: viewportWidth / 2 - 10,
                  height: viewportHeight / 3 - 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 15
                }}
              >
                <CardItem cardBody style={{ marginTop: 5 }}>
                  <Image source={item.imageUri} style={{ height: 125, width: 175 }} />
                </CardItem>
                <CardItem>
                  <Text style={{ textAlign: 'center', fontSize: 15 }}>{item.name}</Text>
                </CardItem>
              </Card>
            ))}
          </View>
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
    top: viewportHeight / 4 + 40,
    flexDirection: 'row'
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0
  }
});

export default Home;
