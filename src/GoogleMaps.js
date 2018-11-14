import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Menu from './Menu.js'
import Restaurant from './Restaurant.js'
import './App.css'

let restaurantResults
let markers = []

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
            styles: [ //Custom style for map
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

          //Attaches map
          const map = new google.maps.Map(
            document.getElementById('map'), mapOptions
          )

          //Creates Infowindows
          const largeInfowindow = new google.maps.InfoWindow()

          //Searches for nearby restaurants
          const placeService = new google.maps.places.PlacesService(map)
          placeService.nearbySearch({
            bounds: results[0].geometry.bounds,
            types: ['restaurant']
          }, function (results, status) {
            restaurantResults = results

            //Places results on map
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              results.forEach(place => {
                let marker = new google.maps.Marker({
                  position: place.geometry.location,
                  icon: {
                    url: place.icon,
                    scaledSize: new google.maps.Size(24,24)
                  },
                  title: place.name,
                  map: map
                })
                markers.push(marker)
                marker.addListener('click', function () {
                  fillInfowindow(this, largeInfowindow)
                })
                return marker
              })
            }
          })

          //Fills the Infowindow with infomation
          function fillInfowindow(marker, infowindow) {
            if (infowindow.marker !== marker) {
              infowindow.marker = marker
              const window = document.createElement('div')
              infowindow.setContent(window)
              let place = restaurantResults[markers.findIndex(index => index === marker)]
              ReactDOM.render(
                <Restaurant
                  photo={place.photos[0].getUrl()}
                  name={place.name}
                  vicinity={place.vicinity}
                  open_now={place.opening_hours.open_now}
                />,
              window)
              map.panTo(marker.position)
              infowindow.open(map, marker)
              infowindow.addListener('closeclick', function() {
                map.panTo(results[0].geometry.location)
                infowindow.close()
              })
            }
          }

          //Creates custom UI menu on map
          const controlUI = document.createElement('div')
          controlUI.innerHTML = 'Menu'
          controlUI.classList.add('menu')
          map.controls[google.maps.ControlPosition.LEFT_TOP].push(controlUI)
          let showMenu = false;
          controlUI.addEventListener('click', function(event) {
            //Test if menu is open and responds accordingly
            if (showMenu) {
              if (event.target === document.getElementsByClassName('button')[0]) {
                showMenu = false
                ReactDOM.unmountComponentAtNode(controlUI)
                controlUI.innerHTML = 'Menu'
              } else if (event.target.parentNode === document.getElementsByClassName('menu-scroll')[0]) {
                let index = restaurantResults.findIndex(index => index.name === event.target.innerHTML)
                fillInfowindow(markers[index], largeInfowindow)
              }
            } else {
              showMenu = true
              ReactDOM.render(<Menu results={restaurantResults} />, controlUI)
            }
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