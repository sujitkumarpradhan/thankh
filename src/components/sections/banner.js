import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import ReactGA from "react-ga";
import Logo from "../../assets/Logo.png";
import logogif from "../../assets/ThankhuesNew.gif";
import video from "../../assets/video-player.svg";
import faq from "../../assets/question.svg";
import info from "../../assets/info.svg";
import homeIcon from "../../assets/canvas.svg";
import videoSelected from "../../assets/video-playerSelected.svg";
import faqSelected from "../../assets/questionSelected.svg";
import infoSelected from "../../assets/infoSelected.svg";
import homeIconSelected from "../../assets/canvasSelected.svg";
import comment from "../../assets/chat.svg";
import LogoStatic from "../../assets/LogoStatic.svg";
import playIcon from "../../assets/play.svg";

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

class Banner extends React.Component {
  constructor(props) {
    super(props);

    console.log("sx---------", this.props.pageType);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            {/* <img className="playIconLogo" alt="Amazon" src={playIcon} /> */}
            <img className="logoThankhues" alt="Amazon" src={LogoStatic} />
          </Col>

          <Col className="" xs={3} md={3} style={{ display: this.props.pageType == "home" ? "block" : "none" }}></Col>
          <Col className="aboutLogoHome" xs={6} md={6} style={{ display: this.props.pageType == "home" ? "block" : "none" }}>
         "Creativity is contagious, pass it on." <br></br>
- Albert Einstein<br></br>
Welcome to the ThankHues Art Gallery.</Col>
          <Col className="" xs={3} md={3} style={{ display: this.props.pageType == "home" ? "inline-block" : "none" }}></Col>

          <Col className="aboutIcons" xs={12} md={12}>
            <a className="selected-button" style={{ display: this.props.pageType == "home" ? "inline-block" : "none" }} href="/home">
              Hue showcase
            </a>

            <a className="unselected-button" style={{ display: this.props.pageType != "home" ? "inline-block" : "none" }} href="/home">
              Hue showcase
            </a>

            <a className="selected-button" style={{ display: this.props.pageType == "about" ? "inline-block" : "none" }} href="/about">
              About thankhues
            </a>

            <a className="unselected-button" style={{ display: this.props.pageType != "about" ? "inline-block" : "none" }} href="/about">
              About thankhues
            </a>

          </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(Banner);
