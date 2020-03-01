import React from "react";
import "./Home.css";
import {
  Icon,
  Menu,
  Segment,
  Sidebar,
  Button
} from "semantic-ui-react";

import Side_Home from "./HomeComp/SideHome";
import Side_Setting from "./HomeComp/SideSetting";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      dash_home: true,
      dash_setting: false
    };
  }

  ShowOn = () => {
    this.setState({ visible: true });
  };
  ShowOff = () => {
    this.setState({ visible: false });
  };

  showHome = () => {
    this.setState({ dash_home: true, dash_setting: false });
  };
  showSetting = () => {
    this.setState({ dash_setting: true, dash_home: false });
  };
  render() {
    let comp;
    let show_home = this.state.dash_home;
    let show_setting = this.state.dash_setting;
    if (show_home) {
      comp = <Side_Home />;
    }
    if (show_setting) {
      comp = <Side_Setting />;
    }
    return (
      <div>
        <Sidebar.Pushable className={"sidebar-seg"} as={Segment}>
          <Sidebar
            as={Menu}
            animation="push"
            icon="labeled"
            inverted
            onHide={this.ShowOff}
            vertical
            visible={this.state.visible}
            width="thin"
          >

            
              <Icon onClick={this.ShowOff} size={"huge"} className={"offonn"} name="power" />
            <div className={"side-bar-route"}>
            <Menu.Item onClick={this.showHome} as="a">
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="setting" />
              Settings
            </Menu.Item>
            <Menu.Item as="a">
              <Icon name="info" />
              Information
            </Menu.Item>
            </div>
          </Sidebar>

          <Sidebar.Pusher>{comp}
          
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
