import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Folders extends Component {

  state = {
    folderNames: [],
    folderLimit: 10
  }

  constructor(props:any) {
    super(props);
    this.fetchFolderNames();
  }

  render() {
    let links = this.state.folderNames.map(name => <div key={name}>📁<Link to={"/images/" + name}>{name}</Link></div>)
    return (
      <div>
        <h1>Folder Viewer</h1> 
        {links}
      </div>
    )
  }

  fetchFolderNames() {
    fetch(`/Main/Folders`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({folderNames: json})
      })
      .catch(err => console.log(err));
  }

}
