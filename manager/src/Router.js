import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import PlaceList from './components/Places/PlaceList';
import PlaceCreate from './components/Places/PlaceCreate';
import PlaceEdit from './components/Places/PlaceEdit';
import Home from './components/Home';
import Login from './components/Login';

const RouterComponent = () => (
  <Router sceneStyle={{ paddingTop: 0 }}>
    <Scene key="auth">
      <Scene key="login" component={Login} title="Login" hideNavBar="true" />
    </Scene>

    <Scene key="main" hideNavBar="true" >
      <Scene key="home" component={Home} initial />
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
