import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../style/global.css";
import newlogo from "../../assets/NewLogo.svg";
import newlogoPNG from "../../assets/Logo_2x.png";
import download from "../../assets/download button.svg";
import upload from "../../assets/Upload button.svg";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("Save================", this.props.pageType);
  }

  render() {
    return (
      <Grid>
        <Col xs={12} md={12}>
          <Row className="show-grid">
            {/* <Col xs={12} md={12}>
              <span
                style={{
                  ...styles.headline,
                  fontWeight: "500"
                }}
              >
                FAST
              </span>

              <span
                style={{
                  ...styles.headline,
                  fontWeight: "200"
                }}
              >
                ag
              </span>
            </Col> */}

            <Col xs={12} md={12}>
              <img className="logoNew"
                src={newlogoPNG} alt="Header logo"/>
            </Col>
{/* 
            <Col xs={12} md={12}>
              <Link
                // className="headerTabbutton tabbutton"
                to={"/"}
              style={{
                filter: this.props.pageType == "download" ? "grayscale(0)" : "grayscale(100%)"
              }}
              >
                <img className="DownloadButton"
                  src={download} alt="download button"/>
              </Link>
              <Link
                // className="headerTabbutton tabbutton"
                to={"/upload"}
                style={{
                  filter: this.props.pageType == "upload" ? "grayscale(0)" : "grayscale(100%)"
                }}
              >
                <img className="DownloadButton"
                  src={upload} alt="upload button"/>
              </Link>
            </Col> */}
          </Row>
        </Col>
      </Grid>
    );
  }
}


export default Header;
