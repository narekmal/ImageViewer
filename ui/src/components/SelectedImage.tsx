import React, { Component } from "react";

interface IProps {
  folder?: string
  name?: string
  width?: number
  height?: number
}

export default class SelectedImage extends Component<IProps> {

  constructor(props: any) {
    super(props);
    this.imageEl = null;
    this.scale = 1;
  }

  scale: number;
  imageEl: HTMLImageElement | null;

  render() {
    return (
      this.props.name &&
      <div className="selected-image">
        <div className="image-container">
          <div className="image-wrapper">
            <img 
              src={this.constructImageUrl()} 
              onWheel={this.handleWheel.bind(this)} 
              onMouseMove={this.handleMouseMove.bind(this)} 
              ref={el => this.imageEl = el} 
              alt="" />
          </div>
        </div>
        <div>
          <a className="initial-state" href="" onClick={this.handleInitialStateClick.bind(this)}>Initial State</a>
          <a href={this.constructImageUrl()} download>Download</a>
        </div>
      </div>
    );
  }

  constructImageUrl() {
    return `/Main/Image?folder=${this.props.folder}&image=${this.props.name}`;
  }

  handleWheel(e:any) {
    this.scale += e.deltaY * -0.01;

    // Restrict scale
    this.scale = Math.min(Math.max(1, this.scale), 4);

    // Apply scale transform
    e.target.style.transform = `scale(${this.scale})`;
  }

  handleMouseMove(e:any) {
    if (this.scale == 1)
      return;

    if(!this.imageEl || !this.props.width || !this.props.height)
      return;

    var width = this.props.width;
    var height = this.props.height;
    var xShift = e.clientX - this.imageEl.offsetLeft - width/2;
    var yShift = e.clientY - this.imageEl.offsetTop - height/2;
    var outerWidth = width * (this.scale-1);
    var outerHeight = height * (this.scale-1);
    var translateX = Math.min(Math.max(-outerWidth/(2*this.scale), xShift), outerWidth/(2*this.scale));
    var translateY = Math.min(Math.max(-outerHeight/(2*this.scale), yShift), outerHeight/(2*this.scale));

    this.imageEl.style.transform = `scale(${this.scale}) translate(${translateX}px, ${translateY}px)`;
  }

  handleInitialStateClick(e:any) {
    e.preventDefault();
    this.scale = 1;
    if(this.imageEl)
      this.imageEl.style.transform = `scale(${this.scale})`;
  }
}
