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
  }

  render() {
    return (
      <div className="selected-image">
        <img src={`/Main/Image?folder=${this.props.folder}&image=${this.props.name}`} alt="" />
        <div>
          <a>Initial State</a>
          <a download>Download</a>
        </div>
      </div>
    );
  }
}
