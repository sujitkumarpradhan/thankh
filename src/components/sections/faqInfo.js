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

class FaqInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid>
        <Row className="show-grid">

          <Col className="aboutLogo" xs={12} md={12}>
              FAQ 
             </Col>
        </Row>
      </Grid>
    );
  }
}
export default withRouter(FaqInfo);
