import React, { Component } from 'react';
import './Home.scss';
import {Link} from 'react-router-dom';

export default class Home extends Component{

  render() {
    const {
      roomTitle,
      getRoomTitle,
      createNewRoom
    } = this.props;

    return (
      <div className='home'>
        <div className='homeContentsWrapper'>
          <div className='homeTitleWrapper'>
            <div className='title title_1'>BRAIN</div>
            <div className='title title_2'>STORM</div>
          </div>
          <div className='roomUrlWrapper'>
            <div className='roomUrl'>
              <span>www.brainstorm.com/</span>
              <input placeholder='your room name' onChange={getRoomTitle}></input>
            </div>
          </div>
          <div className='createBtnWrapper'>
            <div className='button' onClick={createNewRoom.bind(this, roomTitle)}>
              Create!
            </div>
          </div>
          <i className="far fa-lightbulb bulb"></i>
        </div>
      </div>
    );
  }
}
