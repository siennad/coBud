//This is the index.js file
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { placesFetch } from '../../actions';
import PlaceListItem from './PlaceListItem';

class PlaceList extends Component {
  constructor(props) {
    super(props);
    props.placesFetch();

    this.createDataSource(props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component
    // will be rendered with
    // this.props us stull the old set of props

    this.createDataSource(nextProps);
  }

  createDataSource({ places }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(places);
  }

  renderRow(place) {
    return <PlaceListItem place={place} />;
  }

  render() {
    console.log(this.props);
    return (
      <PlaceListItem
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = state => {
  const places = _.map(state.places, (val, uid) => ({ ...val, uid }));

  return { places };
};

export default connect(mapStateToProps, { placesFetch })(PlaceList);
