import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import PlaceList from './components/PlaceList';
import PlaceCreate from './components/PlaceCreate';
import PlaceEdit from './components/PlaceEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Login" />
      </Scene>

      <Scene key="main">
        <Scene
          onRight={() => Actions.placeCreate()}
          rightTitle="Add"
          key="placeList"
          component={PlaceList}
          title="Username"
          initial
        />
        <Scene key="placeCreate" component={PlaceCreate} title="Create Location" />
        <Scene key="placeEdit" component={PlaceEdit} title="Edit Location" />
      </Scene>
    </Router>
  );
}

export default RouterComponent;
