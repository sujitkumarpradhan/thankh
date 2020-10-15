import React, { Component } from "react";
import ReactLoading from "react-loading";
import Dropzone from "react-dropzone";
import Drag from "./images/drag.png";

import gql from "graphql-tag";

import { Query, Mutation } from "react-apollo";

import "./Store.css";

const GET_LandingPage = gql`
    query GetLandingPage($id: ID!) {
        getLandingPage(id: $id) {
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
`;
class LandingPageMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            desktopImg: this.props.desktopImg,
            designedBy: this.props.designedBy
                ? this.props.designedBy
                : "Amazon",
            sfUrl: this.props.sfUrl,
            designer: this.props.designer,
            lpUrl: this.props.LandingPageUrl,
            error: null,
            saved: null,
            loading: null,
        };
        this.onDropHandler = this.onDropHandler.bind(this);
        console.log("main sf:", this.props.mainSfUrl);
    }

    onDropHandler = (
        acceptedFiles,
        rejectedFiles,
        updateLandingPage,
        UpdateLastModified,
        platform
    ) => {
        acceptedFiles.forEach((file) => {
            this.setState({ loading: "loading" });
            var formData = new FormData();
            formData.append("data", file);
            const response = fetch(
                `${process.env.REACT_APP_BACKEND_URL}/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            response
                .then((response) => response.json())
                .then(async (response) => {
                    console.log(response.url);
                    platform === "Desktop"
                        ? await updateLandingPage({
                              variables: {
                                  id: this.props.landingPageId,
                                  DesktopImg: response.url,
                              },
                          })
                        : platform === "Tablet"
                        ? await updateLandingPage({
                              variables: {
                                  id: this.props.landingPageId,
                                  TabletImg: response.url,
                              },
                          })
                        : await updateLandingPage({
                              variables: {
                                  id: this.props.landingPageId,
                                  MobileImg: response.url,
                              },
                          });
                    this.setState({ loading: null });
                    UpdateLastModified({
                        variables: {
                            ID: this.props.advertiserID,
                            LastModified: new Date().toGMTString(),
                        },
                    });
                });
        });
    };
    render() {
        return (
            <div>
                <Mutation
                    refetchQueries={[
                        {
                            query: GET_LandingPage,
                            variables: {
                                id: this.props.landingPageId,
                            },
                        },
                    ]}
                    mutation={gql`
                        mutation updateLandingPage(
                            $id: ID!
                            $DesktopImg: String
                            $CreatedBy: String
                            $TabletImg: String
                            $MobileImg: String
                        ) {
                            updateLandingPage(
                                input: {
                                    id: $id
                                    DesktopImg: $DesktopImg
                                    TabletImg: $TabletImg
                                    MobileImg: $MobileImg
                                    CreatedBy: $CreatedBy
                                }
                            ) {
                                id
                            }
                        }
                    `}
                >
                    {(updateLandingPage, { loading, error }) => {
                        if (error) {
                            console.log(error);
                            return (
                                <div>
                                    Image was not saved beacuse of the error:{" "}
                                    {error}.
                                </div>
                            );
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
                                        top: "25vh",
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
                            <Mutation
                                refetchQueries={[
                                    {
                                        query: GET_LandingPage,
                                        variables: {
                                            id: this.props.landingPageId,
                                        },
                                    },
                                ]}
                                mutation={gql`
                                    mutation UpdateLastModified(
                                        $ID: ID!
                                        $LastModified: String
                                    ) {
                                        updateLastModified: updateAdvertiser(
                                            input: {
                                                id: $ID
                                                lastModified: $LastModified
                                                lp: true
                                            }
                                        ) {
                                            id
                                            lastModified
                                            lp
                                        }
                                    }
                                `}
                            >
                                {(UpdateLastModified, { loading }) => {
                                    return (
                                        <Query
                                            query={GET_LandingPage}
                                            variables={{
                                                id: this.props.landingPageId,
                                            }}
                                        >
                                            {({
                                                loading,
                                                error,
                                                data,
                                                getLandingPage,
                                            }) => {
                                                if (error) {
                                                    console.log(error);
                                                    return (
                                                        <div>
                                                            Some error occurred.
                                                        </div>
                                                    );
                                                }

                                                if (loading) {
                                                    return (
                                                        <div
                                                            style={{
                                                                ...styles,
                                                                display: "flex",
                                                                justifyContent:
                                                                    "center",
                                                                alignItems:
                                                                    "center",
                                                                margin:
                                                                    "0 auto",
                                                                position:
                                                                    "relative",
                                                                top: "25vh",
                                                            }}
                                                        >
                                                            <ReactLoading
                                                                type={"bars"}
                                                                color={
                                                                    "#5389b5"
                                                                }
                                                                height={100}
                                                                width={50}
                                                            />
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <div className="details">
                                                            <div className="store_row">
                                                                <label className="designedBy">
                                                                    <span>
                                                                        SF
                                                                        Assignment
                                                                        URL:
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Landing page assignment's SF URL"
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .sfUrl
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            this.setState(
                                                                                {
                                                                                    sfUrl:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            )
                                                                        }
                                                                    ></input>
                                                                </label>
                                                                <label className="designedBy">
                                                                    <span>
                                                                        Preview
                                                                        Link:
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Landing page's preview URL"
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .lpUrl
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    lpUrl:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "url:",
                                                                                this
                                                                                    .state
                                                                                    .lpUrl
                                                                            );
                                                                        }}
                                                                    ></input>
                                                                </label>
                                                                <button
                                                                    className="store_button"
                                                                    onClick={async () => {
                                                                        console.log(
                                                                            "designedBy:",
                                                                            this
                                                                                .state
                                                                                .designedBy
                                                                        );
                                                                        if (
                                                                            this
                                                                                .state
                                                                                .designedBy ===
                                                                            "Advertiser"
                                                                        ) {
                                                                            console.log(
                                                                                "mainSfUrl: ",
                                                                                this
                                                                                    .props
                                                                                    .mainSfUrl
                                                                            );
                                                                            let response = await fetch(
                                                                                `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
                                                                                {
                                                                                    method:
                                                                                        "POST",
                                                                                    body: JSON.stringify(
                                                                                        {
                                                                                            assignmentId: this
                                                                                                .props
                                                                                                .mainSfUrl,
                                                                                        }
                                                                                    ),
                                                                                }
                                                                            );
                                                                            if (
                                                                                response.status ===
                                                                                200
                                                                            ) {
                                                                                response
                                                                                    .json()
                                                                                    .then(
                                                                                        async (
                                                                                            response
                                                                                        ) => {
                                                                                            let aliasToFetch = JSON.parse(
                                                                                                response.rawData
                                                                                            )
                                                                                                .CM_CPM_TAM_Trafficker__c
                                                                                                ? JSON.parse(
                                                                                                      response.rawData
                                                                                                  )
                                                                                                      .CM_CPM_TAM_Trafficker__c
                                                                                                : JSON.parse(
                                                                                                      response.rawData
                                                                                                  )
                                                                                                      .Designer__c;

                                                                                            let designer = await fetch(
                                                                                                `http://adinfoprovider.corp.amazon.com/getSalesforceUserDetails`,
                                                                                                {
                                                                                                    method:
                                                                                                        "POST",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            userId: aliasToFetch,
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                            designer
                                                                                                .json()
                                                                                                .then(
                                                                                                    async (
                                                                                                        designer
                                                                                                    ) => {
                                                                                                        await this.props.onSave(
                                                                                                            this
                                                                                                                .props
                                                                                                                .mainSfUrl,
                                                                                                            designer.userId,
                                                                                                            this
                                                                                                                .state
                                                                                                                .designedBy,
                                                                                                            this
                                                                                                                .state
                                                                                                                .storePassword,
                                                                                                            this
                                                                                                                .state
                                                                                                                .lpUrl
                                                                                                        );
                                                                                                    }
                                                                                                );
                                                                                        }
                                                                                    );
                                                                            } else {
                                                                                this.setState(
                                                                                    {
                                                                                        error:
                                                                                            "Please enter a valid sf url",
                                                                                    }
                                                                                );
                                                                            }
                                                                        } else {
                                                                            let response = await fetch(
                                                                                `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
                                                                                {
                                                                                    method:
                                                                                        "POST",
                                                                                    body: JSON.stringify(
                                                                                        {
                                                                                            assignmentId: this
                                                                                                .state
                                                                                                .sfUrl,
                                                                                        }
                                                                                    ),
                                                                                }
                                                                            );

                                                                            if (
                                                                                response.status ===
                                                                                200
                                                                            ) {
                                                                                response
                                                                                    .json()
                                                                                    .then(
                                                                                        async (
                                                                                            response
                                                                                        ) => {
                                                                                            let aliasToFetch = JSON.parse(
                                                                                                response.rawData
                                                                                            )
                                                                                                .Designer__c;

                                                                                            let designer = await fetch(
                                                                                                `http://adinfoprovider.corp.amazon.com/getSalesforceUserDetails`,
                                                                                                {
                                                                                                    method:
                                                                                                        "POST",
                                                                                                    body: JSON.stringify(
                                                                                                        {
                                                                                                            userId: aliasToFetch,
                                                                                                        }
                                                                                                    ),
                                                                                                }
                                                                                            );
                                                                                            designer
                                                                                                .json()
                                                                                                .then(
                                                                                                    async (
                                                                                                        designer
                                                                                                    ) => {
                                                                                                        await this.props.onSave(
                                                                                                            this
                                                                                                                .state
                                                                                                                .sfUrl,
                                                                                                            designer.userId,
                                                                                                            this
                                                                                                                .state
                                                                                                                .designedBy,
                                                                                                            this
                                                                                                                .state
                                                                                                                .lpUrl
                                                                                                        );
                                                                                                    }
                                                                                                );
                                                                                        }
                                                                                    );
                                                                            } else {
                                                                                this.setState(
                                                                                    {
                                                                                        error:
                                                                                            "Please enter a valid sf url",
                                                                                    }
                                                                                );
                                                                            }
                                                                        }
                                                                        console.log(
                                                                            "designer:",
                                                                            this
                                                                                .state
                                                                                .designer
                                                                        );
                                                                    }}
                                                                >
                                                                    Save
                                                                </button>
                                                                <span>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .error
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div
                                                            style={
                                                                styles.mainDiv
                                                            }
                                                        >
                                                            <div
                                                                style={
                                                                    styles.headline
                                                                }
                                                            >
                                                                Desktop
                                                            </div>
                                                            <Dropzone
                                                                style={{}}
                                                                disableClick={
                                                                    true
                                                                }
                                                                accept="image/*"
                                                                multiple={false}
                                                                onDrop={(
                                                                    acceptedFiles,
                                                                    rejectedFiles
                                                                ) => {
                                                                    this.onDropHandler(
                                                                        acceptedFiles,
                                                                        rejectedFiles,
                                                                        updateLandingPage,
                                                                        UpdateLastModified,
                                                                        "Desktop"
                                                                    );
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        ...styles,
                                                                        display: this
                                                                            .state
                                                                            .loading
                                                                            ? "flex"
                                                                            : "none",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                        margin:
                                                                            "0 auto",
                                                                        position:
                                                                            "absolute",
                                                                        top:
                                                                            "25vh",
                                                                        left:
                                                                            "50vw",
                                                                    }}
                                                                >
                                                                    <ReactLoading
                                                                        type={
                                                                            "bars"
                                                                        }
                                                                        color={
                                                                            "#5389b5"
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                    />
                                                                </div>
                                                                {data
                                                                    .getLandingPage
                                                                    .DesktopImg ? (
                                                                    <div
                                                                        style={{
                                                                            marginBottom: 100,
                                                                        }}
                                                                    >
                                                                        <img
                                                                            style={{
                                                                                width: 1500,
                                                                            }}
                                                                            src={
                                                                                data
                                                                                    .getLandingPage
                                                                                    .DesktopImg
                                                                            }
                                                                        ></img>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <div
                                                                            style={
                                                                                styles.Placeholder
                                                                            }
                                                                        >
                                                                            <img
                                                                                style={
                                                                                    styles.drag
                                                                                }
                                                                                src={
                                                                                    Drag
                                                                                }
                                                                            ></img>
                                                                            Drag
                                                                            and
                                                                            drop
                                                                            your
                                                                            landing
                                                                            page
                                                                            desktop
                                                                            screenshot
                                                                            here
                                                                            <div
                                                                                style={
                                                                                    styles.info
                                                                                }
                                                                            >
                                                                                All
                                                                                fields
                                                                                will
                                                                                be
                                                                                enabled
                                                                                once
                                                                                file
                                                                                is
                                                                                dropped.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                        </div>
                                                        <div
                                                            style={
                                                                styles.mainDiv
                                                            }
                                                        >
                                                            <div
                                                                style={
                                                                    styles.headline
                                                                }
                                                            >
                                                                Tablet Header
                                                            </div>
                                                            <Dropzone
                                                                style={{}}
                                                                disableClick={
                                                                    true
                                                                }
                                                                accept="image/*"
                                                                multiple={false}
                                                                onDrop={(
                                                                    acceptedFiles,
                                                                    rejectedFiles
                                                                ) => {
                                                                    this.onDropHandler(
                                                                        acceptedFiles,
                                                                        rejectedFiles,
                                                                        updateLandingPage,
                                                                        UpdateLastModified,
                                                                        "Tablet"
                                                                    );
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        ...styles,
                                                                        display: this
                                                                            .state
                                                                            .loading
                                                                            ? "flex"
                                                                            : "none",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                        margin:
                                                                            "0 auto",
                                                                        position:
                                                                            "absolute",
                                                                        top:
                                                                            "25vh",
                                                                        left:
                                                                            "50vw",
                                                                    }}
                                                                >
                                                                    <ReactLoading
                                                                        type={
                                                                            "bars"
                                                                        }
                                                                        color={
                                                                            "#5389b5"
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                    />
                                                                </div>
                                                                {data
                                                                    .getLandingPage
                                                                    .TabletImg ? (
                                                                    <div
                                                                        style={{
                                                                            marginBottom: 100,
                                                                        }}
                                                                    >
                                                                        <img
                                                                            style={{
                                                                                width: 1280,
                                                                            }}
                                                                            src={
                                                                                data
                                                                                    .getLandingPage
                                                                                    .TabletImg
                                                                            }
                                                                        ></img>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <div
                                                                            style={{
                                                                                ...styles.Placeholder,
                                                                                width: 1280,
                                                                            }}
                                                                        >
                                                                            <img
                                                                                style={
                                                                                    styles.drag
                                                                                }
                                                                                src={
                                                                                    Drag
                                                                                }
                                                                            ></img>
                                                                            Drag
                                                                            and
                                                                            drop
                                                                            your
                                                                            Tablet
                                                                            header
                                                                            here
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                        </div>
                                                        <div
                                                            style={
                                                                styles.mainDiv
                                                            }
                                                        >
                                                            <div
                                                                style={
                                                                    styles.headline
                                                                }
                                                            >
                                                                Mobile Header
                                                            </div>
                                                            <Dropzone
                                                                style={{}}
                                                                disableClick={
                                                                    true
                                                                }
                                                                accept="image/*"
                                                                multiple={false}
                                                                onDrop={(
                                                                    acceptedFiles,
                                                                    rejectedFiles
                                                                ) => {
                                                                    this.onDropHandler(
                                                                        acceptedFiles,
                                                                        rejectedFiles,
                                                                        updateLandingPage,

                                                                        UpdateLastModified,
                                                                        "Mobile"
                                                                    );
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        ...styles,
                                                                        display: this
                                                                            .state
                                                                            .loading
                                                                            ? "flex"
                                                                            : "none",
                                                                        justifyContent:
                                                                            "center",
                                                                        alignItems:
                                                                            "center",
                                                                        margin:
                                                                            "0 auto",
                                                                        position:
                                                                            "absolute",
                                                                        top:
                                                                            "25vh",
                                                                        left:
                                                                            "50vw",
                                                                    }}
                                                                >
                                                                    <ReactLoading
                                                                        type={
                                                                            "bars"
                                                                        }
                                                                        color={
                                                                            "#5389b5"
                                                                        }
                                                                        height={
                                                                            100
                                                                        }
                                                                        width={
                                                                            50
                                                                        }
                                                                    />
                                                                </div>
                                                                {data
                                                                    .getLandingPage
                                                                    .MobileImg ? (
                                                                    <div
                                                                        style={{
                                                                            marginBottom: 100,
                                                                        }}
                                                                    >
                                                                        <img
                                                                            style={{
                                                                                width: 621,
                                                                            }}
                                                                            src={
                                                                                data
                                                                                    .getLandingPage
                                                                                    .MobileImg
                                                                            }
                                                                        ></img>
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <div
                                                                            style={{
                                                                                ...styles.Placeholder,
                                                                                width: 621,
                                                                            }}
                                                                        >
                                                                            <img
                                                                                style={
                                                                                    styles.drag
                                                                                }
                                                                                src={
                                                                                    Drag
                                                                                }
                                                                            ></img>
                                                                            Drag
                                                                            and
                                                                            drop
                                                                            your
                                                                            Mobile
                                                                            header
                                                                            here
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Dropzone>
                                                        </div>
                                                    </div>
                                                );
                                            }}
                                        </Query>
                                    );
                                }}
                            </Mutation>
                        );
                    }}
                </Mutation>
            </div>
        );
    }
}

