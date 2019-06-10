import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Text,
  View,
  Alert,
  Keyboard
} from 'react-native';
import { connect } from 'react-redux';

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false,
      commentsList: [],
      comment: ''
    };
  }

  componentDidMount = () => {
    console.log('on comments');
    const that = this;
    const { photoId } = this.props;
    if (photoId) {
      this.setState({
        photoId
      });
      this.fetchComments(photoId);
    }
  };

  addCommentToList = (commentsList, data, comment) => {
    const that = this;
    const commentObj = data[comment];
    firebase
      .database()
      .ref('users')
      .child(commentObj.author)
      .child('username')
      .once('value')
      .then(snapshot => {
        const exists = snapshot.val() !== null;
        const val = exists ? snapshot.val() : {};
        commentsList.push({
          id: comment,
          comment: commentObj.comment,
          posted: that.timeConverter(commentObj.posted),
          author: val,
          authorId: commentObj.author
        });

        that.setState({
          refresh: false,
          loading: false
        });
      })
      .catch(error => console.log(error));
  };

  fetchComments = photoId => {
    const that = this;

    firebase
      .database()
      .ref('comments')
      .child(photoId)
      .orderByChild('posted')
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          const val = snapshot.val();
          const commentsList = that.state.commentsList;

          for (const comment in val) {
            that.addCommentToList(commentsList, val, comment);
          }
        } else {
          that.setState({
            commentsList: []
          });
        }
      })
      .catch(error => console.log(error));
  };

  s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  uniqueId = () =>
    `${this.s4() +
      this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;

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

  postComment = () => {
    const comment = this.state.comment;
    if (comment != '') {
      const imageId = this.state.photoId;
      const userId = this.props.user.user.uid;
      const commentId = this.uniqueId();
      const dateTime = Date.now();
      const timestamp = Math.floor(dateTime / 1000);

      this.setState({
        comment: ''
      });

      const commentObj = {
        posted: timestamp,
        author: userId,
        comment
      };

      firebase
        .database()
        .ref(`/comments/${imageId}/${commentId}`)
        .set(commentObj);

      this.reloadCommentList();
      this.setState({ comment: '' });
      Keyboard.dismiss();
    } else {
      Alert.alert(
        'Alert',
        'Please enter a comment before posting.',
        [{ text: 'OK', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }],
        { cancelable: true }
      );
    }
  };

  reloadCommentList = () => {
    this.setState({
      comment_list: []
    });
    this.fetchComments(this.state.photoId);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.commentsList.length == 0 ? (
          <Text>No comments found...</Text>
        ) : (
          <FlatList
            refreshing={this.state.refresh}
            data={this.state.commentsList}
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
                <View style={{ padding: 5 }}>
                  <Text>{item.comment}</Text>
                </View>
              </View>
            )}
          />
        )}
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={{ borderTopWidth: 1, borderTopColor: 'grey', padding: 10, marginBottom: 15 }}
        >
          <Text style={{ fontWeight: 'bold' }}>Post Comment</Text>
          <View>
            <TextInput
              editable
              placeholder={'enter your comment here...'}
              onChangeText={text => this.setState({ comment: text })}
              style={{
                marginVertical: 10,
                height: 50,
                padding: 5,
                borderColor: 'grey',
                borderRadius: 3,
                backgroundColor: 'white',
                color: 'black'
              }}
              value={this.state.comment}
            />

            <TouchableOpacity
              style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: 'blue',
                borderRadius: 5
              }}
              onPress={() => this.postComment()}
            >
              <Text style={{ color: 'white' }}>Post</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  undefined
)(Comments);
