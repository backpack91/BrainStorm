import React, { Component } from 'react';
import './DecorationMenu.scss';

class DecorationMenu extends Component {

  render() {
    return (
      <div className='decorationMenuWrapper'>
        <h2>
          palette
        </h2>
        <div className='fontSizeController palleteSection'>
          <h3>Font size</h3>
        </div>
        <div className='colorController palleteSection'>
          <h3>Color</h3>
        </div>
        <div className='contentsAttachMentController palleteSection'>
          <h3>Contents</h3>
        </div>
      </div>
    );
  }
}

export default DecorationMenu;
