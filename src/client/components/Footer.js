import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component{

  render() {
    return (
      <div className='footerWrapper'>
        <div className='menu edge'>저장</div>
        <div className='menu'>초대</div>
      </div>
    );
  }
}
