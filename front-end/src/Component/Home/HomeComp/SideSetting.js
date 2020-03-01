import "./home-css/SidebarPush.css";
import React from "react";
import { Grid, Segment } from "semantic-ui-react";
import axios from "axios";
export default class SideSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pred_voltage: 0,
      show: false
    };
  }
  componentDidMount(){
      this.fetchAPI();
  }
  fetchAPI() {
    const pointer = this;
    axios
      .get("http://localhost:8080/api/predict?time=60&intensity=3")
      .then(function(response) {
        // handle success
        return (response.data);
      })
      .then(function(data) {
        pointer.setState({ pred_voltage: data });
      });
  }
  render() {
    return (
      <div className={"sidepush-main"}>
        <div className={"sidepush-sub container"}>{this.state.pred_voltage}</div>
      </div>
    );
  }
}
