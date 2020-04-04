import React, { Component } from "react";
import {
  geolocationApi,
  searchCity,
  iconsSwitch1
} from "../actions/searchAction";
import Search from "./Search";
import { connect } from "react-redux";
import moment from "moment";
import "moment/locale/en-gb";
import Addfavotire from "./Addfavotire";
import Toggleswitch from "./Toggleswitch";

class App extends Component {
  componentDidMount() {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos/1"),
      // fetch("https://jsonplaceholder.typicode.com/todos/2"),
      fetch("https://dog.ceo/api/breeds/list")
    ])
      .then(async ([aa, bb]) => {
        const a = await aa.json();
        const b = await bb.json();
        return [a, b];
      })
      .then(responseText => {
        console.log(responseText);
      })
      .catch(err => {
        console.log(err);
      });

    const urls = [
      "https://official-joke-api.appspot.com/random_joke",
      "https://dog.ceo/api/breeds/list",
      "https://official-joke-api.appspot.com/random_joke",
      "https://dog.ceo/api/breeds/image/random"
    ];

    // Promise.all(urls.map(url => fetch(url))).then(data => {
    //   console.log(data[2]);
    // });

    // Promise.all([
    //   fetch("https://official-joke-api.appspot.com/random_joke"),
    //   fetch("https://official-joke-api.appspot.com/random_joke"),
    //   fetch("https://official-joke-api.appspot.com/random_joke")
    // ])
    //   .then(([request1, request2, request3]) => {
    //     const first = request1;
    // const  sec = request2;
    // const  thr = request3;

    // const cityName = request1.data;
    // const cityId = request1.data[0].AdministrativeArea.ID;
    // const cityKey = request1.data[0].Key;
    // const forcasts = request2.data.DailyForecasts;
    //   // const data1 = request3.data;
    //   console.log(first.Response);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
  }

  render() {
    return (
      <div>
        <div className="toggle-container">
          <span className="toggle">
            <Toggleswitch />
          </span>
        </div>
        <div className="displayLocation">
          <img
            className="LocationImgStyle"
            src={require("../data/icons/icons8-location-8000.png")}
            alt="location"
          />
          <span className="myLocation">{this.props.dataLocation}</span>
        </div>
        <Search />
        <div className="card-deck1">
          <div className="dori-container1">
            <div className="Addfavotire">
              <Addfavotire />
            </div>
            <div className="card-title">
              {this.props.forcast.map((temp, i) => {
                return (
                  <div key={i} className="b">
                    <h4 className="card-title">{this.props.cityName}</h4>
                    <h6 className="card-title">
                      {temp.Temperature.Metric.Value +
                        "℃ " +
                        " / " +
                        temp.Temperature.Imperial.Value +
                        " F"}
                    </h6>
                    <h6 className="card-title">{this.props.cityId}</h6>
                    <h6 className="card-title">{temp.WeatherText}</h6>
                    <img
                      style={{ margin: "-20px" }}
                      src={iconsSwitch1(temp.WeatherText)}
                      alt="none"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-deck">
            {this.props.forcasts.map((temp, i) => {
              const { Value } = temp.Temperature.Minimum;
              const Celsius = ((5 / 9) * (Value - 32)).toFixed(0);
              return (
                <div key={i} className="card">
                  <h5 className="card-title">
                    {moment(temp.Date).format("L")}
                  </h5>
                  <h5 className="card-title">
                    {moment(temp.Date).format("dddd")}
                  </h5>
                  <h5 className="card-text">{Value} F</h5>
                  <h5 className="card-text">{Celsius} ℃</h5>
                  <h6 className="card-title">{this.props.cityId}</h6>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  forcast: state.searchReducer.forcast,
  forcasts: state.searchReducer.forcasts,
  cityName: state.searchReducer.cityName,
  cityId: state.searchReducer.cityId,
  dataLocation: state.searchReducer.dataLocation,
  image: state.searchReducer.image
});

export default connect(mapStateToProps, { searchCity, geolocationApi })(App);
//♡
