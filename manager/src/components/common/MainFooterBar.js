import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

class MainFooterBar extends Component {

  //TODO : edit later when poping screen without change the whole screen
  // Idea about using Native base Tab
  componentDidMount(prevProps, prevState) {
    console.log(prevProps);
    console.log(prevState);
    console.log(this.props);
  }

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button
            active={this.props.page === 'home' || this.props.isOnHome}
            onPress={() => Actions.home()}
          >
            <Icon
              active={this.props.page === 'home'}
              name="home"
              type="Entypo"
            />
          </Button>
          <Button
            active={this.props.page === 'map' || this.props.isOnMap}
            onPress={() => Actions.map()}
          >
            <Icon
              active={this.props.page === 'map'}
              name="map"
              type="MaterialIcons"
            />
          </Button>
          <Button active={this.props.page === 'connections'} onPress={() => Actions.connections()}>
            <Icon
              active={this.props.page === 'connections'}
              name={this.props.page === 'connections' ? 'people' : 'people-outline'}
              type="MaterialIcons"
            />
          </Button>
          <Button
            active={this.props.page === 'notifications'}
            onPress={() => Actions.notifications()}
          >
            <Icon
              active={this.props.page === 'notifications'}
              name={this.props.page === 'notifications' ? 'notifications' : 'notifications-none'}
              type="MaterialIcons"
            />
          </Button>
          <Button
            active={this.props.page === 'usermenu' || this.props.isOnMenu}
            onPress={() => Actions.usermenu()}
          >
            <Icon
              active={!!this.props.isOnMenu}
              name='menu'
              type="MaterialIcons"
            />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = (state) => {
  const { isOnConnection, isOnHome, isOnMap, isOnMenu, isOnNotification } = state.navigation;

  return { isOnConnection, isOnHome, isOnMap, isOnMenu, isOnNotification };
};

export default connect(mapStateToProps, undefined)(MainFooterBar);
