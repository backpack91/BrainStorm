import {
  ROOM_CREATION,
  ROOM_TITLE,
  POSTIT_CREATION,
  POSTIT_VALUE,
  POSTIT_LOCATION,
  POSTIT_DELETION,
  TOGGLING_URLBOX,
  TOGGLING_MODAL,
  USERNAME_SUBMISSION,
  USER_PARTICIPATION,
  USER_DISCONNECTION
} from '../constants/actionTypes.js';
import _ from 'lodash';

const initialStates = {
  // board_infos: '',
  // user_ids: '',
  room_title: '',
  postIts: {},
  latestPostItId: 0,
  urlBoxOpened: false,
  isModalOpened: false,
  userName: '',
  userList: []
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

    case POSTIT_DELETION:
      delete postItsClone[action.id];

      return {
        ...state,
        postIts: postItsClone
      };

    case TOGGLING_URLBOX:
      if (state.urlBoxOpened) {
        return {
          ...state,
          urlBoxOpened: false
        };
      } else {
        return {
          ...state,
          urlBoxOpened: true
        };
      }

    case TOGGLING_MODAL:
      if (state.isModalOpened) {
        return {
          ...state,
          isModalOpened: false
        };
      } else {
        return {
          ...state,
          isModalOpened: true
        };
      }

    case USERNAME_SUBMISSION:
      return {
        ...state,
        userName: action.userName,
        isModalOpened: false
      };

    case USER_PARTICIPATION:
      return {
        ...state,
        userList: action.userList
      };

    case USER_DISCONNECTION:
      let userListCopy = state.userList.slice();

      state.userList.forEach((user, index) => {
        if (user === action.disconnectedUserName) {
          userListCopy.splice(index, 1);
        }
      });

      return {
        ...state,
        userList: userListCopy
      };

    default:
      return state;
  }
}
