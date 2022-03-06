import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Folders extends Component {

  state = {
    folderNames: [],
    foldersLimit: 10
  }

  constructor(props:any) {
    super(props);
  }

  render() {
    let links = this.state.folderNames.map(name => <div key={name}>📁<Link to={"/images/" + name}>{name}</Link></div>)
    return (
      <div>
        <h1>Folder Viewer</h1> 
        {links}
        
        {this.state.folderNames.length != 0 && 
        <div className='folders-limit'>
          Display first 
          <input 
            type="number" 
            value={this.state.foldersLimit} 
            onChange={e=>{if(e.target.value as unknown as number > 0) this.setState({foldersLimit: e.target.value})}} 
            onKeyPress={e=>{if(e.which == 13) this.fetchFolderNames()}} /> 
          folders
        </div>}

        {this.state.folderNames.length == 0 && 
        <div>Loading...</div>}
      </div>
    )
  }

  componentDidMount() {
    this.fetchFolderNames();
  }

  fetchFolderNames() {
    this.setState({folderNames: []});
    fetch(`/Main/Folders?folders_limit=${this.state.foldersLimit}`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(json => {
        this.setState({folderNames: json})
      })
      .catch(err => console.log(err));
  }

}
