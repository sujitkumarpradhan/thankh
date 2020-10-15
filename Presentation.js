import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./Presentation.css";

import gql from "graphql-tag";

import Desktop from "./components/platform/Desktop";
import Tablet from "./components/platform/Tablet";
import Mobile from "./components/platform/Mobile";
import FireTablet from "./components/platform/FireTablet";
import FireTV from "./components/platform/FireTV";
import Destination from "./components/platform/Destination";
import { Link, Route, Switch } from "react-router-dom";

import { Query, Mutation } from "react-apollo";
import ReactLoading from "react-loading";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const GET_Advertiser = gql`
  query GetAdvertiser($id: ID!) {
    getAdvertiser(id: $id) {
      id
      name
      landingPageURL
      designersAlias
      locale
      sfURL
      createdAt
      version
      gateway
      event
      contextual
      MajorEvent
      lastModified
      mGateway
      mEvent
      mContextual
      lp
      fireTablet
      fireTv
      Store {
        items {
          id
          AdvertiserID
          PreviewLink
          Password
          SfURL
          Designer
          CreatedBy
          Approval
          Comments {
            items {
              id
              StoreID
              text
              X
              Y
            }
          }
          CreatedDate
          StoreImg
        }
      }
      Destination {
        items {
          id
          DestinationURLMain
          DestinationURLBackup
          AdvertiserID
          CreativeVersion
        }
      }
      LandingPage {
        items {
          id
          AdvertiserID
          PreviewLink
          SfURL
          Designer
          CreatedBy
          Approval
          Comments {
            items {
              id
              text
              X
              Y
            }
          }
          CreatedDate
          DesktopImg
          MobileImg
          TabletImg
          DestinationID
        }
      }
      BannerCarousel {
        items {
          id
          AdvertiserID
          ASIN
          Platform
          Placement
          SrcMain
          Width
          Height
          CommentMain
          ApprovalMain
          CommentBackup
          ApprovalBackup
          SrcBackup
          CreatedDate
          CreativeVersion
          DestinationID
          contentType
        }
      }
      FireTablet {
        items {
          id
          Gen7L
          Gen7P
          Gen6L
          Gen6P
          Gen5L
          Gen5P
          GenMultiple
          GenMultipleButton
          Gen7LButton
          Gen7PButton
          Gen6LButton
          Gen6PButton
          Vso
          TopInterface
          BottomInterface
          Approval
          Comment
          PaddleText
          CreatedDate
        }
      }
    }
  }
`;

class Presentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.match.params.itemName,
      tabState: this.props.match.params.itemTab,
      title: "Advertiser/Brand",
      sfURL: this.props.match.params.itemSF,
      status: "Not ready"
    };

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleClone = this.handleClone.bind(this);

    console.log(
      "URL CHECK FOR VALIDATION------------------",
      this.props.match.params.itemID
    );
  }

  componentDidMount() {
    // console.log(this.props.location.state.designersAlias);

    if (
      this.props.location.state &&
      this.props.location.state.email &&
      this.props.location.state.email == "false"
    ) {
      alert(
        "There is no banner which is rejected. Please update and try again."
      );
    } else {
      console.log("sfURL: ", this.props.match.params.itemSF);

      fetch(`http://adinfoprovider.corp.amazon.com/getSalesforceDetails`, {
        method: "POST",
        body: JSON.stringify({
          assignmentId: this.props.match.params.itemSF
        })
      }).then(response => {
        response.json().then(response => {
          this.setState({
            status: response.status
          });
          console.log("status: ", this.state.status);
        });
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.name === prevState.name ||
      nextProps.sfURL === prevState.sfURL ||
      nextProps.match.params.itemTab === prevState.tabState
    ) {
      return null;
    }

    if (
      !nextProps.name ||
      !nextProps.sfURL ||
      !nextProps.match.params.itemTab
    ) {
      return null;
    }

    return {
      name: nextProps.name,
      sfURL: nextProps.sfURL,
      tabState: nextProps.match.params.itemTab
    };
  }

  handleTabChange(event) {
    // console.log("tabSate:", this.state.tabState);
    // console.log("Event id:", event.target.id);
    this.props.history.push(
      `/presentation/${event.target.id}/${this.props.match.params.itemName}/${
        this.props.match.params.itemID
      }/${
        this.props.match.params.itemEvent
      }/${this.props.match.params.itemSF.replace(
        "https://ams-amazon.my.salesforce.com/",
        ""
      )}`
    );

    this.setState({
      tabState: event.target.id
    });
  }

  handleClone(data) {
    console.log("Alter============", data.getAdvertiser);

    console.log("Alter1============", data.getAdvertiser.LandingPage);
    confirmAlert({
      title: "Confirm to clone",
      message:
        "Are you sure to clone this presentation link? Once cloning started please do not referesh page or close tab. (Clone is used only when you send the presentation again to tentpole with tentpole revision done)",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.history.push({
              pathname: `/clonepresentation/${this.props.match.params.itemID}`,
              state: {
                data: data.getAdvertiser
              }
            });
          }
        },
        {
          label: "No"
        }
      ]
    });
  }

  render() {
    return (
      <Mutation
        refetchQueries={[
          {
            query: GET_Advertiser,
            variables: {
              id: this.props.match.params.itemID
            }
          }
        ]}
        mutation={gql`
          mutation UpdateAdvertiser($id: ID!, $name: String!) {
            updateAdvertiser(input: { id: $id, name: $name }) {
              id
              name
            }
          }
        `}
      >
        {(updateName, { loading }) => {
          //   <Mutation
          //     refetchQueries={[
          //       {
          //         query: GET_Advertiser,
          //         variables: {
          //           id: this.props.match.params.itemID
          //         }
          //       }
          //     ]}
          //     mutation={gql`
          //       mutation createAdvertiser(
          //         $name: String!
          //         $landingPageURL: String
          //         $designersAlias: String!
          //         $locale: String!
          //         $sfURL: String!
          //         $createdAt: String!
          //         $version: Int!
          //         $gateway: Boolean
          //         $event: Boolean
          //         $contextual: Boolean
          //         $MajorEvent: String!
          //         $lastModified: String!
          //         $mGateway: Boolean
          //         $mEvent: Boolean
          //         $mContextual: Boolean
          //         $lp: Boolean
          //         $fireTablet: Boolean
          //         $fireTv: Boolean
          //       ) {
          //         createAdvertiser(
          //           input: {
          //             name: $name
          //             landingPageURL: $landingPageURL
          //             designersAlias: $designersAlias
          //             locale: $locale
          //             sfURL: $sfURL
          //             createdAt: $createdAt
          //             version: $version
          //             gateway: $gateway
          //             event: $event
          //             contextual: $contextual
          //             MajorEvent: $MajorEvent
          //             lastModified: $lastModified
          //             mGateway: $mGateway
          //             mEvent: $mEvent
          //             mContextual: $mContextual
          //             lp: $lp
          //             fireTablet: $fireTablet
          //             fireTv: $fireTv
          //             Store: $Store
          //           }
          //         ) {
          //           id
          //         }
          //       }
          //     `}
          //   >
          // {(createAdvertiser, { loading }) => {
          return (
            <Query
              query={GET_Advertiser}
              variables={{
                id: this.props.match.params.itemID
              }}
            >
              {({ loading, error, data, getAdvertiser }) => {
                if (error) {
                  console.log(error);
                  return <div>Some error occurred.</div>;
                }

                if (loading) {
                  return (
                    <div
                      style={{
                        ...styles,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "0 auto",
                        position: "relative",
                        top: "25vh"
                      }}
                    >
                      <ReactLoading
                        type={"bars"}
                        color={"#5389b5"}
                        height={100}
                        width={50}
                      />
                    </div>
                  );
                }

                return (
                  <div className="App">
                    {/* <Link to={`/`} style={styles.home} >
                                            Back to home
                                        </Link> */}
                    <span
                      style={styles.home}
                      onClick={e =>
                        this.props.history.push({
                          pathname: `/`,
                          state: {
                            from: this.props.location.pathname
                          }
                        })
                      }
                    >
                      Back to home
                    </span>

                    <span
                      style={{
                        right:
                          this.state.status == "Tentpole revision requested" ||
                          this.state.status == "Tentpole revision in progress"
                            ? 210
                            : 20,
                        ...styles.generate
                      }}
                      onClick={e => {
                        if (
                          !(
                            data.getAdvertiser.gateway ||
                            data.getAdvertiser.event ||
                            data.getAdvertiser.contextual ||
                            data.getAdvertiser.mGateway ||
                            data.getAdvertiser.mEvent ||
                            data.getAdvertiser.mContextual ||
                            data.getAdvertiser.fireTv ||
                            data.getAdvertiser.fireTablet ||
                            data.getAdvertiser.lp
                          )
                        ) {
                          alert(
                            "No creatives added yet, please add a creative and try again."
                          );
                        } else if (
                          [...data.getAdvertiser.Destination.items].filter(
                            destination => {
                              if (
                                destination.DestinationURLMain != null ||
                                destination.DestinationURLBackup != null
                              ) {
                                return true;
                              } else {
                                return false;
                              }
                            }
                          )
                        ) {
                          var dummy = document.createElement("input");
                          document.body.appendChild(dummy);
                          dummy.setAttribute("id", "dummy_id");
                          document.getElementById("dummy_id").value =
                            "http://fugu-reviewer.dssamazon.com/presentation/" +
                            encodeURIComponent(
                              this.props.match.params.itemTab
                            ) +
                            "/" +
                            encodeURIComponent(
                              this.props.match.params.itemName
                            ) +
                            "/" +
                            encodeURIComponent(this.props.match.params.itemID) +
                            "/" +
                            encodeURIComponent(
                              this.props.match.params.itemEvent
                            ) +
                            "/" +
                            encodeURIComponent(this.props.match.params.itemSF);
                          dummy.select();
                          document.execCommand("copy");
                          document.body.removeChild(dummy);
                          prompt(
                            "The review link is generated and copied in your clipboard",

                            "http://fugu-reviewer.dssamazon.com/presentation/" +
                              encodeURIComponent(
                                this.props.match.params.itemTab
                              ) +
                              "/" +
                              encodeURIComponent(
                                this.props.match.params.itemName
                              ) +
                              "/" +
                              encodeURIComponent(
                                this.props.match.params.itemID
                              ) +
                              "/" +
                              encodeURIComponent(
                                this.props.match.params.itemEvent
                              ) +
                              "/" +
                              encodeURIComponent(this.props.match.params.itemSF)
                          );
                        } else {
                          alert(
                            "Please add the destination url to all versions."
                          );
                        }
                      }}
                    >
                      Generate review link
                    </span>

                    <span
                      style={{
                        ...styles.clone,
                        display:
                          this.state.status === `Tentpole Revision Requested` ||
                          this.state.status ===
                            "Tentpole Revision in Progress" ||
                          this.state.status === "Tentpole Approved" ||
                          this.state.status === "Tentpole Approved with Changes"
                            ? "flex"
                            : "none"
                      }}
                      onClick={e => this.handleClone(data)}
                    >
                      Clone Presentation
                    </span>

                    <div
                      className="App-header"
                      style={{
                        display:
                          this.props.match.params.itemEvent === "BFCM"
                            ? "none"
                            : "flex"
                      }}
                    >
                      PrimeDay - Tentpole
                    </div>
                    <div
                      className="App-header"
                      style={{
                        display:
                          this.props.match.params.itemEvent === "BFCM"
                            ? "flex"
                            : "none"
                      }}
                    >
                      BFCM - Tentpole
                    </div>

                    <div className="Brand-header">
                      <span
                        style={styles.pageTitle}
                        value={this.state.name}
                        className="_w_t"
                      >
                        {" "}
                        {this.state.name}{" "}
                      </span>
                      <div className="blockSendButton">
                        <label className="FilterAlt">
                          <span
                            style={{
                              ...styles,

                              color: "#ccc",
                              fontSize: 16,
                              fontWeight: 300
                            }}
                          >
                            Round:{" "}
                          </span>
                          <span
                            style={{
                              ...styles,
                              color: "#1fcdff",
                              fontWeight: 800,
                              fontSize: 16,
                              paddingRight: 30
                            }}
                          >
                            {data.getAdvertiser.version}
                            {"    "}
                          </span>
                          <span
                            style={{
                              ...styles,

                              color: "#ccc",
                              fontSize: 16,
                              fontWeight: 300
                            }}
                          >
                            Status:{" "}
                          </span>
                          <span
                            style={{
                              ...styles,
                              paddingRight: 20,
                              color:
                                this.state.status === "Tentpole approved" ||
                                this.state.status ===
                                  "Tentpole approved with changes"
                                  ? "#0cb781"
                                  : (() => {
                                      switch (this.state.status) {
                                        case "Tentpole revision requested":
                                          return "#de7f39";

                                        case "Tentpole review ready":
                                          return "#e0a7f8";

                                        default:
                                          return "#1fcdff";
                                      }
                                    })(),
                              fontSize: 16
                            }}
                          >
                            {this.state.status}
                          </span>
                        </label>
                        <a
                          href={data.getAdvertiser.sfURL}
                          target="blank"
                          className="sendMailButton"
                        >
                          View Salesforce
                        </a>
                      </div>
                    </div>
                    <div className="Navigation">
                      <a
                        style={{
                          ...styles.NavLink,
                          backgroundColor:
                            this.state.tabState === "Desktop" ? "#283544" : ""
                        }}
                        id="Desktop"
                        href="#"
                        className="navLink"
                        onClick={this.handleTabChange}
                      >
                        Desktop
                      </a>
                      <a
                        style={{
                          ...styles.NavLink,
                          backgroundColor:
                            this.state.tabState === "Mobile" ? "#283544" : ""
                        }}
                        id="Mobile"
                        href="#"
                        className="navLink"
                        onClick={this.handleTabChange}
                      >
                        Mobile
                      </a>

                      <a
                        style={{
                          ...styles.NavLink,
                          backgroundColor:
                            this.state.tabState === "Destination"
                              ? "#283544"
                              : ""
                        }}
                        id="Destination"
                        href="#"
                        className="navLink"
                        onClick={this.handleTabChange}
                      >
                        Destination
                      </a>
                    </div>
                    {this.state.tabState === "Desktop" ? (
                      <Desktop
                        advertiserID={this.props.match.params.itemID}
                        MajorEvent={this.props.match.params.itemEvent}
                        locale={data.getAdvertiser.locale}
                        platform="Desktop"
                        createdAt={data.getAdvertiser.createdAt}
                      />
                    ) : null}
                    {this.state.tabState === "Tablet" ? <Tablet /> : null}
                    {this.state.tabState === "Mobile" ? (
                      <Mobile
                        advertiserID={this.props.match.params.itemID}
                        MajorEvent={this.props.match.params.itemEvent}
                        locale={data.getAdvertiser.locale}
                        platform="Mobile"
                        createdAt={data.getAdvertiser.createdAt}
                      />
                    ) : null}
                    {this.state.tabState === "FireTablet" ? (
                      <FireTablet
                        advertiserID={this.props.match.params.itemID}
                        locale={data.getAdvertiser.locale}
                        createdAt={data.getAdvertiser.createdAt}
                      />
                    ) : null}
                    {this.state.tabState === "FireTV" ? (
                      <FireTV
                        advertiserID={this.props.match.params.itemID}
                        platform="FireTV"
                        createdAt={data.getAdvertiser.createdAt}
                      />
                    ) : null}
                    {this.state.tabState === "Destination" ? (
                      <Destination
                        advertiserID={this.props.match.params.itemID}
                        MajorEvent={this.props.match.params.itemEvent}
                        landingPageURL={data.getAdvertiser.landingPageURL}
                        locale={data.getAdvertiser.locale}
                        platform="Store"
                        createdAt={data.getAdvertiser.createdAt}
                      />
                    ) : null}
                  </div>
                );
              }}
            </Query>
            //         );
            //     }}
            // </Mutation>
          );
        }}
      </Mutation>
    );
  }
}

export default Presentation;

const styles = {
  home: {
    position: "absolute",
    top: 0,
    left: "20px",
    margin: 20,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Helvetica Neue",
    cursor: "pointer"
  },
  generate: {
    position: "absolute",
    top: 0,
    // right: "210px",
    margin: 20,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Helvetica Neue",
    cursor: "pointer"
  },
  clone: {
    position: "absolute",
    top: 0,
    right: "200px",
    margin: 20,
    color: "#fff",
    fontSize: 16,
    fontFamily: "Helvetica Neue",
    cursor: "pointer"
  },
  pageTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: "center",
    display: "block",
    fontSize: "34px",
    fontWeight: "Regular",
    width: "960px",
    border: 0,
    margin: "0 auto",
    fontFamily: "Helvetica Neue",
    color: "#FFf",
    background: "transparent",
    bottom: 0,
    right: 0
  },
  NavLink: {
    textDecoration: "none",
    fontSize: 22,
    color: "#fff"
  }
};
