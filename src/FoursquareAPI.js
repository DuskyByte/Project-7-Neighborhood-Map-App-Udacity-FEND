import React, { Component } from 'react'
import './App.css'

const clientID = 'ZGJ5SQRR42YC2WYU3A5FKXTTVR0VBVEAUKEYAVZ5Q4D0GW0Z'
const clientSecret = 'LXJSZQP0J0EWB1FRMVHKQLCAJYXG421ZAJL4X4DETCH2QLQV'

class FoursquareAPI extends Component {
  state = {
    venue: this.props.place,
    venueRating: 'loading...'
  }

  componentWillMount() {
    const that = this
    if (this.state.venue !== this.props.place || this.state.venueRating === 'loading...') {
      fetch('https://api.foursquare.com/v2/venues/explore'+
        '?client_id='+clientID+
        '&client_secret='+clientSecret+
        '&v=20181120'+
        '&ll='+
        this.props.place.geometry.location.lat()+
        ','+
        this.props.place.geometry.location.lng()+
        '&radius=15')
      .then(function(response) {
        if (response.ok) {
          response.json().then(data => 
            data.response.groups[0].items.length < 1 ?//Tests if venue was found
            that.setState({venueRating: 'n/a'}) ://Sets rating to n/a if not found
            fetch('https://api.foursquare.com/v2/venues/'+//Pulls venue if found
              data.response.groups[0].items[0].venue.id+
              '?client_id='+clientID+
              '&client_secret='+clientSecret+
              '&v=20181120'
            ).then(function(response) {
            if (response.ok) {
              response.json().then(data => that.setState({venueRating: data.response.venue.rating}))//Set to foursquare rating when loaded
            }
          }))
        }
      })
      this.setState({venue: this.props.place})
    }
  }

  render() {
    return (
      <div className="Foursquare">Rating on Foursquare: {this.state.venueRating}</div>
    )
  }
}

export default FoursquareAPI