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
  USER_DISCONNECTION,
  BRINGING_ROOM_INFOS,
  POSTIT_SELECTION,
  POSTIT_STYLE,
  PICTURE_SUBMISSION_FORM,
  PICTURE_SUBMISSION
} from '../constants/actionTypes.js';
import _ from 'lodash';

const initialStates = {
  room_title: '',
  postIts: [],
  latestPostItId: 0,
  urlBoxOpened: false,
  isModalOpened: false,
  userName: '',
  userList: [],
  chosenPostIt: '',
  postItStyles: [],
  selectedPostIt: '',
  modalType: 'USERNAME_SUBMISSION'
};

export default function reducer (state = initialStates, action) {
  const postItsClone = state.postIts.slice();
  let userListCopy;

  switch (action.type) {
    case ROOM_TITLE:
      return {
        ...state,
        room_title: action.room_title
      };

    case POSTIT_CREATION:
      postItsClone[action.id] = {
        postit_id: action.id,
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
        isModalOpened: false,
      };

    case USER_PARTICIPATION:
      userListCopy = action.userList.slice();

      return {
        ...state,
        userList: userListCopy
      };

    case USER_DISCONNECTION:
      userListCopy = state.userList.slice();

      state.userList.forEach((user, index) => {
        if (user === action.disconnectedUserName) {
          userListCopy.splice(index, 1);
        }
      });

      return {
        ...state,
        userList: userListCopy
      };

    case BRINGING_ROOM_INFOS:
      const prevLatestPostItId = action.postIts.reduce((acc, item) => {
        if(item.postit_id >= acc) {
          return item.postit_id;
        } else {
          return acc;
        }
      }, 0);

      if (action.postIts.length) {
        return {
          ...state,
          postIts: action.postIts,
          room_title: action.title,
          postItStyles: action.postItStyles,
          latestPostItId: prevLatestPostItId + 1
        };
      } else {
        return {
          ...state,
          room_title: action.title
        };
      }

    case POSTIT_SELECTION:
      return {
        ...state,
        selectedPostItId: action.postItId
      };

    case POSTIT_STYLE:
      const { postItId, prevStyles, styleOption, detail } = action;
      let modifiedStyle;
      let prevStylesCopy;
      let styleObjInArrCopy;

      if (!prevStyles[postItId]) {
        prevStyles[postItId] = { postit_id: postItId };
      }
      styleObjInArrCopy = _.cloneDeep(prevStyles[postItId]);

      switch(styleOption) {
        case 'fontSize':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            fontSize: detail
          });
          prevStyles[postItId] = modifiedStyle;
          prevStylesCopy = prevStyles.slice();

          return {
            ...state,
            postItStyles: prevStylesCopy
          };
        case 'color':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            color: detail
          });
          prevStyles[postItId] = modifiedStyle;
          prevStylesCopy = prevStyles.slice();

          return {
            ...state,
            postItStyles: prevStylesCopy
          };

        case 'backgroundColor':
          if (
            detail === '#697689'
            || detail === '#555555'
          ) {
            modifiedStyle = Object.assign(styleObjInArrCopy, {
              backgroundColor: detail,
              color: 'white'
            });
          } else {
            modifiedStyle = Object.assign(styleObjInArrCopy, {
              backgroundColor: detail,
              color: 'black'
            });
          }
          prevStyles[postItId] = modifiedStyle;
          prevStylesCopy = prevStyles.slice();

          return {
            ...state,
            postItStyles: prevStylesCopy
          };

        case 'boxSize':
          modifiedStyle = Object.assign(styleObjInArrCopy, {
            width: detail.width,
            height: detail.height
          });
          prevStyles[postItId] = modifiedStyle;
          prevStylesCopy = prevStyles.slice();

          return {
            ...state,
            postItStyles: prevStylesCopy
          };
      }

      case PICTURE_SUBMISSION_FORM:
        return {
          ...state,
          modalType: action.modalType,
          isModalOpened: action.isModalOpened
        };

      case PICTURE_SUBMISSION:
        postItsClone[action.selectedPostItId].image = action.imageUrl;

        return {
          ...state,
          isModalOpened: action.isModalOpened,
          postIts: postItsClone,
        };

    default:
      return state;
  }
}