const styles = {
    Placement: {
        position: "relative",
        top: "-12px",
        display: "flex",
        justifyContent: "center",
        padding: 20,
    },
    label: {
        paddingLeft: 40,
    },
    headline: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 20,
        color: "#ff9902",
        paddingTop: 20,
    },
    carouselWrapper: {
        padding: "0px",
        position: "relative",
    },
    info: {
        fontSize: 18,
        paddingTop: 15,
    },
    Placeholder: {
        width: 1500,
        height: 600,
        flexDirection: "column",
        backgroundColor: "rgb(228, 253, 191",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        fontSize: 24,
        color: "#3d9872",
        marginBottom: 100,
    },
    drag: {
        width: 240,
        marginBottom: 20,
    },
    addBannerButton: {
        height: 30,
        width: 30,
        backgroundColor: "#207dbb",
        borderRadius: "50%",
        borderColor: "#fff",
        position: "relative",
        cursor: "pointer",
        fontSize: 18,
        color: "#fff",
        top: "30px",
        left: 100,
    },
    addBannerDelete: {
        position: "relative",
        cursor: "pointer",
        fontSize: 14,
        color: "#1b799a",
        top: "-38px",
        left: "150px",
        background: "none",
        border: "none",
    },
    addBannerText: {
        position: "relative",
        paddingLeft: 5,
        fontSize: 12,
        color: "#333",
    },
    count: {
        color: "#999",
        fontSize: "13px",
        paddingBottom: 10,
    },
    dot: {},
};
export default LandingPageMain;
