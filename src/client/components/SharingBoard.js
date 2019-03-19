import React, { Component } from 'react';
import './SharingBoard.scss';
import DecorationMenu from './DecorationMenu'
import Footer from './Footer.js';

export default class SharingBoard extends Component{

  render() {
    return (
      <div className='boardWrapper'>
        <div className="logo">
          <div className="upperText">BRAIN</div>
          <div>STORM</div>
          <i className="far fa-lightbulb bulb"></i>
        </div>
        <Footer />
        <DecorationMenu />
      </div>
    );
  }
}
