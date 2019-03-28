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
    const {
      editPostItStyle,
      selectedPostItId,
      postItStyles
    } = this.props;

    this.setState({ background: color.hex });
    editPostItStyle(selectedPostItId, postItStyles, 'backgroundColor', color.hex);
  };

  render() {
    const {
      editPostItStyle,
      selectedPostItId,
      postItStyles,
      openPictureSubmissionFormModal
    } = this.props;

    return (
      <div className='decorationMenuWrapper' onDoubleClick={this.stopBubbling}>
        <h2>
          palette
        </h2>
        <div className='fontSizeController palleteSection'>
          <h3>Font size</h3>
          <div className="sizeBtnWrapper">
            <div
              className="sizeBtn size_1"
              onClick={editPostItStyle.bind(this, selectedPostItId, postItStyles, 'fontSize', '1rem')}
            >a</div>
            <div
              className="sizeBtn size_2"
              onClick={editPostItStyle.bind(this, selectedPostItId, postItStyles, 'fontSize', '1.8rem')}
            >a</div>
            <div
              className="sizeBtn size_3"
              onClick={editPostItStyle.bind(this, selectedPostItId, postItStyles, 'fontSize', '2.5rem')}
            >a</div>
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
            <div
              className="iconWrapper"
              onClick={openPictureSubmissionFormModal}
            >
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
