import React, { Component } from "react";
import "bootswatch/journal/bootstrap.css";
//import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Киев", zip: "03056" },
  { name: "Сан Хосе", zip: "94088" },
  { name: "Санта Круз", zip: "95062" },
  { name: "Гонолулу", zip: "96803" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <div>Загрузка</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} />
        </h1>
        <p>Текущая: {(5*(weatherData.main.temp-32)/9).toFixed(2)}°C</p>
        <p>Максимальная: {(5*(weatherData.main.temp_max-32)/9)toFixed(2)}°C</p>
        <p>Минимальная: {5*(weatherData.main.temp_min-32)/9)toFixed(2)}°C</p>
        <p>Скорость ветра: {0.44704*weatherData.wind.speed.toFixed(2)} м/с</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Простое приложение Прогноз погоды на React
            </Navbar.Brand>
            <a href="https://github.com/valerytabakov/intro-to-react">Узнай как я устроено</a>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Выберите город</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
