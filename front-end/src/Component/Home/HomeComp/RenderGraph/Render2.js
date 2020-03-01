import React from "react";
import axios from "axios";
import { Header, Segment, Grid, Modal, Button } from "semantic-ui-react";
import Chart from "react-apexcharts";
import socketIOClient from "socket.io-client";
export default class Render1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stock_x: [],
      endpoint: "http://127.0.0.1:4001",
      device_array: [],
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [],
          title: {
            text: "Time"
          }
        }
      },
      yaxis: {
        title: {
          text: "Voltage"
        }
      },
      series: [
        {
          name: "Voltage",
          data: [30, 40, 45, 50, 49, 60, 70, 91],
          title: {
            text: "Voltage"
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchAPI();
    console.log("method called");
  }

  fetchAPI() {
    var device_time = [];
    var device_amp = [];
    var count = 0;
    let pointer = this;
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    // socket.on("FromAPI", (data) => {
    //     while(count != data["data"].length)
    //     {
    //         device_time.push(data["data"][count]["Time"]);
    //         device_amp.push(data["data"][count]["Voltage"]);
    //         count++;
    //     }
    // });

    axios.get("http://localhost:8080/api/getDB").then(function(response) {
      for (var dev in response.data["data"]) {
        device_time.push(response.data["data"][count]["Time"]);
        device_amp.push(Math.floor(response.data["data"][count]["Voltage"]));
        count++;
      }
      pointer.setState({
        series: [
          {
            ...pointer.state.series,
            name: "Voltage",
            data: device_amp
          }
        ]
      });
      pointer.setState({
        options: {
          ...pointer.state.options,
          xaxis: {
            ...pointer.state.options.xaxis,
            categories: device_time
          }
        }
      });
    });
  }

  render() {
    return (
      <div>
        {
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="line"
          />
        }
      </div>
    );
  }
}
