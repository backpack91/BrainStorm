import React, {Component} from 'react';
import {connect} from 'react-redux';
import App from '../components/App.js';
import PostIt from '../components/PostIt.js';
import axios from 'axios';
import { createHashHistory } from 'history';
import io from 'socket.io-client';
import ReduxThunk from 'redux-thunk';
import {
  roomCreation,
  roomTitle,
  postItCreation,
  postItLocation,
  postItValue,
  postItDeletion
} from '../actions';

class AppContainer extends Component {
  componentDidMount() {
    this.props.onMount();

    const socket = io('http://localhost:8080/');
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
    user_ids: state.user_ids,
    postIts: state.postIts,
    latestPostItId: state.latestPostItId
  };
};

const mapDispatchToProps = (dispatch, props) => {
  // const history = createHashHistory();

  return {
    onMount: () => {
      axios.get('/')
      .then(res => {
        console.log('onMount!!!!!!!!', res);
      })
    },
    createNewRoom: (room_title, e) => {
      axios.get(`/api/rooms/${room_title}/new`)
      .then(res => {
        // history.push(`/room/${room_title}`);
        dispatch(roomCreation(res));
      });
    },
    getRoomTitle: (e) => {
      const title = e.target.value;
      dispatch(roomTitle(title));
    },
    makePostIt: (id, e) => {
      const whiteBoard = e.currentTarget;
      dispatch(postItCreation(id));
    },
    setStateOfPostItValue: (id, e) => {
      const value = e.target.value;
      dispatch(postItValue(id, value));
    },
    setStateOfPostItLocation: (id, left, top) => {
      dispatch(postItLocation(id, left, top));
    },
    deletePostIt: (id, e) => {
      dispatch(postItDeletion(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
