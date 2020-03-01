import React from "react";
import axios from "axios";
import { Header, Segment, Grid, Modal, Button } from "semantic-ui-react";
import Chart from "react-apexcharts";
import Render1 from "./RenderGraph/Render1";
import Render2 from "./RenderGraph/Render2";
import "./home-css/RenderGraph.css";

export default class RenderGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latest_value: "",
      weekly_usage: "",
      latest_Ampere: "",
      weekly_Ampere: "",

    };
  }
  componentDidMount() {
    this.fetchAPI();
  }
  fetchAPI() {
    const pointer = this;
    axios.get("http://localhost:8080/api/getDB").then(function(response) {
      console.log(
        response.data["data"][response.data["data"].length - 1]["Voltage"]
      );
      pointer.setState({
        latest_value:
          response.data["data"][response.data["data"].length - 1]["Voltage"]
      });
      pointer.setState({
        weekly_usage:
          response.data["data"][response.data["data"].length - 1]["Voltage"] * 7
      });
      pointer.setState({
        latest_Ampere:
          response.data["data"][response.data["data"].length - 1]["Amperage"]
      });
      pointer.setState({
        weekly_Ampere:
          response.data["data"][response.data["data"].length - 1]["Amperage"] *
          7
      });
    });
  }
  render() {
    let graph1 = <Render1></Render1>;
    let graph2 = <Render2></Render2>;
    return (
      <section className={"main-render-graph"}>
        <div className={"mainrend-div container"}>
          <Header className={"graph-render-header"}>{this.props.device}</Header>
        </div>
        <Header className={"graph-header"}>Usage</Header>
        <Segment className={"voltage-usage-graph"}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                {graph1}
                <Modal trigger={<Button>Enlarge Graph</Button>} closeIcon>
                  <Modal.Content>{graph1}</Modal.Content>
                </Modal>
              </Grid.Column>
              <Grid.Column>
                <div className={"meaningful-info"}>
                  <div className={"info-div"}>
                    <Header className={"graph-info"}>
                      Current Amp Usage:{" "}
                      <span className={"current-usage-num"}>
                        {this.state.latest_Ampere} Amperes
                      </span>
                    </Header>
                  </div>
                  <div className={"info-div"}>
                    <Header className={"graph-info"}>
                      Weekly Amp Usage:{" "}
                      <span className={"weekly-usage-num"}>
                        {this.state.weekly_Ampere} Amperes
                      </span>
                    </Header>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Header className={"graph-header"}>Machine Prediction</Header>
        <Segment className={"voltage-usage-graph"}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                {graph2}
                <Modal trigger={<Button>Enlarge Graph</Button>} closeIcon>
                  <Modal.Content>{{ graph2 }}</Modal.Content>
                </Modal>
              </Grid.Column>
              <Grid.Column>
                <div className={"meaningful-info"}>
                  <div className={"info-div"}>
                    <Header className={"graph-info"}>
                      Predicted Status for the next minute:{" "}
                      <span className={"current-usage-num"}>
                        {this.state.latest_value} Volts
                      </span>
                    </Header>
                  </div>
                  <div className={"info-div"}>
                    <Header className={"graph-info"}>
                      Predicted Uptime: <span></span>
                    </Header>
                  </div>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </section>
    );
  }
}
