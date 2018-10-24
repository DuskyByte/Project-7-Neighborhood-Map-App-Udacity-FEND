import React, { Component } from 'react'
import GoogleMaps from './GoogleMaps.js'
import './App.css'

const APIKey = 'AIzaSyCWZIi6c-usMI7VtXVz_oo17ru-498r3IM'

class App extends Component {
  render() {
    return (
      <div className="App">
        <GoogleMaps APIKey={APIKey} />
      </div>
    )
  }
}

export default App