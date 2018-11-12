import React, { Component } from 'react'
import './App.css'

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="button">Close</div>
        <div className="menu-scroll">
          {
            this.props.results.map((place) => (
              <div key={place.id}>
                {place.name}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default Menu