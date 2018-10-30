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
        //Creates script on to initialize the map once Google Maps API is loaded.
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.props.APIKey}&libraries=places&callback=initializeGoogleMap`
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
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({
        'address': this.props.neighborhood
      }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          const mapOptions = {
            zoom: 14,
            center: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng())
          }
          const map = new google.maps.Map(
            document.getElementById('map'), mapOptions)
          const rectangle = new google.maps.Rectangle({
            strokeColor: '#000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            map: map,
            bounds: {
              north: results[0].geometry.bounds.l.j,
              south: results[0].geometry.bounds.l.l,
              east: results[0].geometry.bounds.j.l,
              west: results[0].geometry.bounds.j.j
            }
          })
          const placeService = new google.maps.places.PlacesService(map)
          placeService.nearbySearch({
            location: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),         
            radius: 2000,
            types: ['bar']
          }, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach(function (place) {
                let marker = new google.maps.Marker({
                  position: place.geometry.location,
                  icon: {
                    url: place.icon,
                    scaledSize: new google.maps.Size(24,24)
                  },
                  title: place.name,
                  map: map
                })
                return marker
              })
            }
          })
          return rectangle
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