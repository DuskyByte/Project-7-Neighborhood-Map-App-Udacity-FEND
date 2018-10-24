import React, { Component } from 'react'
import './App.css'

class GoogleMaps extends Component {
  getGoogleMapsAPI() {
    if (!this.googleMapsAPI) {
      this.googleMapsAPI = new Promise((resolve) => {
        window.loadGoogleMap = () => {
          resolve(window.google)
          delete window.loadGoogleMap
        }
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.APIKey}&callback=loadGoogleMap`
        script.async = true
        document.body.appendChild(script)
      })
    }
    return this.googleMapsAPI
  }

  componentWillMount() {
    this.getGoogleMapsAPI()
  }

  componentDidMount() {
    this.getGoogleMapsAPI().then((google) => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45.5108876, lng: -122.5028639},
        zoom: 12
      })
      return map
    })
  }

  render() {
    return (
        <div id="map"></div>
    )
  }
}

export default GoogleMaps