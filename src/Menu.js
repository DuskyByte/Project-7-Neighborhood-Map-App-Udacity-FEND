import React, { Component } from 'react'
import './App.css'

class Menu extends Component {
  state = {
    filteredResults: this.props.results
  }

  changeMarkers(value) {
    if (value === 'all') {
      this.setState({
        filteredResults: this.props.results
      }, () => this.props.markers.map(marker => marker.setMap(this.props.map)))
      
    }
    if (value === 'open') {
      this.setState({
        filteredResults: this.state.filteredResults.filter((place) => place.opening_hours.open_now)
      }, () => this.props.markers.map(marker => (this.state.filteredResults.some(result => result.name === marker.title)) ? marker.setMap(this.props.map) : marker.setMap(null)))
    }
  }

  render() {
    return (
      <div className="Menu">
        <div className="button">Close</div>
        <div className="drop-down">
          Filter: <select
              defaultValue='all'
              onChange={(event) => this.changeMarkers(event.target.value)}
            >
            <option value="all">All</option>
            <option value="open">Currently Open</option>
          </select>
        </div>
        <div className="menu-scroll">
          {
            this.state.filteredResults.map((place) => (
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