import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import "../../style/global.css";

import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Thumbnail,
  Button,
  Jumbotron,
  Popover,
  Tooltip,
  Modal,
  ButtonGroup,
  DropdownButton,
  nav
} from "react-bootstrap";

class VideoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <div className="video-overlay">
          <div>
          Hello thankhues
            </div>
      </div>
  <div className="video-container">
        <video autoPlay style={{width:"100%", height: "100%"}}>
            {/* <source src="https://s3-ap-northeast-1.amazonaws.com/thankhues-images/thankhues.mp4" /> */}
            <source src="https://s3-ap-northeast-1.amazonaws.com/thankhues-images/thankhuesShort.mp4" type="video/mp4"/>
            {/* <source src="https://s3-ap-northeast-1.amazonaws.com/thankhues-images/thankhuesShort.mp4" type="video/ogg"/> */}
        </video>
      </div>
      </div>
    
    );
  }
}
export default withRouter(VideoPage);
