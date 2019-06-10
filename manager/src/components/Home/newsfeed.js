import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import PhotoList from './PhotoList';

class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_feed: [],
      refresh: false,
      loading: true
    };
  }

  componentDidMount = () => {};

  render() {
    return (
      <View style={{ flex: 1 }}>
        <PhotoList isUser={false} navigation={this.props.navigation} />
      </View>
    );
  }
}

export default NewsFeed;
