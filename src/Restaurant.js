import React, { Component } from 'react'
import './App.css'

class Restaurant extends Component {
  render() {
    return (
      <div className="Restaurant">
      	<img className="restaurant-image" src={this.props.photo} alt="This" />
        <p className="restaurant-name">{this.props.name}</p>
        <p className="restaurant-address">{this.props.vicinity}</p>
        <p className="restaurant-open">Currently Open: {this.props.open_now ? '✔️' : '❌'}</p>
      </div>
    )
  }
}

export default Restaurant