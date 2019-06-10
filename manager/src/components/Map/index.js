import React, { Component } from 'react';
import { Container, Content, Header, Item, Icon, Input, Text, Button } from 'native-base';
import { Keyboard, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

class Map extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      LatLng: {
        latitude: 37.78825,
        longitude: -122.4324
      },
      LatLng2: {
        latitude: 70,
        longitude: 20
      },
      LatLng3: {
        latitude: 70,
        longitude: 20
      },
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      }
    };
  }

  componentDidMount() {
    Keyboard.dismiss();

    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        LatLng: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
          // latitude: 37.78825,
          // longitude: -122.4324
        },
        LatLng2: {
          latitude: position.coords.latitude + 0.001,
          longitude: position.coords.longitude + 0.001
          // latitude: 37.78825,
          // longitude: -122.4324
        },
        LatLng3: {
          latitude: position.coords.latitude + 0.001,
          longitude: position.coords.longitude + -0.004
          // latitude: 37.78825,
          // longitude: -122.4324
        },
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // latitude: 37.78825,
          // longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }
      });
    });
  }
  render() {
    return (
      <Container style={{ paddingBottom: 50 }}>
        <Header searchBar rounded hasSegment>
          <Item>
            <Icon ios="ios-search" android="md-search" />
            <Input placeholder="Search..." />
          </Item>
        </Header>
        <Content>
          <Container>
            <MapView style={styles.map} region={this.state.region}>
              <Marker coordinate={this.state.LatLng} title="It me" />
              <Marker
                description="Hello! this is buddy1"
                pinColor="yellow"
                coordinate={this.state.LatLng2}
                title="My buddy 1"
              />
              <Marker
                description="Buddy 2 Click me to Add Chat"
                pinColor="blue"
                coordinate={this.state.LatLng3}
                title="My buddy 2"
              />
            </MapView>
          </Container>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    backgroundColor: 'green'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
  //};
});
export default Map;

// import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
// import MapView from 'react-native-maps';

// export default class Map extends Component {
//   state = {
//     region: {
//       latitude: 37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421
//     }
//   };
//   render() {
//     return <MapView style={styles.map} region={this.state.region} />;
//   }
// }

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject
//   }
// });
