import "./home-css/SidebarPush.css";
import React from "react";
import { Grid, Segment, Header, Icon } from "semantic-ui-react";
import RenderGraph from "./RenderGraph";
import axios from "axios";
export default class SideHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Time: "0",
      Voltage: "0",
      device_array: [],
      show: false
    };
  }

  componentDidMount() {
    this.fetchAPI();
  }
  onSegmentClick = () => {
    this.setState({ device_name: "Led", show: true });
    console.log("Accessed");
  };

  fetchAPI() {
    var device = [];
    var count = 0;
    let pointer = this;
    axios.get("http://localhost:8080/api/getDB").then(function(response) {

    if(response.data["data"][response.data["data"].length - 1]["Time"] === undefined){
     pointer.setState({Time: 0});
    }
    if(response.data["data"][response.data["data"].length - 1]["Voltage"] === undefined){
      pointer.setState({Time: 0});
     }
      pointer.setState({
        Time: response.data["data"][response.data["data"].length - 1]["Time"],
        Voltage: response.data["data"][response.data["data"].length - 1]["Voltage"]
      });
    });
  }

  render() {
    let left;
    if (this.state.show) {
      left = (
        <div>
          <RenderGraph device={this.state.device_name}></RenderGraph>
        </div>
      );
    }

    let onOff;
    if(this.state.Voltage <= 2.5){
      onOff= (<span className={"render-status-off"}>Off</span>);
    }
    else
    {
      onOff= (<span className={"render-status"}>On</span>);
    }
    return (
      <div className={"sidepush-main"}>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <div className={"sidepush-sub container"}>
                <div className={"header-contain"}>
                  <Header className={"device-Header"}>My Devices</Header>
                </div>
                <div className={"device-grid-contain"}>
                  <Grid columns={1} stackable={true}>
                    <Grid.Row>
                      <Segment
                        onClick={this.onSegmentClick}
                        className={"device-segment"}
                      >
                        <div className={"dev-div-render"}>
                          <Icon
                            className={"render-icon"}
                            size={"huge"}
                            name="lightbulb"
                          ></Icon>
                        </div>
                        <div className={"dev-div-render"}>
                          <div className={"device-name-render"}>
                            <Header className={"device-render-main"}>
                              LED
                            </Header>
                          </div>
                          <div className={"device-name-render"}>
                            <Header className={"device-render"}>
                              Status:{" "}
                              {onOff}
                            </Header>
                          </div>
                          <div className={"device-name-render"}>
                            <Header className={"device-render"}>
                              Uptime: {this.state.Time/60 } min
                            </Header>
                          </div>
                        </div>
                      </Segment>
                    </Grid.Row>
                  </Grid>
                </div>
              </div>
            </Grid.Column>
            <Grid.Column>{left}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
