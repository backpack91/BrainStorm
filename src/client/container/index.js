import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from '../components/App.js';

class AppContainer extends Component {
  render() {
    return (
      <App appState={this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
