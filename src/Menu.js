import React, { Component } from 'react'
import './App.css'

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="button">Close</div>
        <div className="drop-down">
          Filter: <select>
            <option value="all">All</option>
            <option value="open">Currently Open</option>
          </select>
        </div>
        <div className="menu-scroll">
          {
            this.props.results.map((place) => (
              <div key={place.id} className="place">
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