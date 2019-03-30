import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import  SharingBoard from '../../components/SharingBoard.js';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

function setup(modalStatus, modalType, urlBoxStatus) {
  const props = {
    makePostIt: jest.fn(),
    postIts: [
      {
        postit_id: 0,
        left: '45px',
        top: '45px',
        value: '바코 짱짱!!',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQocSwYBxdQk2TyAIMjTMj1MLiZr6tMKmzwAVc6h4wBdoCFpLfGgw'
      }
    ],
    setStateOfPostItValue: jest.fn(),
    setStateOfPostItLocation: jest.fn(),
    deletePostIt: jest.fn(),
    selectPostIt: jest.fn(),
    postItStyles: [
      {
        postit_id: 0,
        width: '20px',
        height: '20px',
        color: 'yellow',
        backgroundColor: 'black',
        fontSize: '1.5rem'
      }
    ],
    editPostItStyle: jest.fn(),
    latestPostItId: '0',
    toggleUrlbox: jest.fn(),
    urlBoxOpened: urlBoxStatus,
    isModalOpened: modalStatus,
    toggleModal: jest.fn(),
    joinRoom: jest.fn(),
    userName: '종렬',
    userList: ['종렬', '황녀', '민비', '엘사'],
    selectedPostItId: 0,
    openPictureSubmissionFormModal: jest.fn(),
    modalType,
    submitPicture: jest.fn(),
    match: {
      params: {
        room_id: 'vacos'
      }
    },
    getRoomInfos: jest.fn()
  };

  const component = shallow(
    <SharingBoard {...props} />
  );

  return  {
    props,
    component
  };
}

describe('component render check', () => {
  it('should render component normally', () => {
    const { component } = setup(false, 'USERNAME_SUBMISSION', false);

    expect(component.exists()).toBe(true);
  });

  it('should render component normally with userNameSubmission modal', () => {
    const { component } = setup(true, 'USERNAME_SUBMISSION', false);

    expect(component.exists()).toBe(true);
  });

  it('should render component normally with pictureSubmission modal', () => {
    const { component } = setup(true, 'PICTURE_SUBMISSION_FORM', false);

    expect(component.exists()).toBe(true);
  });

  it('should render component normally without modal', () => {
    const { component } = setup(false, '', true);

    expect(component.exists()).toBe(true);
  });
});

describe('check that events work normally', () => {
  it('when user dbClick on board makePostIt function should works', () => {
    const { component, props } = setup(false, 'USERNAME_SUBMISSION', false);

    expect(component.find('.boardWrapper')).toHaveLength(1);
    component.find('.boardWrapper').simulate('doubleClick');
    expect(props.makePostIt).toHaveBeenCalled();
  });

  it('onChange Event of nameSubmissionForm should make change on state', () => {
    const { component, props } = setup(true, 'USERNAME_SUBMISSION', false);

    component.find('.formBody input').simulate('change', { target: { value: 'foo'}});
    expect(component.state().user_name).toBe('foo');
  });

  it('onChange Event of nameSubmissionForm should make change on state', () => {
    const { component, props } = setup(true, 'USERNAME_SUBMISSION', false);

    component.find('.formBody button').simulate('click');
    expect(props.makePostIt).toHaveBeenCalled();
  });
});
