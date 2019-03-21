import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component{

  stopBubbling(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div className='footerWrapper' onDoubleClick={this.stopBubbling.bind(this)}>
        <div className='menu edge'>저장</div>
        <div className='menu'>초대</div>
      </div>
    );
  }
}
