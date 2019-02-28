import React from 'react';
//import { Permissions } from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import {
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  alert,
  PermissionsAndroid
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { viewportHeight } from '../common/constVar';

class YourPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageId: this.uniqueId(),
      imageSelected: false,
      uploading: false,
      caption: '',
      progress: 0
    };
  }

  /*   _checkPermissions = async () => {
    Permissions.checkMultiple(['camera', 'photo']).then(response => {
      //response is an object mapping type to permission
      this.setState({
        status: response.camera,
        statusRoll: response.photo
      });
    });
  }; */

  async _checkPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permission',
          message: 'Access to storage?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can add photo from storage');
        this.setState({
          status: true,
          statusRoll: true
        });
      } else {
        console.log('Camera permission denied');
        this.setState({
          status: false,
          statusRoll: false
        });
      }
    } catch (err) {
      console.warn(err);
    }
  }

  s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  uniqueId = () =>
    `${this.s4() +
      this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}`;

  findNewImage = async () => {
    await this._checkPermissions();

    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    await ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          imageSelected: true,
          imageId: this.uniqueId(),
          uri: response.uri
        });
        this.uploadImage(response.uri);
      }
    });
    /* 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      allowsEditing: true,
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      console.log('upload image');
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        uri: result.uri
      });
      //this.uploadImage(result.uri);
    } else {
      console.log('cancel');
    } */
  };

  uploadPublish = () => {
    if (this.state.uploading == false) {
      if (this.state.caption != '') {
        this.uploadImage(this.state.uri);
      } else {
        alert('Please enter a caption...');
      }
    } else {
      console.log('Ignore button tap as aldready uploading');
    }
  };

  uploadImage = async uri => {
    console.log('img upload');
    const that = this;
    const userid = this.props.user.user.uid;
    const imageId = this.state.imageId;

    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(uri)[1];
    this.setState({
      currentFileType: ext,
      uploading: true
    });

    const response = await fetch(uri);
    const blob = await response.blob();
    const FilePath = `${imageId}.${that.state.currentFileType}`;

    const uploadTask = firebase
      .storage()
      .ref(`user/${userid}/img`)
      .child(FilePath)
      .put(blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
        console.log(`Upload is ${progress}% complete`);
        that.setState({
          progress
        });
      },
      error => {
        console.log('error with upload ');
        console.log(error);
      },
      () => {
        that.setState({ progress: 100 });
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          that.processUpload(downloadURL);
        });
      }
    );

    // var snapshot = ref.put(blob).on('state_changed', snapshot => {
    //     console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
    // });
  };

  processUpload = imageUrl => {
    //Set needed info
    const imageId = this.state.imageId;
    const userId = this.props.user.user.uid;
    const caption = this.state.caption;
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    //Build photo object

    const photoObj = {
      author: userId,
      caption,
      posted: timestamp,
      url: imageUrl
    };

    //update database

    //add to mainfeed
    firebase
      .database()
      .ref(`/photos/${imageId}`)
      .set(photoObj);

    //set user photos object
    firebase
      .database()
      .ref(`/users/${userId}/photos/${imageId}`)
      .set(photoObj);

    alert('Image Uploaded!!');

    this.setState({
      uploading: false,
      imageSelected: false,
      caption: '',
      uri: ''
    });
  };

  render() {
    return (
      <View>
        {
          //logged in
          //check if an image Selected
          <View style={{ flex: 1 }}>
            {this.state.imageSelected == true ? (
              <View style={{ flex: 1 }}>
                <View style={{ padding: 5 }}>
                  <Text style={{ marginTop: 5 }}>Caption:</Text>
                  <TextInput
                    editable
                    placeholder={'Enter your caption...'}
                    maxLength={150}
                    multiline
                    numberOfline={4}
                    onChangeText={text => this.setState({ caption: text })}
                    style={{
                      marginVertical: 10,
                      height: 100,
                      padding: 5,
                      borderColor: 'grey',
                      borderWidth: 1,
                      borderRadius: 3,
                      backgroundColor: 'white',
                      color: 'black'
                    }}
                  />

                  <TouchableOpacity
                    onPress={() => this.uploadPublish()}
                    style={{
                      alignSelf: 'center',
                      width: 170,
                      marginHorizontal: 'auto',
                      backgroundColor: 'purple',
                      borderRadius: 5,
                      paddingVertical: 10,
                      paddingHorizontal: 20
                    }}
                  >
                    <Text style={{ textAlign: 'center', color: 'white' }}>Upload & Publish</Text>
                  </TouchableOpacity>

                  {this.state.uploading == true ? (
                    <View style={{ marginTop: 10 }}>
                      <Text>{this.state.progress}%</Text>
                      {this.state.progress != 100 ? (
                        <ActivityIndicator size="small" color="blue" />
                      ) : (
                        <Text>Progress</Text>
                      )}
                    </View>
                  ) : (
                    <View />
                  )}
                  <Image
                    source={{ uri: this.state.uri }}
                    style={{ marginTop: 10, resizeMode: 'cover', width: '100%', height: 275 }}
                  />
                </View>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: viewportHeight - 150
                }}
              >
                <Text style={{ fontSize: 28, paddingBottom: 15 }}>Upload</Text>
                <TouchableOpacity
                  onPress={() => this.findNewImage()}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: 'blue',
                    borderRadius: 5
                  }}
                >
                  <Text style={{ color: 'white' }}>Select Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        }
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
)(YourPosts);
