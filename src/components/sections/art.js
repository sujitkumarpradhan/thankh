import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import { ApolloProvider } from "react-apollo";
import ReactGA from "react-ga";
import $ from "jquery";
import Img1 from "../../assets/Test/1.jpg";
import Img2 from "../../assets/Test/2.jpg";

import Img3 from "../../assets/Test/3.jpg";

import Img4 from "../../assets/Test/4.jpg";

import clap from "../../assets/clapping.svg";

import plus from "../../assets/plus.svg";
import loadingImage from "../../assets/loader.gif";
import gql from "graphql-tag";

import Modal from "react-awesome-modal";

import shadow from "../../assets/shadow.png";
import downArrow from "../../assets/downArrow.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loaderIcon from "../../assets/loader.gif";

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
  ButtonGroup,
  DropdownButton,
  nav,
  Collapse,
  Well,
  Grid,
  Row,
  Col
} from "react-bootstrap";

// import "./all/global.css";

const GET_Art = gql`
  query ListArts {
    listArts {
      items {
        ArtID
        Title
        Description
        CreatedBy
        CreatedByLevel
        CreatedByAlias
        CreatedByAbout
        ClapNumber
        AwardedTo
        AwardedToAlias
        AwardedToFor
        ArtURL
        Awarded
        Show
      }
    }
  }
`;

