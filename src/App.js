import React, { Component } from 'react'
import GoogleMapsAPI from './GoogleMapsAPI.js'
import './App.css'

const APIKey = 'AIzaSyCWZIi6c-usMI7VtXVz_oo17ru-498r3IM'
const neighborhood = 'Rockwood, Gresham, OR' //Customize your neighborhood

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMapsAPI
          APIKey={APIKey}
          neighborhood={neighborhood}
        />
      </div>
    )
  }
}

export default App