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
import BootstrapSwitchButton from "bootstrap-switch-button-react";

class App extends Component {
  state = {
    flagToggle: true
  };

  componentDidMount() {
    this.props.searchCity(this.props.cityName);
    this.props.geolocationApi();
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
                      {this.state.flagToggle
                        ? temp.Temperature.Metric.Value + " ℃"
                        : temp.Temperature.Imperial.Value + " °F"}
                    </h6>
                    <div className="toggleTemp">
                      <BootstrapSwitchButton
                        checked={true}
                        offlabel="°F"
                        onstyle="info"
                        offstyle="info"
                        onlabel="℃"
                        size="sm"
                        onChange={checked => {
                          this.setState({ flagToggle: checked });
                        }}

                        // size="sm"
                      />
                    </div>

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
              const fahrenheitMin = temp.Temperature.Minimum.Value;
              const fahrenheitMax = temp.Temperature.Maximum.Value;
              const CelsiusMin = ((5 / 9) * (fahrenheitMin - 32)).toFixed(0);
              const CelsiusMax = ((5 / 9) * (fahrenheitMax - 32)).toFixed(0);
              return (
                <div key={i} className="card">
                  <h5 className="card-title">
                    {moment(temp.Date).format("L")}
                  </h5>
                  <h5 className="card-title">
                    {moment(temp.Date).format("dddd")}
                  </h5>
                  {this.state.flagToggle ? (
                    <h5 className="card-text">
                      {CelsiusMin} - {CelsiusMax} {" ℃"}
                    </h5>
                  ) : (
                    <h5 className="card-text">
                      {fahrenheitMin} - {fahrenheitMax} {" °F"}
                    </h5>
                  )}
                  <h6 className="card-title">{this.props.cityId}</h6>
                  <br />
                  <img
                    style={{ margin: "-20px" }}
                    src={iconsSwitch1(temp.Day.IconPhrase)}
                    alt="none"
                  />
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
