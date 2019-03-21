import React, { Component } from 'react';
import { BlockPicker } from 'react-color';
import './DecorationMenu.scss';

class DecorationMenu extends Component {
  constructor() {
    super();
    this.state = {
      background: '#fff',
    };

    this.stopBubbling = this.stopBubbling.bind(this);
  }

  stopBubbling(e) {
    e.stopPropagation();
  }

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <div className='decorationMenuWrapper' onDoubleClick={this.stopBubbling}>
        <h2>
          palette
        </h2>
        <div className='fontSizeController palleteSection'>
          <h3>Font size</h3>
          <div className="sizeBtnWrapper">
            <div className="sizeBtn size_1">a</div>
            <div className="sizeBtn size_2">a</div>
            <div className="sizeBtn size_3">a</div>
          </div>
        </div>
        <div className='colorController palleteSection'>
          <h3>Color</h3>
          <BlockPicker
            color={this.state.background}
            onChangeComplete={this.handleChangeComplete}
            triangle="hide"
          />
        </div>
        <div className='contentsAttachMentController palleteSection'>
          <h3>Contents</h3>
          <div className="iconsWrapper">
            <div className="iconWrapper">
              <i className="fas fa-stamp"></i>
            </div>
            <div className="iconWrapper">
              <i className="far fa-image"></i>
            </div>
            <div className="iconWrapper">
              <i className="far fa-file-video"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DecorationMenu;
