import React from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import _ from 'lodash';

class PhotoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoFeed: [],
      refresh: false,
      loading: true,
      empty: false
    };
  }

  componentDidMount = () => {
    const { isUser, userId } = this.props;

    if (isUser == true) {
      this.loadFeed(userId);
    } else {
      this.loadFeed('');
    }
  };

  pluralCheck = s => {
    if (s == 1) {
      return 'ago';
    }
    return 's ago';
  };

  timeConverter = timestamp => {
    const a = new Date(timestamp * 1000);
    const seconds = Math.floor((new Date() - a) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return `${interval} year${this.pluralCheck(interval)}`;
    }

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return `${interval} month${this.pluralCheck(interval)}`;
    }

    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return `${interval} day${this.pluralCheck(interval)}`;
    }

    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return `${interval} hour${this.pluralCheck(interval)}`;
    }

    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return `${interval} minute${this.pluralCheck(interval)}`;
    }
    return `${Math.floor(seconds)} second${this.pluralCheck(interval)}`;
  };

  addToFlatList = (photoFeed, data, photo) => {
    const that = this;
    const photoObj = data[photo];
    firebase
      .database()
      .ref('users')
      .child(photoObj.author)
      .child('username')
      .once('value')
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        const val = exists ? snapshot.val() : {};
        photoFeed.push({
          id: photo,
          url: photoObj.url,
          caption: photoObj.caption,
          posted: that.timeConverter(photoObj.posted),
          timestamp: photoObj.posted,
          author: val,
          authorId: photoObj.author
        });

        const myData = [].concat(photoFeed).sort((a, b) => a.timestamp < b.timestamp);

        that.setState({
          refresh: false,
          loading: false,
          photoFeed: myData
        });
      })
      .catch(error => console.log(error));
  };

  loadFeed = (userId = '') => {
    this.setState({
      refresh: true,
      photoFeed: []
    });

    const that = this;

    let loadRef = firebase.database().ref('photos');
    if (userId != '') {
      loadRef = firebase
        .database()
        .ref('users')
        .child(userId)
        .child('photos');
    }

    loadRef
      .orderByChild('posted')
      .once('value')
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        if (exists) {
          const val = snapshot.val();
          const photoFeed = that.state.photoFeed;

          that.setState({ empty: false });
          for (const photo in val) {
            that.addToFlatList(photoFeed, val, photo);
          }
        } else {
          that.setState({ empty: true });
        }
      })
      .catch(error => console.log(error));
  };

  loadNew = () => {
    this.loadFeed();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.loading == true ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.empty == true ? <Text>No Posts</Text> : <Text>Loading...</Text>}
          </View>
        ) : (
          <FlatList
            refreshing={this.state.refresh}
            onRefresh={this.loadNew}
            data={this.state.photoFeed}
            keyExtractor={(item, index) => index.toString()}
            style={{ flex: 1, backgroundColor: '#eee' }}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  overflow: 'hidden',
                  marginBottom: 5,
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: 'grey'
                }}
              >
                <View
                  style={{
                    padding: 5,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Text>{item.posted}</Text>
                  <TouchableOpacity onPress={() => Actions.viewprofile({ uid: item.authorId })}>
                    <Text>{item.author}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    console.log('show comments');
                    Actions.comment({ photoId: item.id });
                    console.log('after comment');
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: item.url }}
                      style={{ resizeMode: 'cover', width: '100%', height: 270 }}
                    />
                  </View>
                  <View style={{ padding: 5 }}>
                    <Text>{item.caption}</Text>
                    <Text style={{ color: 'blue', marginTop: 10, textAlign: 'center' }}>
                      View Comments...
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

export default PhotoList;
