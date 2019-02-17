import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import PlaceList from './components/Places/PlaceList';
import PlaceCreate from './components/Places/PlaceCreate';
import PlaceEdit from './components/Places/PlaceEdit';
import Home from './components/Home';
import Map from './components/Map';
import Login from './components/Login';
import UserMenu from './components/UserMenu';
import Connections from './components/Connections';
import Notifcations from './components/Notifcations';

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 0 }}>
    <Scene key="auth">
      <Scene key="login" component={Login} title="Login" hideNavBar="true" />
    </Scene>

    <Scene key="main" hideNavBar="true" >
      {/** main pages */}
      <Scene key="home" component={Home} initial />
      <Scene key="map" component={Map} />
      <Scene key="usermenu" component={UserMenu} />
      <Scene key="connections" component={Connections} />
      <Scene key="notifications" component={Notifcations} />
      {/** sub pages */}
      <Scene
        onRight={() => Actions.placeCreate()}
        rightTitle="Add"
        key="placeList"
        component={PlaceList}
        title="Username"
      />
      <Scene key="placeCreate" component={PlaceCreate} title="Create Location" />
      <Scene key="placeEdit" component={PlaceEdit} title="Edit Location" />
    </Scene>
  </Router>
);

export default RouterComponent;
