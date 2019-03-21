import {
  ROOM_CREATION,
  ROOM_TITLE,
  POSTIT_CREATION,
  POSTIT_VALUE,
  POSTIT_LOCATION
} from '../constants/actionTypes.js';
import _ from 'lodash';

const initialStates = {
  // board_infos: '',
  // user_ids: '',
  room_title: '',
  postIts: {},
  latestPostItId: 0
};

export default function reducer (state = initialStates, action) {
  const postItsClone = _.cloneDeep(state.postIts);

  switch (action.type) {
    case ROOM_CREATION:
      return {
        ...state,
        room_title: action.room_title,
        // board_infos: action.board_infos,
        user_ids: action.user_ids
      };

    case ROOM_TITLE:
      return {
        ...state,
        room_title: action.room_title
      };

    case POSTIT_CREATION:
      postItsClone[action.id] = {
        left: action.left,
        top: action.top,
        value: action.value
      };

      return {
        ...state,
        postIts: postItsClone,
        latestPostItId: state.latestPostItId + 1
      };

    case POSTIT_VALUE:
      postItsClone[action.id] = {
        ...postItsClone[action.id],
        value: action.value
      };

      return {
        ...state,
        postIts: postItsClone
      };

    case POSTIT_LOCATION:
      postItsClone[action.id] = {
        ...postItsClone[action.id],
        left: action.left,
        top: action.top
      };

      return {
        ...state,
        postIts: postItsClone
      };

    default:
      return state;
  }
}
