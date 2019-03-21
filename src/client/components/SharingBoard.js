import React, { Component } from 'react';
import './SharingBoard.scss';
import DecorationMenu from './DecorationMenu'
import Footer from './Footer.js';
import PostIt from './PostIt.js';

export default class SharingBoard extends Component{
  constructor(props) {
    super(props);

    this.renderPostIts = this.renderPostIts.bind(this);
  }

  renderPostIts() {
    const {
      postIts,
      setStateOfPostItValue,
      setStateOfPostItLocation,
      deletePostIt
    } = this.props;

    return (
      Object.keys(postIts).map(id => {
        return (
          <PostIt
            key={id}
            postItId={id}
            postItInfo={postIts[id]}
            setStateOfPostItValue={setStateOfPostItValue}
            setStateOfPostItLocation={setStateOfPostItLocation}
            deletePostIt={deletePostIt}
          />
        );
      })
    );
  }

  render() {
    const { makePostIt, latestPostItId } = this.props;

    return (
      <div className='boardWrapper' onDoubleClick={makePostIt.bind(null, latestPostItId)}>
        <div className="logo">
          <div className="upperText">BRAIN</div>
          <div>STORM</div>
          <i className="far fa-lightbulb bulb"></i>
        </div>
        {
          Object.keys(this.props.postIts).length
            ? this.renderPostIts()
            : null
        }
        <DecorationMenu />
        <Footer />
      </div>
    );
  }
}
