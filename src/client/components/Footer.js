import React, { Component } from 'react';
import './Footer.scss';

export default class Footer extends Component{
  constructor(props) {
    super(props);

    this.copyUrl = this.copyUrl.bind(this);
    this.urlInput = React.createRef();
    this.renderUserIcon = this.renderUserIcon.bind(this);
  }

  renderUserIcon() {
    return this.props.userList.map(user => {
      if (user !== this.props.userName) {
        return  (
          <div className='userIconWrapper'>
            <div className='userName'>
              {user}
            </div>
            <img src='../../../public/imgs/1.png'></img>
          </div>
        );
      } else {
        return  (
          <div className='myAccountIconWrapper'>
            <div className='userName'>
              {user}
            </div>
            <img src='../../../public/imgs/1.png'></img>
            <div className='meTag'>나</div>
          </div>
        );
      }
    });
  }

  copyUrl() {
    const urlInput = this.urlInput.current.select();
    document.execCommand('copy');
  }

  stopBubbling(e) {
    e.stopPropagation();
  }

  renderInvitationUrl() {
    return (
      <div className='urlBoxWrapper'>
        <input
          ref={this.urlInput}
          className='urlBox'
          value={window.location.href}
          select='true'
        />
      <div className='clipBtn' onClick={this.copyUrl}>
          <i className="fas fa-paperclip"></i>
        </div>
      </div>
    );
  }

  render() {
    const {
      urlBoxOpened,
      toggleUrlbox,
      userName,
      userList
    } = this.props;

    return (
      <div className='footerWrapper' onDoubleClick={this.stopBubbling.bind(this)}>
        <div className='menu edge'>저장</div>
        <div className='menu' onClick={toggleUrlbox}>초대</div>
        <div className={urlBoxOpened ? 'urlBoxWrapper' : 'urlBoxWrapperHidden'}>
          <input
            ref={this.urlInput}
            className='urlBox'
            value={window.location.href}
            select='true'
          />
          <div className='clipBtn' onClick={this.copyUrl}>
            <i className="fas fa-paperclip"></i>
          </div>
        </div>
        <div className='users'>
          {this.renderUserIcon()}
        </div>
      </div>
    );
  }
}
