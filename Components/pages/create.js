import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import {withRouter } from "react-router-dom";
import "./create.css";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import Cookies from "universal-cookie";
import Header from "../layout/header";
import Footer from "../layout/footer.js";

// const cookies = new Cookies();

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      S3path: "",
      userAlias: "",
      assignmentNumber: "",
      output: "",
      s3Valid: true,
      aliasValid: true,
      numberValid: true,
      allValid: false
    };
    this.handlePath = this.handlePath.bind(this);
    this.Validate = this.Validate.bind(this);
    this.copyFinalURL = this.copyFinalURL.bind(this);
    this.allValid = this.allValid.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //   var currentDate = new Date();
  //   var expiresDate = new Date(
  //     currentDate.setDate(currentDate.getDate() + 365)
  //   );

  //   if (!cookies.get("firstTime")) {
  //     confirmAlert({
  //       title: "First time user?",
  //       message:
  //         "Are you using this tool for the first time? If yes, you need to follow an one time step before you start download.",
  //       buttons: [
  //         {
  //           label: "View steps",
  //           onClick: () => {}
  //         },
  //         {
  //           label: "Dismiss"
  //         },
  //         {
  //           label: "Don't show this again",
  //           onClick: () => {
  //             cookies.set("firstTime", "true", {
  //               path: "/",
  //               expires: expiresDate
  //             });
  //           }
  //         }
  //       ]
  //     });
  //   }
  // }

  allValid() {
    if (
      this.state.S3path &&
      this.state.userAlias &&
      this.state.assignmentNumber &&
      this.state.S3path.trim() &&
      this.state.userAlias.trim() &&
      this.state.assignmentNumber.trim()
    ) {
      this.setState({ allValid: true });
      return true;
    } else {
      this.setState({ allValid: true });
      return false;
    }
  }

  Validate(whichField) {
    if (whichField == "s3") {
      var regexConst = new RegExp("(s3-|s3.)?(.*).amazonaws.com");
      var result = regexConst.test(this.state.S3path);

      if (result) {
        this.setState({ s3Valid: true });
      } else {
        this.setState({ s3Valid: false });
      }
    }

    if (whichField == "alias") {
      if (this.state.alias.trim()) {
        this.setState({ aliasValid: true });
      } else {
        this.setState({ aliasValid: false });
      }
    }

    if (whichField == "number") {
      if (this.state.assignmentNumber.trim()) {
        this.setState({ numberValid: true });
      } else {
        this.setState({ numberValid: false });
      }
    }

    // return result;
  }

  handlePath(path) {
    let validate = this.allValid();

    if (validate) {
      let newpath;
      newpath = path.replace(new RegExp("%29", "g"), ")");
      newpath = newpath.replace(new RegExp("%28", "g"), "(");
      newpath = newpath.replace(new RegExp("%27", "g"), "'");
      newpath = newpath.replace(new RegExp("%26", "g"), "&");
      newpath = newpath.replace(new RegExp("%25", "g"), "%");
      newpath = newpath.replace(new RegExp("%24", "g"), "$");
      newpath = newpath.replace(new RegExp("%23", "g"), "#");
      newpath = newpath.replace(new RegExp("%22", "g"), '"');
      newpath = newpath.replace(new RegExp("%21", "g"), "!");
      newpath = newpath.replace(new RegExp("%20", "g"), " ");
      newpath = newpath.replace(new RegExp("%2A", "g"), "*");
      newpath = newpath.replace(new RegExp("%2B", "g"), "+");
      newpath = newpath.replace(new RegExp("%2C", "g"), ",");
      newpath = newpath.replace(new RegExp("%2D", "g"), "-");
      newpath = newpath.replace(new RegExp("%2E", "g"), ".");
      
      let finalS3="";
      if(newpath.includes("s3.amazonaws")){
        console.log("Cyberduck Path");
        let position = newpath.split("/", 4).join("/").length;
        finalS3 = "s3://adx-design-assets" + newpath.slice(position);
      }else{
        console.log("Transmit Path");
        let position = newpath.split("/", 3).join("/").length;
        finalS3 = "s3://adx-design-assets" + newpath.slice(position);
      }

      let userAccountPath =
        "/Users/" +
        this.state.userAlias +
        "/Downloads/S3_Assets/" +
        this.state.assignmentNumber;

      let finalTerminal =
        'aws s3 cp "' +
        finalS3 +
        '" "' +
        userAccountPath +
        '" --recursive --include "*"';

      this.setState({ output: finalTerminal });
    }
  }

  copyFinalURL() {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = this.state.output;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

//   handleClick(e) {
//     console.log("========",e[0])
//     // this.refs.fileUploader.click();
// }

  render() {
    return (
      <Grid className="App allclass">
        <Col xs={12} md={12}>
          <Row className="show-grid">
            <Header pageType="download" />

            <Col xs={12} md={12}>
              <Row className="show-grid">
                <Col xs={3} md={3}></Col>

                <Col className="step-body" xs={7} md={7}>
                  <span className="stepLable">Step 1:</span> <br />
                  If you are using this tool for first time please follow the
                  setup process {" "}
                  <a
                    className="wikiColor"
                    href="https://w.amazon.com/bin/view/Users/sujpradh/FASTag/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    wiki
                  </a>
                </Col>
              </Row>
            </Col>

            <Col xs={12} md={12}>
              <Row className="show-grid">
                <Col xs={3} md={3}></Col>
                <Col className="step-body" xs={7} md={7}>
                  <Row className="show-grid">
                    <Col className="steps-margin" xs={12} md={12}>
                      <span className="stepLable">Step 2:</span> <br />
                      Generate the code using below fields
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">Enter S3 path</span>
                      <textarea
                        className="input-field"
                        spellCheck="false"
                        placeholder="S3 Path"
                        rows="4"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.S3path}
                        onChange={e => {
                          this.setState({ S3path: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">Enter your alias</span>
                      <input
                        className="input-field"
                        spellCheck="false"
                        placeholder="User alias"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.userAlias}
                        onChange={e => {
                          this.setState({ userAlias: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">
                        Enter your assignment number
                      </span>
                      {/* <span className="errorlable">
                        Please enter valid input
                      </span> */}
                      <input
                        className="input-field"
                        spellCheck="false"
                        placeholder="Assignment number"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.assignmentNumber}
                        onChange={e => {
                          this.setState({ assignmentNumber: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    {/* <input type="file" webkitdirectory="" directory="" multiple="" onChange={(e) => {
                          this.handleClick(e);
                        }} /> */}
                    
                    <Col xs={12} md={12}>
                      <Button
                        className="btn btn--primary btn--inside"
                        onClick={() => {
                          this.handlePath(this.state.S3path);
                        }}
                      >
                        Generate code
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col
              xs={12}
              md={12}
              style={{
                display: this.state.output != "" ? "block" : "none"
              }}
            >
              <Row className="show-grid">
                <Col xs={3} md={3}></Col>

                <Col className="step-body" xs={7} md={7}>
                  <span className="stepLable">Step 3:</span> <br />
                  Copy the generated code. Use cmd+space and seach "terminal".
                  Open terminal.app and past below code to start the download.
                  (To stop download please close the terminal)
                </Col>
              </Row>

              <Col xs={3} md={3}></Col>
              <Col xs={7} md={7} className="terminalCodeArea">
                <div className="window">
                  <div className="bar">
                    <div className="btn1"></div>
                  </div>
                  <div className="body1">
                    <pre1>
                      <div className="prompt">
                        <span className="command">
                          {this.state.output ? this.state.output : "No data"}
                        </span>
                      </div>
                    </pre1>
                  </div>
                </div>

                <Button
                  className="copyButton copyButton--primary copyButton--inside"
                  onClick={() => {
                    this.copyFinalURL();
                  }}
                >
                  Copy generated code
                </Button>
              </Col>
            </Col>
          </Row>
        </Col>
        <Footer />
      </Grid>
    );
  }
}

export default withRouter(Create);

// const styles = {
//   headline: {
//     color: "#e07414",
//     fontSize: "100px"
//   }
// };
