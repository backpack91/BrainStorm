import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from '../components/App.js';
import axios from 'axios';
import { createHashHistory } from 'history';
import io from 'socket.io-client';
import {
  roomCreation,
  roomTitle,
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    this.props.onMount();
    const socket = io('http://localhost:8080');
  }

  render() {
    return (
      <App appState={this.props} />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    room_title: state.room_title,
    board_infos: state.board_infos,
    user_ids: state.user_ids
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const history = createHashHistory();

  return {
    onMount: () => {
      axios.get('/')
      .then(res => {
        console.log('onMount!!!!!!!!', res);
      })
    },
    createNewRoom: (room_title) => {
      axios.get(`/api/rooms/${room_title}/new`)
      .then(res => {
        history.push(`/room/${room_title}`);
        dispatch(roomCreation(res));
      });
    },
    getRoomTitle: (e) => {
      const title = e.target.value;
      dispatch(roomTitle(title));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
