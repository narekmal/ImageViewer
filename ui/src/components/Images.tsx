import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom';

export default class Images extends Component {
  render() {
    return (
      <div>Images<Link to="/">Back to Folders</Link></div>
    )
  }
}
