import React, { Component } from 'react'
import './App.css'

class GoogleMaps extends Component {
  loadGoogleMapsAPI() { //Loads the Google Maps API
    if (!this.googleMapsAPI) { //Checks if Google Maps API does not already exsist
      this.googleMapsAPI = new Promise((resolve) => { //Resolves and creates the Google Maps API
        window.initializeGoogleMap = () => { //Creates function to initiralize the map
          resolve(window.google)
          delete window.initializeGoogleMap
        }
        //Creates script to initialize the map once Google Maps API is loaded.
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.APIKey}&callback=initializeGoogleMap`
        script.async = true
        document.body.appendChild(script)
      })
    }
    return this.googleMapsAPI
  }

  componentWillMount() {
    //Prepares Google Maps API for use before Mounting component
    this.loadGoogleMapsAPI()
  }

  componentDidMount() {
    //Creates map object for use once component Mounts
    this.loadGoogleMapsAPI().then((google) => {
      const neighborhood = 'Gresham, OR'
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'address': neighborhood
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const mapOptions = {
            zoom: 12,
            center: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
          }
          const map = new google.maps.Map(
            document.getElementById('map'), mapOptions)
          return map
        }
      })
    })
  }

  render() {
    return (
        <div id="map"></div>
    )
  }
}

export default GoogleMaps