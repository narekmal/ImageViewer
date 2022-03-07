import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import SelectedImage from './SelectedImage';
import Constants from '../Constants';

class Images extends Component {

  state = {
    imageInfo: null as unknown as Array<any>,
    selectedImage: null as any
  }

  folder: string

  constructor(props:any) {
    super(props);
    this.folder = props.params.folder;
  }

  render() {
    let links = this.state.imageInfo ? this.state.imageInfo.map(info => 
      <div key={info.item1}>
        <span className='image-icon'>🖼</span><a 
            href=""
            onClick={e=>{this.setState({selectedImage: {name: info.item1, width: info.item2, height: info.item3}}); e.preventDefault();}}
            >
            {info.item1} {this.getDimensionsString(info.item2, info.item3)}
          </a>
      </div>) : [];

    return (
      <div>
        <Link to="/">Back to Folders</Link>
        <h1>Image Viewer</h1> 
        {links}
        <SelectedImage 
          folder={this.folder}
          name={this.state.selectedImage ? this.state.selectedImage.name : null} 
          width={this.state.selectedImage ? this.state.selectedImage.width : null} 
          height={this.state.selectedImage ? this.state.selectedImage.height : null} 
        />
        {!this.state.imageInfo && 
        <div>Loading...</div>}
      </div>
    )
  }

  componentDidMount() {
    this.fetchImageInfo();
  }

  fetchImageInfo() {
    this.setState({imageInfo: []});
    fetch(`/Main/Images?${Constants.FolderQueryParam}=${this.folder}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(json => {
        this.setState({imageInfo: json});
  })
      .catch(err => console.log(err));
  }

  getDimensionsString(width: string, height: string) {
    if (width == "-1")
      return "";
    return `(${width}x${height})`;
  }
}

export default (props:any) => (
  <Images
      {...props}
      params={useParams()}
  />
);