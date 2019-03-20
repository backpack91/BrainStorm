import React, { Component } from 'react';
import './PostIt.scss';

export default class Postit extends Component{
  constructor(props) {
    super(props);
    
    this.postIt = React.createRef();
  }

  componentDidMount() {
    this.dragElement(this.postIt.current);
  }

  dragElement(ele) {
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
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  render() {
    return (
      <div ref={this.postIt} className="postIt">
        <div className="postItHeader">
          <i className="fas fa-times"></i>
        </div>
        <textarea />
      </div>
    );
  }
}
