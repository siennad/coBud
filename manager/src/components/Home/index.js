import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { renderHeader } from '../common/Header';
import { withNativebaseTheme } from '../common/common-ui';
import MainFooterBar from '../common/MainFooterBar';
import { navigateToHome } from '../../actions/NavigationActions';

class Home extends Component {

  componentDidMount() {
    navigateToHome();
  }

  render() {
    return (
      <Container>
        {renderHeader({
          searchBar: true,
          rounded: true
        })}
        <Content />
        <MainFooterBar />
      </Container>
    );
  }
}

export default connect(undefined, { navigateToHome })(withNativebaseTheme(Home));
