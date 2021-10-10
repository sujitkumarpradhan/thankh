import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "./upload.css";
// import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// import Cookies from "universal-cookie";
import Header from "../layout/header";
import Footer from "../layout/footer.js";

// const cookies = new Cookies();

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SFURL: "",
      A_local: "",
      A_verticle: "",
      A_alphabet: "",
      A_advertiser: "",
      output: "",
      validSFurl: true,
      localFolder: "",
      archivePath: "",
      A_type: "",
      A_number: ""
    };
    this.copyFinalURL = this.copyFinalURL.bind(this);
    this.allValid = this.allValid.bind(this);
    this.SfDataPull = this.SfDataPull.bind(this);
    this.copyArchivePath = this.copyArchivePath.bind(this);
    this.archivePathCreation = this.archivePathCreation.bind(this);
  }

  allValid() {
    if (
      this.state.A_local &&
      this.state.A_verticle &&
      this.state.A_alphabet &&
      this.state.A_advertiser &&
      this.state.localFolder
    ) {
      // this.setState({ allValid: true });
      return true;
    } else {
      // this.setState({ allValid: true });
      return false;
    }
  }


  handlePath() {
    let validate = this.allValid();

    if (validate) {

      if (this.state.A_type == "Stores") {
        let folderName = this.state.localFolder.substring(this.state.localFolder.lastIndexOf("/") + 1, this.state.localFolder.length);
        let S3path2nd = this.state.A_local + "/" + "/" + this.state.A_alphabet + "/" + this.state.A_advertiser + "/" + folderName;

        S3path2nd = S3path2nd.replace(new RegExp('"', "g"), "");
        S3path2nd = S3path2nd.replace(new RegExp("!", "g"), "");

        // let S3path = "s3://adx-design-assets/SandBox/sujpradh/tooltest/Brand Stores/2021/" + S3path2nd;
        // let arPath = "https://adx-design-assets.s3.us-west-2.amazonaws.com/SandBox/sujpradh/tooltest/Brand Stores/2021/" + S3path2nd;

        let S3path = "s3://adx-design-assets/Brand Stores/2021/" + S3path2nd;
        let arPath = "https://adx-design-assets.s3.us-west-2.amazonaws.com/Brand Stores/2021/" + S3path2nd;

        this.archivePathCreation(arPath);

        let finalTerminal =
          'aws s3 cp "' +
          this.state.localFolder +
          '" "' +
          S3path +
          '" --recursive --include "*"';

        this.setState({ output: finalTerminal });

      } else {
        let folderName = this.state.localFolder.substring(this.state.localFolder.lastIndexOf("/") + 1, this.state.localFolder.length);
        let S3path2nd = this.state.A_local + "/" + this.state.A_verticle + "/" + this.state.A_alphabet + "/" + this.state.A_advertiser + "/" + folderName;

        S3path2nd = S3path2nd.replace(new RegExp('"', "g"), "");
        S3path2nd = S3path2nd.replace(new RegExp("!", "g"), "");

        // let S3path = "s3://adx-design-assets/SandBox/sujpradh/tooltest/Campaigns/2021/" + S3path2nd;
        // let arPath = "https://adx-design-assets.s3.us-west-2.amazonaws.com/SandBox/sujpradh/tooltest/Campaigns/2021/" + S3path2nd;


        let S3path = "s3://adx-design-assets/Campaigns/2021/" + S3path2nd;
        let arPath = "https://adx-design-assets.s3.us-west-2.amazonaws.com/Campaigns/2021/" + S3path2nd;

        this.archivePathCreation(arPath);

        let finalTerminal =
          'aws s3 cp "' +
          this.state.localFolder +
          '" "' +
          S3path +
          '" --recursive --include "*"';

        this.setState({ output: finalTerminal });
      }


    }
  }

  archivePathCreation(S3path) {
    S3path = S3path.replace(new RegExp("%", "g"), "%25");
    S3path = S3path.replace(new RegExp("\\)", "g"), "%29");
    S3path = S3path.replace(new RegExp("\\(", "g"), "%28");
    S3path = S3path.replace(new RegExp("'", "g"), "%27");
    S3path = S3path.replace(new RegExp("&", "g"), "%26");
    S3path = S3path.replace(new RegExp("\\$", "g"), "%24");
    S3path = S3path.replace(new RegExp("#", "g"), "%23");
    S3path = S3path.replace(new RegExp('"', "g"), "%22");
    S3path = S3path.replace(new RegExp("!", "g"), "%21");
    S3path = S3path.replace(new RegExp(" ", "g"), "%20");
    S3path = S3path.replace(new RegExp("\\*", "g"), "%2A");
    S3path = S3path.replace(new RegExp("\\+", "g"), "%2B");
    S3path = S3path.replace(new RegExp(",", "g"), "%2C");
    S3path = S3path.replace(new RegExp("@", "g"), "%40");
    S3path = S3path.replace(new RegExp("\\^", "g"), "%5E");
    S3path = S3path.replace(new RegExp("{", "g"), "%7B");
    S3path = S3path.replace(new RegExp("}", "g"), "%7D");

    console.log("checkpoint 3=============", S3path)
    this.setState({ archivePath: S3path });
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

  copyArchivePath() {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute("id", "dummy_id");
    document.getElementById("dummy_id").value = this.state.archivePath;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }


  async SfDataPull() {
    if (this.state.SFURL.trim()) {
      await fetch(
        `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
        {
          method: "POST",
          body: JSON.stringify({
            assignmentId: this.state.SFURL
          })
        }
      ).then(response => {
        if (response.status == 200) {
          return response.json();
        } else {
          console.log('Something went wrong ...', response);
        }
      })
        .then((data) => {
          let assignmentData = JSON.parse(data.rawData);
          // console.log("Local========", data.list[0].locale);
          // console.log("verticle========", assignmentData.Account_Vertical__c);
          // console.log("Data========", assignmentData.Request_Type_new__c);

          if (assignmentData.Request_Type_new__c && (assignmentData.Request_Type_new__c == "Stores" || assignmentData.Request_Type_new__c == "stores")) {
            console.log("DataStore========", assignmentData);

            this.setState({ A_type: "Stores" });
            this.setState({ A_number: assignmentData.Name });
            this.setState({ A_local: assignmentData.Primary_Market_Picklist__c });
            this.setState({ A_advertiser: assignmentData.Brand_Name_s__c });
            this.setState({ A_verticle: "NA" });

            console.log("Name========", this.state.A_number);
            let firstCharAdvertiser = assignmentData.Brand_Name_s__c.charAt(0).toLowerCase();

            // console.log("FirstChartacter========", firstCharAdvertiser);

            if (firstCharAdvertiser >= 0 && firstCharAdvertiser <= 9) {
              this.setState({ A_alphabet: "0-9" });
            } else if ((firstCharAdvertiser >= "a" && firstCharAdvertiser <= "f")) {
              this.setState({ A_alphabet: "A-F" });
            } else if ((firstCharAdvertiser >= "g" && firstCharAdvertiser <= "k")) {
              this.setState({ A_alphabet: "G-K" });
            } else if ((firstCharAdvertiser >= "l" && firstCharAdvertiser <= "p")) {
              this.setState({ A_alphabet: "L-P" });
            } else if ((firstCharAdvertiser >= "q" && firstCharAdvertiser <= "u")) {
              this.setState({ A_alphabet: "Q-U" });
            } if ((firstCharAdvertiser >= "v" && firstCharAdvertiser <= "z")) {
              this.setState({ A_alphabet: "V-Z" });
            }
            this.setState({ validSFurl: true });

          } else {
            console.log("DataDSS========", assignmentData);
            this.setState({ A_type: "DSS" });
            this.setState({ A_number: assignmentData.Name });
            this.setState({ A_local: data.list[0].locale });
            this.setState({ A_advertiser: assignmentData.Advertiser__c });

            if (assignmentData.Account_Vertical__c.toUpperCase() == "CONSUMER PACKAGED GOODS") {
              this.setState({ A_verticle: "CPG" });
            } else {
              this.setState({ A_verticle: assignmentData.Account_Vertical__c.toUpperCase() });
            }

            let firstCharAdvertiser = assignmentData.Advertiser__c.charAt(0).toLowerCase();

            // console.log("FirstChartacter========", firstCharAdvertiser);

            if (firstCharAdvertiser >= 0 && firstCharAdvertiser <= 9) {
              this.setState({ A_alphabet: "0-9" });
            } else if ((firstCharAdvertiser >= "a" && firstCharAdvertiser <= "f")) {
              this.setState({ A_alphabet: "A-F" });
            } else if ((firstCharAdvertiser >= "g" && firstCharAdvertiser <= "k")) {
              this.setState({ A_alphabet: "G-K" });
            } else if ((firstCharAdvertiser >= "l" && firstCharAdvertiser <= "p")) {
              this.setState({ A_alphabet: "L-P" });
            } else if ((firstCharAdvertiser >= "q" && firstCharAdvertiser <= "u")) {
              this.setState({ A_alphabet: "Q-U" });
            } if ((firstCharAdvertiser >= "v" && firstCharAdvertiser <= "z")) {
              this.setState({ A_alphabet: "V-Z" });
            }
            this.setState({ validSFurl: true });
          }


        })
        .catch(error => {
          console.log('I am error block===============', error);
          this.setState({ validSFurl: false });
        });
    } else {
      this.setState({ validSFurl: true });
    }

  }


  render() {
    return (
      <Grid className="App allclass">
        <Col xs={12} md={12}>
          <Row className="show-grid">
            <Header pageType="upload" />

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
                      {/* Fill the <a
                        className="wikiColor"
                        href="https://quip-amazon.com/JvlVAGRdugpB/Closed-beta-Assignment-URL#QER9CAerS4E"
                        target="_blank"
                      >
                        quip 
                  </a>
                   in beta */}
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">SF URL</span> <span style={{
                        display: this.state.validSFurl != true ? "inline-block" : "none"
                      }}
                        className="error">Invalid URL. Please update with correct URL or maunally enter the below fields</span>
                      <textarea
                        className="input-field"
                        spellCheck="false"
                        placeholder="SF URL"
                        rows="2"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.SFURL}
                        onChange={async (e) => {
                          await this.setState({ SFURL: e.target.value });
                          this.SfDataPull();
                          this.setState({ output: "" });
                        }}
                      />

                    </Col>

                    <Col xs={4} md={4}>
                      <span className="input-lable">Locale</span>
                      <input
                        className="input-field"
                        spellCheck="false"
                        placeholder="Local"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.A_local}
                        onChange={e => {
                          this.setState({ A_local: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={4} md={4}
                      style={{
                        display: this.state.A_verticle == "NA" ? "none" : "block"
                      }}>
                      <span className="input-lable">Account vertical</span>
                      <input
                        className="input-field"
                        spellCheck="false"
                        placeholder="Verticle"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.A_verticle}
                        onChange={e => {
                          this.setState({ A_verticle: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={4} md={4}>
                      <span className="input-lable">Sub folder</span>
                      <input
                        className="input-field"
                        spellCheck="false"
                        placeholder="Alphabet range"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.A_alphabet}
                        onChange={e => {
                          this.setState({ AaA_alphabetlpabet: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">Advertiser name</span>

                      <textarea
                        className="input-field"
                        spellCheck="false"
                        placeholder="Advertiser name"
                        rows="1"
                        type="text"
                        value={this.state.A_advertiser}
                        onChange={e => {
                          this.setState({ A_advertiser: e.target.value });
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>

                    <Col xs={12} md={12}>
                      <span className="input-lable">Local folder path (Option + cmd + C)</span>
                      <textarea
                        className="input-field"
                        spellCheck="false"
                        placeholder="Local folder path"
                        rows="2"
                        type="text"
                        pattern="[a-zA-Z]"
                        value={this.state.localFolder}
                        onChange={async (e) => {
                          this.setState({ localFolder: e.target.value });
                          console.log("Value:==========", this.state.localFolder);
                          this.setState({ output: "" });
                        }}
                      />
                    </Col>


                    <Col xs={12} md={12}>
                      <Button
                        className="btn btn--primary btn--inside"
                        onClick={() => {
                          this.handlePath();
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
                  <span className="assignmentNumber">{this.state.A_number}</span>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={3} md={3}></Col>

                <Col className="step-body" xs={7} md={7}>
                  <span className="stepLable">Step 3:</span> <br />
                  Copy the generated code. Use cmd+space and seach "terminal".
                  Open terminal.app and past below code to start the upload.
                  (To stop upload please close the terminal)
                </Col>
              </Row>

              <Col xs={3} md={3}></Col>
              <Col xs={7} md={7} className="terminalCodeArea">
                <div className="window">
                  <div className="bar">
                    <div className="btn1"></div>
                  </div>
                  <div className="body1">
                    <div className="body1-1">
                      <div className="prompt">
                        <span className="command">
                          {this.state.output ? this.state.output : "No data"}
                        </span>
                      </div>
                    </div>
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
              <Row className="show-grid">
                <Col xs={3} md={3}></Col>

                <Col className="step-body" xs={7} md={7}>
                  <span className="stepLable">Step 4:</span> <br />
                  Use the below S3 url for archive path
                </Col>
              </Row>

              <Col xs={3} md={3}></Col>
              <Col xs={7} md={7} className="terminalCodeArea">
                <div className="window">
                  <div className="body1">
                    <div className="body1-1">
                      <div className="prompt">
                        <span className="commandPath">
                          {this.state.archivePath ? this.state.archivePath : "No data"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="ArcopyButton ArcopyButton--primary ArcopyButton--inside"
                  onClick={() => {
                    this.copyArchivePath();
                  }}
                >
                  Copy archive path
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

export default withRouter(Upload);

// const styles = {
//   headline: {
//     color: "#e07414",
//     fontSize: "100px"
//   }
// };
