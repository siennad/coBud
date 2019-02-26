import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Icon } from 'native-base';
import Home from './components/Home/index';
import Map from './components/Map/index';
import Login from './components/Login/index';
import UserMenu from './components/UserMenu';
import Connections from './components/Connections/index';
import Notifcations from './components/Notifcations/index';
import Chat from './components/Connections/Chat';
import ViewProfile from './components/UserMenu/ViewProfile';
import UpdateProfile from './components/UserMenu/UpdateProfile';

import themeColor from './../native-base-theme/variables/commonColor';
import LocalChat from './components/Connections/LocalChat';

const TabIcon = ({ name, selected }) => {
  switch (name) {
    case 'index':
      return (
        <Icon
          name="home"
          type="Entypo"
          style={{
            color: !selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
          }}
        />
      );
    case 'map':
      return (
        <Icon
          name="map"
          type="MaterialIcons"
          style={{
            color: !selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
          }}
        />
      );
    case 'connections':
      return (
        <Icon
          name={selected ? 'people' : 'people-outline'}
          type="MaterialIcons"
          style={{
            color: !selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
          }}
        />
      );
    case 'notifications':
      return (
        <Icon
          name={selected ? 'notifications' : 'notifications-none'}
          type="MaterialIcons"
          style={{
            color: !selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
          }}
        />
      );
    case 'usermenu':
      return (
        <Icon
          name="menu"
          type="MaterialIcons"
          style={{
            color: !selected ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,1)'
          }}
        />
      );
    default:
      return null;
  }
};

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 0 }}>
    <Scene key="auth">
      <Scene key="login" component={Login} title="Login" hideNavBar="true" />
    </Scene>
    <Scene
      key="main"
      hideNavBar="true"
      tabs
      tabBarStyle={{ backgroundColor: themeColor.brandPrimary }}
    >
      <Scene key="index" initial hideNavBar="true" icon={TabIcon}>
        <Scene key="home" component={Home} initial />
      </Scene>
      <Scene key="map" component={Map} hideNavBar="true" icon={TabIcon} />
      <Scene key="connections" hideNavBar="true" icon={TabIcon}>
        <Scene key="connectionsHome" component={Connections} initial />
        <Scene key="chat" component={Chat} />
        <Scene key="localChat" component={LocalChat} />
      </Scene>
      <Scene
        key="notifications"
        component={Notifcations}
        hideNavBar="true"
        icon={TabIcon}
      />
      <Scene key="usermenu" hideNavBar="true" icon={TabIcon}>
        <Scene key="mainmenu" component={UserMenu} initial />
        <Scene
          key="updateprofile"
          component={props => <UpdateProfile {...props} />}
        />
        <Scene
          key="viewprofile"
          component={props => <ViewProfile {...props} />}
        />
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
