import React, { Component } from 'react';
import './App.css';
import Form from './Form'
import Result from './Result'

const APIKeyToClick = "7bf765fd63f436c8dd045057a3af0071"

class App extends Component {

    state = {
      value: "",
      date: "",
      city: "",
      sunrise: "",
      sunset: "",
      temp: "",
      pressure: "",
      wind: "",
      err: false
    }
    
    handleInputChange = (e) => {
      this.setState({
        value: e.target.value
      })
    }

    handleCitySubmit = e => {
      e.preventDefault()
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKeyToClick}&units=metric`;

    fetch(API)
      .then(response => {
        if(response.ok) {
          return response.json()
        }
        throw Error("Cos poszło nie tak")
      })
      
      .then(data => {
        const dateAndTime = new Date().toLocaleDateString()
        this.setState({
          err: false,
          date: dateAndTime,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          city: this.state.value
        })
      })
      .catch(err => {
        this.setState({
          err: true,
          city: this.state.value
        })
      })
    }

    handleOnLoad = () => {
      fetch("https://api.ipgeolocation.io/ipgeo?apiKey=89946874674d4429ab2ef68cc0ed2063&ip=178.235.147.83")
        .then(response => {
          if(response.ok) {
            return response.json()
          }
          throw Error("Cos poszło nie tak")
        })
        .then(data => {
          console.log(data);
      
          this.setState({
            city: data.city
            })
          })
      }

  render() {
    // this.handleOnLoad()
    return (
      <div className="App">
        <h1 className="appTitle">Weather Checker</h1>
        <Form
        value={this.state.value}
        change={this.handleInputChange}
        submit={this.handleCitySubmit}
        />
        <Result
        weather= {this.state}/>
      </div>
    );
  }
}

export default App;
