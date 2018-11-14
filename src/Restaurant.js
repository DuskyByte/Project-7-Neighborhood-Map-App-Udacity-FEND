import React, { Component } from 'react'
import './App.css'

class Restaurant extends Component {
  render() {
    return (
      <div className="Restaurant">
        {this.props.name}
      </div>
    )
  }
}

export default Restaurant