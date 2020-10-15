import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Logo from "../../assets/Logo.png";
import logogif from "../../assets/ThankhuesNew.gif";
import video from "../../assets/video-player.svg";
import faq from "../../assets/question.svg";
import info from "../../assets/info.svg";
import comment from "../../assets/chat.svg";
import videoBg from "../../assets/videoBg2.png"

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
import { Grid, Row, Col } from "react-bootstrap";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid" style={{ marginBottom: "80px" }}>
          <Col xs={2} md={2} />
          <Col className="aboutLogo" xs={8} md={8}>
            <strong>ThankHues</strong>, is an effort to enhance the motivation of designers, where a piece of artwork (painting or sketch) created by a designer from one DSS site is given as a gesture of gratitude to another designer belonging to a different site for setting new examples of displaying our leadership principles, day in - day out.
          </Col>
          <Col xs={2} md={2} />

          <Col xs={12} md={12}>
          <img className="videoBG" src={videoBg}></img>
          <video className="videoShadow" width="50%" controls>
              <source
                src="https://s3-ap-northeast-1.amazonaws.com/thankhues-images/thankhuesShort.mp4"
                type="video/mp4"
              />
            </video>
          </Col>

         
           
        </Row>
      </Grid>
    );
  }
}
export default withRouter(AboutUs);
