import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { connect } from 'react-redux';

class MainFooterBar extends Component {

  render() {
    return (
      <Footer>
        <FooterTab>
          <Button active={this.props.isOnHome}>
            <Icon
              active={this.props.isOnHome}
              name="home"
              type="Entypo"
            />
          </Button>
          <Button active={this.props.isOnMap}>
            <Icon
              active={this.props.isOnMap}
              name="map"
              type="MaterialIcons"
            />
          </Button>
          <Button active={this.props.isOnConnection}>
            <Icon
              active={this.props.isOnConnection}
              name={this.props.isOnConnection ? 'people' : 'people-outline'}
              type="MaterialIcons"
            />
          </Button>
          <Button active={this.props.isOnNotification}>
            <Icon
              active={this.props.isOnNotification}
              name={this.props.isOnNotification ? 'notifications' : 'notifications-none'}
              type="MaterialIcons"
            />
          </Button>
          <Button active={this.props.isOnMenu}>
            <Icon
              active={this.props.isOnMenu}
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
