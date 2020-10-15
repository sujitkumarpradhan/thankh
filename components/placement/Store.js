import React, { Component } from "react";
import ReactLoading from "react-loading";
import Dropzone from "react-dropzone";
import Drag from "./images/drag.png";

import gql from "graphql-tag";

import { Query, Mutation } from "react-apollo";

import "./Store.css";

const GET_Store = gql`
    query GetStore($id: ID!) {
        getStore(id: $id) {
            PreviewLink
            Password
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
            StoreImg
            DestinationID
        }
    }
`;
class StoreMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeImg: this.props.storeImg,
            designedBy: this.props.designedBy
                ? this.props.designedBy
                : "Advertiser",
            sfUrl: this.props.sfUrl,
            designer: this.props.designer,
            storeUrl: this.props.storeUrl,
            storePassword: this.props.password,
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
        UpdateStore,
        UpdateLastModified
    ) => {
        this.setState({ loading: "loading" });
        acceptedFiles.forEach((file) => {
            var formData = new FormData();
            formData.append("data", file);
            if (file.size < 5e6) {
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

                        await UpdateStore({
                            variables: {
                                id: this.props.storeId,
                                StoreImg: response.url,
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
            }
        });
    };
    render() {
        return (
            <div>
                <Mutation
                    refetchQueries={[
                        {
                            query: GET_Store,
                            variables: {
                                id: this.props.storeId,
                            },
                        },
                    ]}
                    mutation={gql`
                        mutation UpdateStore(
                            $id: ID!
                            $StoreImg: String
                            $CreatedBy: String
                        ) {
                            updateStore(
                                input: {
                                    id: $id
                                    StoreImg: $StoreImg
                                    CreatedBy: $CreatedBy
                                }
                            ) {
                                id
                            }
                        }
                    `}
                >
                    {(UpdateStore, { loading, error }) => {
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
                                        query: GET_Store,
                                        variables: {
                                            id: this.props.storeId,
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
                                                isStore: true
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
                                            query={GET_Store}
                                            variables={{
                                                id: this.props.storeId,
                                            }}
                                        >
                                            {({
                                                loading,
                                                error,
                                                data,
                                                getStore,
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
                                                                        Designed
                                                                        By:
                                                                    </span>
                                                                    <select
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .designedBy
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            this.setState(
                                                                                {
                                                                                    designedBy:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            )
                                                                        }
                                                                        required
                                                                    >
                                                                        <option value="Advertiser">
                                                                            Advertiser
                                                                        </option>
                                                                        <option value="Amazon designer">
                                                                            Amazon
                                                                            Designer
                                                                        </option>
                                                                    </select>
                                                                </label>
                                                                <label
                                                                    className="designedBy"
                                                                    style={{
                                                                        display:
                                                                            this
                                                                                .state
                                                                                .designedBy ===
                                                                            "Amazon designer"
                                                                                ? "flex"
                                                                                : "none",
                                                                    }}
                                                                >
                                                                    <span>
                                                                        SF
                                                                        Assignment
                                                                        URL:
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Store assignment's SF URL"
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
                                                            </div>
                                                            <div className="store_row">
                                                                <label className="designedBy">
                                                                    <span>
                                                                        Preview
                                                                        Link:
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Store page's preview URL"
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .storeUrl
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            this.setState(
                                                                                {
                                                                                    storeUrl:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            );
                                                                            console.log(
                                                                                "url:",
                                                                                this
                                                                                    .state
                                                                                    .storeUrl
                                                                            );
                                                                        }}
                                                                    ></input>
                                                                </label>
                                                                <label className="designedBy">
                                                                    <span>
                                                                        Password:
                                                                    </span>
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Preview password"
                                                                        value={
                                                                            this
                                                                                .state
                                                                                .storePassword
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            this.setState(
                                                                                {
                                                                                    storePassword:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                }
                                                                            )
                                                                        }
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
                                                                                                                .storeUrl
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
                                                                                                                .storePassword,
                                                                                                            this
                                                                                                                .state
                                                                                                                .storeUrl
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
                                                                        UpdateStore,
                                                                        UpdateLastModified
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
                                                                {data.getStore
                                                                    .StoreImg ? (
                                                                    <div>
                                                                        <img
                                                                            style={{
                                                                                width: 1500,
                                                                            }}
                                                                            src={
                                                                                data
                                                                                    .getStore
                                                                                    .StoreImg
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
                                                                            store
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
        fontSize: 34,
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
export default StoreMain;
