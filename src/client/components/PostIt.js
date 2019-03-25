import React, { Component } from 'react';
import './PostIt.scss';
import Textarea from 'react-textarea-autosize';

export default class Postit extends Component{
  constructor(props) {
    super(props);

    this.postIt = React.createRef();
  }

  componentDidMount() {
    this.dragElement(this.postIt.current);
  }

  dragElement(ele) {
    const that = this;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (ele.children[0].classList[0] === `${ele.classList[0]}Header`) {
      ele.children[0].onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      e = e || window.event;
      e.preventDefault();
      pos3 = clientX;
      pos4 = clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;
      ele.style.top = (ele.offsetTop - pos2) + "px";
      ele.style.left = (ele.offsetLeft - pos1) + "px";


      const left = ele.offsetLeft - pos1;
      const top = ele.offsetTop - pos2;
      that.props.setStateOfPostItLocation(that.props.postItId, left, top, that.props.postItInfo, that.props.roomTitle);
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  consoled(e) {
    const width = e.target.style.width;
    const height = e.target.style.height;
    console.log('width', width);
    console.log('height', height);
  }

  stopBubbling(e) {
    e.stopPropagation();
  }

  render() {
    const {
      setStateOfPostItValue,
      postItId,
      deletePostIt,
      postItInfo,
      roomTitle,
    } = this.props;
    const location = {
      left: `${postItInfo.left}px`,
      top: `${postItInfo.top}px`
    };

    return (
      <div
        ref={this.postIt}
        className='postIt'
        onDoubleClick={this.stopBubbling.bind(this)}
        style={location}
      >
        <div className="postItHeader">
          <i className="fas fa-times" onClick={deletePostIt.bind(this, postItId)}></i>
        </div>
        <Textarea
          onChange={setStateOfPostItValue.bind(this, postItId, roomTitle, postItInfo)}
          value={postItInfo.value}
          onMouseUp={this.consoled.bind(this)}
        />
      </div>
    );
  }
}
