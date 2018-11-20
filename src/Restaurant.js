import React, { Component } from 'react'
import FoursquareAPI from './FoursquareAPI.js'
import './App.css'

class Restaurant extends Component {
  render() {
    return (
      <div className="Restaurant">
      	<img className="restaurant-image" src={this.props.place.photos[0].getUrl()} alt="This" />
        <p className="restaurant-name">{this.props.place.name}</p>
        <p className="restaurant-address">{this.props.place.vicinity}</p>
        <p className="restaurant-open">Currently Open: {this.props.place.opening_hours.open_now ? '✔️' : '❌'}</p>
        <div className="foursquare-rating"><FoursquareAPI place={this.props.place} /></div>
      </div>
    )
  }
}

export default Restaurant