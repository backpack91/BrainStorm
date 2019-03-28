import React, { Component } from 'react';
import './SharingBoard.scss';
import DecorationMenu from './DecorationMenu'
import Footer from './Footer.js';
import PostIt from './PostIt.js';
import Modal from './Modal.js';
import PictureSubmissionForm from './pictureSubmissionForm.js';

export default class SharingBoard extends Component{
  constructor(props) {
    super(props);

    this.state = {
      user_name: ''
    }
    this.getUserName = this.getUserName.bind(this);
    this.renderPostIts = this.renderPostIts.bind(this);
  }

  componentDidMount() {
    this.props.toggleModal();
    this.props.getRoomInfos(this.props.match.params.room_id);
  }

  renderPostIts() {
    const {
      postIts,
      setStateOfPostItValue,
      setStateOfPostItLocation,
      deletePostIt,
      selectPostIt,
      postItStyles,
      editPostItStyle
    } = this.props;

    return (
      postIts.map((postItInfo, index) => {
        return (
          <PostIt
            key={index}
            postItId={index}
            postItInfo={postItInfo}
            setStateOfPostItValue={setStateOfPostItValue}
            setStateOfPostItLocation={setStateOfPostItLocation}
            deletePostIt={deletePostIt}
            roomTitle={this.props.match.params.room_id}
            selectPostIt={selectPostIt}
            postItStyles={postItStyles}
            editPostItStyle={editPostItStyle}
          />
        )
      })
    );
  }

  getUserName(e) {
    const value = e.target.value;
    this.setState(state => ({
      user_name: value
    }));
  }

  render() {
    const {
      makePostIt,
      latestPostItId,
      toggleUrlbox,
      urlBoxOpened,
      isModalOpened,
      toggleModal,
      joinRoom,
      userName,
      userList,
      postIts,
      editPostItStyle,
      selectedPostItId,
      postItStyles,
      openPictureSubmissionFormModal,
      modalType,
      submitPicture
    } = this.props;

    return (
      <div className='boardWrapper' onDoubleClick={makePostIt.bind(null, latestPostItId, this.props.match.params.room_id)}>
        <div className="logo">
          <div className="upperText">BRAIN</div>
          <div>STORM</div>
          <i className="far fa-lightbulb bulb"></i>
        </div>
        {
          postIts.length
            ? this.renderPostIts()
            : null
        }
        <DecorationMenu
          editPostItStyle={editPostItStyle}
          selectedPostItId={selectedPostItId}
          postItStyles={postItStyles}
          openPictureSubmissionFormModal={openPictureSubmissionFormModal}
        />
        <Footer
          toggleUrlbox={toggleUrlbox}
          urlBoxOpened={urlBoxOpened}
          userName={userName}
          userList={userList}
        />
        {
          isModalOpened
          ? (
            <Modal toggleModal={toggleModal}>
              {modalType === 'USERNAME_SUBMISSION'
                ? (
                  <div className='nameSubmissionForm'>
                    <div className='formBody'>
                      <div></div>
                      <input placeholder='your name' onChange={this.getUserName}></input>
                      <button onClick={joinRoom.bind(null, this.props.match.params.room_id, this.state.user_name)}>submit</button>
                    </div>
                  </div>
                )
                : null
              }
              {modalType === 'PICTURE_SUBMISSION_FORM'
                ? (
                    <div className='pictureSubmissionForm'>
                      <div className='formBody'>
                        <PictureSubmissionForm
                          roomTitle={this.props.match.params.room_id}
                          selectedPostItId={selectedPostItId}
                          submitPicture={submitPicture}
                          postIts={postIts}
                        />
                      </div>
                    </div>
                )
                : null
              }
            </Modal>
          )
          : null
        }
      </div>
    );
  }
}
