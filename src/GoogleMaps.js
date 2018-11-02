import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
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
            zoom: 15,
            center: results[0].geometry.location,
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                {
                  "color": "#778877"
                }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                  "gamma": 0.01
                },
                {
                  "lightness": 20
                }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                  "saturation": -31
                },
                {
                  "lightness": -33
                },
                {
                  "weight": 2
                },
                {
                  "gamma": 0.8
                }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                {
                  "visibility": "off"
                }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                {
                  "lightness": 75
                },
                {
                  "saturation": 30
                }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                  "saturation": 20
                }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                {
                  "lightness": 20
                },
                {
                  "saturation": -20
                }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                  "lightness": 10
                },
                {
                  "saturation": -30
                }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                  "saturation": 25
                },
                {
                  "lightness": 25
                }
                ]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                {
                  "lightness": -20
                }
                ]
              }
            ],
            disableDefaultUI: true,
            gestureHandling: "none"
          }
          const map = new google.maps.Map(
            document.getElementById('map'), mapOptions)
          const placeService = new google.maps.places.PlacesService(map)
          placeService.nearbySearch({
            bounds: results[0].geometry.bounds,
            types: ['restaurant']
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
          const controlUI = document.createElement('div')
          controlUI.style.backgroundColor = '#fff'
          controlUI.style.border = '2px solid #fff'
          controlUI.style.marginBottom = '22px'
          controlUI.style.textAlign = 'center'
          controlUI.title = 'Click to show/hide menu'
          const controlText = document.createElement('div')
          controlText.style.color = '#222'
          controlText.style.fontSize = '16px'
          controlText.style.lineHeight = '38px'
          controlText.style.cursor = 'pointer'
          controlText.style.paddingLeft = '5px'
          controlText.style.paddingRight = '5px'
          controlText.innerHTML = 'Menu'
          controlUI.appendChild(controlText)
          map.controls[google.maps.ControlPosition.LEFT_TOP].push(controlUI)
          controlUI.addEventListener('click', function() {
            ReactDOM.render(<Menu/>, controlText)
          })
        }
      })
    })
}

render() {
  return (
    <div id="map">
    </div>
    )
}
}

export default GoogleMaps