class Art extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      popupData: "",
      openArtist: false,
      openAwarded: false
    };
  }

  clapFortheArt(artDetails, updateArt) {
    updateArt({
      variables: {
        ArtID: artDetails.ArtID,
        ClapNumber: artDetails.ClapNumber ? artDetails.ClapNumber + 1 : 1
      }
    });

    // this.notify();

    this.setState({ show: true });
  }

  openModal(artData) {
    this.setState({
      openArtist: false,
      openAwarded: false,
      popupData: artData,
      visible: true,
      show: false
    });
    // console.log("New value===============", this.state.popupTitle,"visibility:",this.state.visible,"test value:",this.state.test);
    // fetch("https://contactstool.amazon.com/ac/can/people/bulkEmployeeInfoJSON?cID=raveens")
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log("================================", result);
    //     },

    //     (error) => {
    //       console.log("================================", error);
    //     }
    //   )
  }

  closeModal() {
    // console.log("New value===============", this.state.popupTitle,"visibility:",this.state.visible,"test value:",this.state.test);
    this.setState({
      visible: false
    });
  }

  notify = () => {
    toast("xxx-yyy cannot be duplicated", {
      toastId: 123,
      toastClassName: "black-background",
      bodyClassName: "black-background",
      hideProgressBar: true
    });
  };

  render() {
    return (
      <Mutation
        refetchQueries={[
          {
            query: GET_Art
          }
        ]}
        mutation={gql`
          mutation updateArt($ArtID: ID!, $ClapNumber: Int) {
            updateArt(input: { ArtID: $ArtID, ClapNumber: $ClapNumber }) {
              ClapNumber
            }
          }
        `}
        onCompleted={data => {
          this.setState(prevState => ({
            popupData: {
              ...prevState.popupData,
              ClapNumber: data.updateArt.ClapNumber
            }
          }));
        }}
      >
        {(updateArt, { loading }) => {
          return (
            <Query query={GET_Art}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <img src={loadingImage} />;
                }
                if (data) {
                  console.log(data.listArts.items[0]);
                  // data.listArts.items[0].Title = "Sujit";
                }

                return (
                  <div id="gallerly" className="container">
                    <div className="image-viewer">
                      {data.listArts.items.map((art, index) => {
                        return (
                          <div
                            className="artBoardCont"
                            key={index}
                            style={{ display: art.Show ? "" : "none" }}
                          >
                            <div>
                              <a
                                href="javascript:void(0);"
                                className="artBoard"
                                onClick={e => this.openModal(art)}
                              >
                                <img className="art" src={art.ArtURL} />
                              </a>{" "}
                              <br />
                              <div className="artDiv">
                                <div className="artName">{art.Title}</div>
                                <img className="clapOutside" src={clap} />
                                <div className="textClap">
                                  {art.ClapNumber ? art.ClapNumber : 0}
                                </div>
                              </div>
                            </div>

                            <ToastContainer autoClose={8000} />
                          </div>
                        );
                      })}

                      <Modal
                        visible={this.state.visible}
                        width="51%"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                      >
                        <img
                          onClick={() => this.closeModal()}
                          className="closeButton"
                          src={plus}
                        />
                        <div className="popup">
                          <img
                            className="popupart"
                            src={this.state.popupData.ArtURL}
                          />

                          <Row className="show-grid popupcontent">
                            <Col className="popupArtName" xs={7} md={7}>
                              {this.state.popupData.Title}
                            </Col>
                            <Col className="artClap" xs={5} md={5}>
                              <Col className="artClap" xs={7} md={7}>
                                <img className="" src={clap} />{" "}
                                <span>
                                  {this.state.popupData.ClapNumber
                                    ? this.state.popupData.ClapNumber
                                    : 0}
                                </span>
                              </Col>
                              <Col
                                className="clapButton"
                                onClick={e =>
                                  this.clapFortheArt(
                                    this.state.popupData,
                                    updateArt
                                  )
                                }
                                xs={5}
                                md={5}
                              >
                                Clap for the art
                              </Col>
                            </Col>
                            <Col className="popupDate" xs={12} md={12}>
                              {" "}
                              {this.state.popupData.createdDate
                                ? this.state.popupData.createdDate
                                : "12 January 2019"}{" "}
                            </Col>

                            <Col className="popupDesc" xs={12} md={12}>
                              {this.state.popupData.Description}
                            </Col>

                            <Col className="popupdivider" xs={12} md={12}>
                              <img src={shadow} />
                            </Col>

                            <Col className="textUser" xs={6} md={6}>
                              <Col className="subheadingBy" xs={12} md={12}>
                                Artist
                              </Col>
                              <Col className="userImageBlock" xs={3} md={3}>
                                <img
                                  className="userImage"
                                  src={`https://badgephotos.amazon.com/?uid=${
                                    this.state.popupData.CreatedByAlias
                                  }&Region=Master&FullsizeImage=Yes`}
                                />
                              </Col>
                              <Col xs={7} md={7}>
                                {this.state.popupData.CreatedBy}
                              </Col>
                              <Col xs={2} md={2}>
                                <img
                                  onClick={() =>
                                    this.setState({
                                      openArtist: !this.state.openArtist
                                    })
                                  }
                                  className="plusButton"
                                  src={downArrow}
                                />
                              </Col>
                              <Col className="userPosition" xs={9} md={9}>
                                {this.state.popupData.CreatedByLevel
                                  ? this.state.popupData.CreatedByLevel
                                  : "Visual Designer"}
                              </Col>

                              <Col xs={9} md={9}>
                                <Collapse in={this.state.openArtist}>
                                  <div className="userDesc">
                                    {this.state.popupData.CreatedByAbout}
                                  </div>
                                </Collapse>
                              </Col>
                            </Col>
                            <Col
                              className="textUser"
                              xs={6}
                              md={6}
                              style={{
                                display: this.state.popupData.Awarded
                                  ? ""
                                  : "none"
                              }}
                            >
                              <Col className="subheadingBy" xs={12} md={12}>
                                Awarded to
                              </Col>
                              <Col className="userImageBlock" xs={3} md={3}>
                                <img
                                  className="userImage"
                                  src={`https://badgephotos.amazon.com/?uid=${
                                    this.state.popupData.AwardedToAlias
                                  }&Region=Master&FullsizeImage=Yes`}
                                />
                              </Col>
                              <Col xs={7} md={7}>
                                {this.state.popupData.AwardedTo}
                              </Col>
                              <Col xs={2} md={2}>
                                <img
                                  onClick={() =>
                                    this.setState({
                                      openAwarded: !this.state.openAwarded
                                    })
                                  }
                                  className="plusButton"
                                  src={downArrow}
                                />
                              </Col>
                              <Col className="userPosition" xs={9} md={9}>
                                {this.state.popupData.AwardedToLevel
                                  ? this.state.popupData.AwardedToLevel
                                  : "Visual Designer"}
                              </Col>

                              <Col xs={9} md={9}>
                                <Collapse in={this.state.openAwarded}>
                                  <div className="userDesc">
                                    {this.state.popupData.AwardedToFor}
                                  </div>
                                </Collapse>
                              </Col>
                            </Col>
                          </Row>
                        </div>
                      </Modal>
                    </div>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Mutation>
    );
  }
}
export default withRouter(Art);
