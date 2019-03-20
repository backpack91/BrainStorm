import React, { Component } from 'react';
import './SharingBoard.scss';
import DecorationMenu from './DecorationMenu'
import Footer from './Footer.js';
import PostIt from './PostIt.js';

export default class SharingBoard extends Component{
  render() {
    return (
      <div className='boardWrapper' onDoubleClick={}>
        <div className="logo">
          <div className="upperText">BRAIN</div>
          <div>STORM</div>
          <i className="far fa-lightbulb bulb"></i>
        </div>
        <PostIt />
        <PostIt />
        <PostIt />
        <PostIt />
        <Footer />
        <DecorationMenu />
      </div>
    );
  }
}
