import React, { Component } from 'react'
import './App.css'

//Keys for Foursquare API
const clientID = 'WPFVG1B1UG5PZR5GGK0YYJOJD3PXUOL0JTRXZSLVPT2BGU2D'
const clientSecret = '201KRIC0NNUE24QYCUGFY0MFNJAI3BQPONZ5HMMMIO12BCGX'

class FoursquareAPI extends Component {
  state = {
    venue: this.props.place,
    venueRating: 'loading...'
  }

  componentWillMount() {
    const that = this
    if (this.state.venueRating === 'loading...') {
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