import React, { Component } from "react";
import "./FireTablet.css";
import SwipeToURL from "../placement/SwipeToURL";
import Page from "../layout/Page";
import ReactLoading from "react-loading";

import gql from "graphql-tag";

import { Query, Mutation } from "react-apollo";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            name
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

const Carousal = ({ children, selected, changeSelected }) => {
    if (!Array.isArray(children)) {
        children = [children];
    }
    return (
        <div style={styles.carouselWrapper}>
            {children.map((child, index) => {
                return (
                    <a
                        key={index}
                        className="dot"
                        style={{
                            ...styles.dot,
                            backgroundColor:
                                selected === index ? "#1175c5" : "#bbb"
                        }}
                        onClick={() => {
                            changeSelected(index);
                        }}
                    >
                        {/* {index + 1} */}
                    </a>
                );
            })}
            <div style={styles.count}>
                showing {selected + 1} of {children.length}
            </div>
            {children[selected]}
        </div>
    );
};

class FireTablet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            onToggleTop: {
                value: "Black"
            },
            onToggleBottom: {
                value: "Black"
            },
            Gen7DeviceAssets: {
                portrait: null,
                landscape: null,
                buttonP: null,
                buttonL: null
            },
            Gen6DeviceAssets: {
                portrait: null,
                landscape: null,
                buttonP: null,
                buttonL: null
            },
            Gen5DeviceAssets: {
                portrait: null,
                landscape: null
            },
            GenMultipleDeviceAssets: {
                landscape: null,
                button: null
            },
            Gen5Vso: {
                portrait: null,
                landscape: null
            },
            comment: null,
            isVisibleCommentIcon: true,
            isApproved: null,
            count: 0
        };
        this.handleToggleTop = this.handleToggleTop.bind(this);
        this.handleToggleBottom = this.handleToggleBottom.bind(this);
        this._onDropHandlerFireTablet = this._onDropHandlerFireTablet.bind(
            this
        );
    }

    _onDropHandlerFireTablet(
        acceptedFiles,
        rejectedFiles,
        updateFireTablet,
        UpdateLastModified,
        id
    ) {
        acceptedFiles.forEach(file => {
            var formData = new FormData();
            formData.append("data", file);
            const response = fetch(
                `${process.env.REACT_APP_BACKEND_URL}/upload`,
                {
                    method: "POST",
                    body: formData
                }
            );
            response
                .then(response => response.json())
                .then(response => {
                    console.log(response.url);
                    this.setState(
                        prevState => {
                            if (
                                file.name.toLowerCase().indexOf("_p.jpg") > -1
                            ) {
                                return {
                                    Gen7DeviceAssets: {
                                        ...prevState.Gen7DeviceAssets,
                                        portrait: response.url
                                    },
                                    Gen6DeviceAssets: {
                                        ...prevState.Gen6DeviceAssets,
                                        portrait: response.url
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_l.jpg") > -1
                            ) {
                                return {
                                    Gen7DeviceAssets: {
                                        ...prevState.Gen7DeviceAssets,
                                        landscape: response.url
                                    },
                                    Gen6DeviceAssets: {
                                        ...prevState.Gen6DeviceAssets,
                                        landscape: response.url
                                    },
                                    GenMultipleDeviceAssets: {
                                        ...prevState.GenMultipleDeviceAssets,
                                        landscape: response.url
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_l.png") > -1
                            ) {
                                return {
                                    Gen7DeviceAssets: {
                                        ...prevState.Gen7DeviceAssets,
                                        buttonL: response.url
                                    },
                                    Gen6DeviceAssets: {
                                        ...prevState.Gen6DeviceAssets,
                                        buttonL: response.url
                                    },
                                    GenMultipleDeviceAssets: {
                                        ...prevState.GenMultipleDeviceAssets,
                                        button: response.url
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_p.png") > -1
                            ) {
                                return {
                                    Gen7DeviceAssets: {
                                        ...prevState.Gen7DeviceAssets,
                                        buttonP: response.url
                                    },
                                    Gen6DeviceAssets: {
                                        ...prevState.Gen6DeviceAssets,
                                        buttonP: response.url
                                    },
                                    GenMultipleDeviceAssets: {
                                        ...prevState.GenMultipleDeviceAssets
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_l5.jpg") > -1
                            ) {
                                return {
                                    Gen5DeviceAssets: {
                                        ...prevState.Gen5DeviceAssets,
                                        landscape: response.url
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_p5.jpg") > -1
                            ) {
                                return {
                                    Gen5DeviceAssets: {
                                        ...prevState.Gen5DeviceAssets,
                                        portrait: response.url
                                    }
                                };
                            } else if (
                                file.name.toLowerCase().indexOf("_vso.jpg") > -1
                            ) {
                                return {
                                    Gen5Vso: {
                                        ...prevState.Gen5Vso,
                                        portrait: response.url
                                    }
                                };
                            }
                        },
                        async () => {
                            await updateFireTablet({
                                variables: {
                                    id: id,
                                    Gen7L: this.state.Gen7DeviceAssets
                                        .landscape,
                                    Gen7P: this.state.Gen7DeviceAssets.portrait,
                                    Gen7LButton: this.state.Gen7DeviceAssets
                                        .buttonL,
                                    Gen7PButton: this.state.Gen7DeviceAssets
                                        .buttonP,
                                    Gen6L: this.state.Gen6DeviceAssets
                                        .landscape,
                                    Gen6P: this.state.Gen6DeviceAssets.portrait,
                                    Gen6LButton: this.state.Gen6DeviceAssets
                                        .buttonL,
                                    Gen6PButton: this.state.Gen6DeviceAssets
                                        .buttonP,
                                    Gen5L: this.state.Gen5DeviceAssets
                                        .landscape,
                                    Gen5P: this.state.Gen5DeviceAssets.portrait,
                                    GenMultiple: this.state
                                        .GenMultipleDeviceAssets.landscape,
                                    GenMultipleButton: this.state
                                        .GenMultipleDeviceAssets.button,

                                    Vso: this.state.Gen5Vso.portrait
                                }
                            });
                            UpdateLastModified({
                                variables: {
                                    ID: this.props.advertiserID,
                                    LastModified: new Date().toGMTString(),
                                    fireTablet: true
                                }
                            });
                        }
                    );
                });
        });
    }

    handleToggleTop(event) {
        this.setState({
            onToggleTop: { value: event.target.value }
        });
    }
    handleToggleBottom(event) {
        this.setState({
            onToggleBottom: { value: event.target.value }
        });
    }
    render() {
        return (
            <Mutation
                refetchQueries={[
                    {
                        query: GET_Advertiser,
                        variables: {
                            id: this.props.advertiserID
                        }
                    }
                ]}
                mutation={gql`
                    mutation CreateFireTablet(
                        $AdvertiserID: ID!
                        $TopInterface: String!
                        $BottomInterface: String!
                        $CreatedDate: String
                    ) {
                        createFireTablet(
                            input: {
                                AdvertiserID: $AdvertiserID
                                TopInterface: $TopInterface
                                BottomInterface: $BottomInterface
                                CreatedDate: $CreatedDate
                            }
                        ) {
                            id
                        }
                    }
                `}
            >
                {(createFireTablet, { loading }) => {
                    return (
                        <Mutation
                            refetchQueries={[
                                {
                                    query: GET_Advertiser,
                                    variables: {
                                        id: this.props.advertiserID
                                    }
                                }
                            ]}
                            mutation={gql`
                                mutation UpdateLastModified(
                                    $ID: ID!
                                    $LastModified: String
                                    $fireTablet: Boolean!
                                ) {
                                    updateLastModified: updateAdvertiser(
                                        input: {
                                            id: $ID
                                            lastModified: $LastModified
                                            fireTablet: $fireTablet
                                        }
                                    ) {
                                        id
                                    }
                                }
                            `}
                        >
                            {(UpdateLastModified, { loading }) => {
                                return (
                                    <Mutation
                                        refetchQueries={[
                                            {
                                                query: GET_Advertiser,
                                                variables: {
                                                    id: this.props.advertiserID
                                                }
                                            }
                                        ]}
                                        mutation={gql`
                                            mutation UpdateApproval(
                                                $ID: String!
                                                $Approval: String
                                            ) {
                                                updateFireTablet(
                                                    input: {
                                                        id: $ID
                                                        Approval: $Approval
                                                    }
                                                ) {
                                                    id
                                                }
                                            }
                                        `}
                                    >
                                        {(updateApproval, { loading }) => {
                                            return (
                                                <Mutation
                                                    refetchQueries={[
                                                        {
                                                            query: GET_Advertiser,
                                                            variables: {
                                                                id: this.props
                                                                    .advertiserID
                                                            }
                                                        }
                                                    ]}
                                                    mutation={gql`
                                                        mutation UpdateComment(
                                                            $ID: String!
                                                            $Comment: String
                                                        ) {
                                                            updateFireTablet(
                                                                input: {
                                                                    id: $ID
                                                                    Comment: $Comment
                                                                }
                                                            ) {
                                                                id
                                                            }
                                                        }
                                                    `}
                                                >
                                                    {(
                                                        updateComment,
                                                        { loading }
                                                    ) => {
                                                        return (
                                                            <Mutation
                                                                refetchQueries={[
                                                                    {
                                                                        query: GET_Advertiser,
                                                                        variables: {
                                                                            id: this
                                                                                .props
                                                                                .advertiserID
                                                                        }
                                                                    }
                                                                ]}
                                                                mutation={gql`
                                                                    mutation UpdateBottomInterface(
                                                                        $id: String!
                                                                        $BottomInterface: String
                                                                    ) {
                                                                        updateFireTablet(
                                                                            input: {
                                                                                id: $id
                                                                                BottomInterface: $BottomInterface
                                                                            }
                                                                        ) {
                                                                            id
                                                                        }
                                                                    }
                                                                `}
                                                            >
                                                                {(
                                                                    UpdateBottomInterface,
                                                                    { loading }
                                                                ) => {
                                                                    return (
                                                                        <Mutation
                                                                            refetchQueries={[
                                                                                {
                                                                                    query: GET_Advertiser,
                                                                                    variables: {
                                                                                        id: this
                                                                                            .props
                                                                                            .advertiserID
                                                                                    }
                                                                                }
                                                                            ]}
                                                                            mutation={gql`
                                                                                mutation UpdateTopInterface(
                                                                                    $id: String!
                                                                                    $TopInterface: String
                                                                                ) {
                                                                                    updateFireTablet(
                                                                                        input: {
                                                                                            id: $id
                                                                                            TopInterface: $TopInterface
                                                                                        }
                                                                                    ) {
                                                                                        id
                                                                                    }
                                                                                }
                                                                            `}
                                                                        >
                                                                            {(
                                                                                UpdateTopInterface,
                                                                                {
                                                                                    loading
                                                                                }
                                                                            ) => {
                                                                                return (
                                                                                    <Mutation
                                                                                        refetchQueries={[
                                                                                            {
                                                                                                query: GET_Advertiser,
                                                                                                variables: {
                                                                                                    id: this
                                                                                                        .props
                                                                                                        .advertiserID
                                                                                                }
                                                                                            }
                                                                                        ]}
                                                                                        mutation={gql`
                                                                                            mutation UpdateFireTablet(
                                                                                                $id: String!
                                                                                                $Gen7L: String
                                                                                                $Gen7P: String
                                                                                                $Gen6L: String
                                                                                                $Gen6P: String
                                                                                                $Gen5L: String
                                                                                                $Gen5P: String
                                                                                                $GenMultiple: String
                                                                                                $Gen7LButton: String
                                                                                                $Gen7PButton: String
                                                                                                $Gen6LButton: String
                                                                                                $Gen6PButton: String
                                                                                                $GenMultipleButton: String
                                                                                                $Vso: String
                                                                                            ) {
                                                                                                updateFireTablet(
                                                                                                    input: {
                                                                                                        id: $id
                                                                                                        Gen7L: $Gen7L
                                                                                                        Gen7P: $Gen7P
                                                                                                        Gen6L: $Gen6L
                                                                                                        Gen6P: $Gen6P
                                                                                                        Gen5L: $Gen5L
                                                                                                        Gen5P: $Gen5P
                                                                                                        GenMultiple: $GenMultiple
                                                                                                        Gen7LButton: $Gen7LButton
                                                                                                        Gen7PButton: $Gen7PButton
                                                                                                        Gen6LButton: $Gen6LButton
                                                                                                        Gen6PButton: $Gen6PButton
                                                                                                        GenMultipleButton: $GenMultipleButton
                                                                                                        Vso: $Vso
                                                                                                    }
                                                                                                ) {
                                                                                                    id
                                                                                                }
                                                                                            }
                                                                                        `}
                                                                                    >
                                                                                        {(
                                                                                            updateFireTablet,
                                                                                            {
                                                                                                loading
                                                                                            }
                                                                                        ) => {
                                                                                            return (
                                                                                                <Mutation
                                                                                                    refetchQueries={[
                                                                                                        {
                                                                                                            query: GET_Advertiser,
                                                                                                            variables: {
                                                                                                                id: this
                                                                                                                    .props
                                                                                                                    .advertiserID
                                                                                                            }
                                                                                                        }
                                                                                                    ]}
                                                                                                    mutation={gql`
                                                                                                        mutation DeleteFireTablet(
                                                                                                            $id: String!
                                                                                                        ) {
                                                                                                            deleteFireTablet(
                                                                                                                input: {
                                                                                                                    id: $id
                                                                                                                }
                                                                                                            ) {
                                                                                                                id
                                                                                                            }
                                                                                                        }
                                                                                                    `}
                                                                                                >
                                                                                                    {(
                                                                                                        deleteFireTablet,
                                                                                                        {
                                                                                                            loading
                                                                                                        }
                                                                                                    ) => {
                                                                                                        return (
                                                                                                            <div
                                                                                                                style={{
                                                                                                                    ...styles.banner,
                                                                                                                    top: this
                                                                                                                        .props
                                                                                                                        .top
                                                                                                                        ? this
                                                                                                                              .props
                                                                                                                              .top
                                                                                                                        : "",
                                                                                                                    left: this
                                                                                                                        .props
                                                                                                                        .left
                                                                                                                        ? this
                                                                                                                              .props
                                                                                                                              .left
                                                                                                                        : ""
                                                                                                                }}
                                                                                                            >
                                                                                                                <Query
                                                                                                                    query={
                                                                                                                        GET_Advertiser
                                                                                                                    }
                                                                                                                    variables={{
                                                                                                                        id: this
                                                                                                                            .props
                                                                                                                            .advertiserID
                                                                                                                    }}
                                                                                                                >
                                                                                                                    {({
                                                                                                                        loading,
                                                                                                                        error,
                                                                                                                        data,
                                                                                                                        getAdvertiser
                                                                                                                    }) => {
                                                                                                                        if (
                                                                                                                            error
                                                                                                                        ) {
                                                                                                                            console.log(
                                                                                                                                error
                                                                                                                            );
                                                                                                                            return (
                                                                                                                                <div>
                                                                                                                                    Some
                                                                                                                                    error
                                                                                                                                    occurred.
                                                                                                                                </div>
                                                                                                                            );
                                                                                                                        }

                                                                                                                        if (
                                                                                                                            loading
                                                                                                                        ) {
                                                                                                                            return (
                                                                                                                                <div
                                                                                                                                    style={{
                                                                                                                                        ...styles,
                                                                                                                                        display:
                                                                                                                                            "flex",
                                                                                                                                        justifyContent:
                                                                                                                                            "center",
                                                                                                                                        alignItems:
                                                                                                                                            "center",
                                                                                                                                        margin:
                                                                                                                                            "0 auto",
                                                                                                                                        position:
                                                                                                                                            "relative",
                                                                                                                                        top:
                                                                                                                                            "25vh"
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
                                                                                                                            );
                                                                                                                        }

                                                                                                                        return (
                                                                                                                            <div>
                                                                                                                                {data
                                                                                                                                    .getAdvertiser
                                                                                                                                    .FireTablet
                                                                                                                                    .items
                                                                                                                                    .length ===
                                                                                                                                    0 && (
                                                                                                                                    <div>
                                                                                                                                        No
                                                                                                                                        FireTablet
                                                                                                                                        Added
                                                                                                                                    </div>
                                                                                                                                )}
                                                                                                                                <div>
                                                                                                                                    {" "}
                                                                                                                                    <button
                                                                                                                                        style={{
                                                                                                                                            ...styles.addBannerButton,
                                                                                                                                            backgroundColor:
                                                                                                                                                [
                                                                                                                                                    ...data
                                                                                                                                                        .getAdvertiser
                                                                                                                                                        .FireTablet
                                                                                                                                                        .items
                                                                                                                                                ]
                                                                                                                                                    .length ===
                                                                                                                                                    7 ||
                                                                                                                                                [
                                                                                                                                                    ...data
                                                                                                                                                        .getAdvertiser
                                                                                                                                                        .FireTablet
                                                                                                                                                        .items
                                                                                                                                                ].filter(
                                                                                                                                                    banner => {
                                                                                                                                                        if (
                                                                                                                                                            banner.Gen7L ===
                                                                                                                                                                null ||
                                                                                                                                                            banner.Gen7P ===
                                                                                                                                                                null ||
                                                                                                                                                            banner.Gen6L ===
                                                                                                                                                                null ||
                                                                                                                                                            banner.Gen6P ===
                                                                                                                                                                null ||
                                                                                                                                                            banner.GenMultiple ===
                                                                                                                                                                null
                                                                                                                                                        ) {
                                                                                                                                                            return true;
                                                                                                                                                        } else if (
                                                                                                                                                            banner.Gen5L !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen5P !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen7L !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen7P !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen6L !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen6P !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.GenMultiple !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen5Vso !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen7LButton !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen7PButton !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen6LButton !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.Gen6PButton !=
                                                                                                                                                                null &&
                                                                                                                                                            banner.GenMultipleButton !==
                                                                                                                                                                null
                                                                                                                                                        ) {
                                                                                                                                                            if (
                                                                                                                                                                !banner.Gen5L.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen5P.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen7L.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen7P.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen6L.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen6P.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.GenMultiple.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen5Vso.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen7LButton.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen7PButton.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen6LButton.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.Gen6PButton.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                ) ||
                                                                                                                                                                !banner.GenMultipleButton.includes(
                                                                                                                                                                    "fugu-files.s3.us-east-2"
                                                                                                                                                                )
                                                                                                                                                            ) {
                                                                                                                                                                return true;
                                                                                                                                                            } else {
                                                                                                                                                                return false;
                                                                                                                                                            }
                                                                                                                                                        } else {
                                                                                                                                                            return false;
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                )
                                                                                                                                                    .length !=
                                                                                                                                                    0
                                                                                                                                                    ? "#dedede"
                                                                                                                                                    : "#207dbb"
                                                                                                                                        }}
                                                                                                                                        disabled={
                                                                                                                                            [
                                                                                                                                                ...data
                                                                                                                                                    .getAdvertiser
                                                                                                                                                    .FireTablet
                                                                                                                                                    .items
                                                                                                                                            ]
                                                                                                                                                .length ===
                                                                                                                                                7 ||
                                                                                                                                            [
                                                                                                                                                ...data
                                                                                                                                                    .getAdvertiser
                                                                                                                                                    .FireTablet
                                                                                                                                                    .items
                                                                                                                                            ].filter(
                                                                                                                                                banner => {
                                                                                                                                                    if (
                                                                                                                                                        banner.Gen7L ===
                                                                                                                                                            null ||
                                                                                                                                                        banner.Gen7P ===
                                                                                                                                                            null ||
                                                                                                                                                        banner.Gen6L ===
                                                                                                                                                            null ||
                                                                                                                                                        banner.Gen6P ===
                                                                                                                                                            null ||
                                                                                                                                                        banner.GenMultiple ===
                                                                                                                                                            null
                                                                                                                                                    ) {
                                                                                                                                                        return true;
                                                                                                                                                    } else if (
                                                                                                                                                        banner.Gen5L !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen5P !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen7L !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen7P !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen6L !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen6P !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.GenMultiple !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen5Vso !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen7LButton !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen7PButton !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen6LButton !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.Gen6PButton !=
                                                                                                                                                            null &&
                                                                                                                                                        banner.GenMultipleButton !==
                                                                                                                                                            null
                                                                                                                                                    ) {
                                                                                                                                                        if (
                                                                                                                                                            !banner.Gen5L.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen5P.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen7L.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen7P.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen6L.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen6P.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.GenMultiple.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen5Vso.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen7LButton.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen7PButton.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen6LButton.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.Gen6PButton.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            ) ||
                                                                                                                                                            !banner.GenMultipleButton.includes(
                                                                                                                                                                "fugu-files.s3.us-east-2"
                                                                                                                                                            )
                                                                                                                                                        ) {
                                                                                                                                                            return true;
                                                                                                                                                        } else {
                                                                                                                                                            return false;
                                                                                                                                                        }
                                                                                                                                                    } else {
                                                                                                                                                        return false;
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            )
                                                                                                                                                .length !=
                                                                                                                                                0
                                                                                                                                        }
                                                                                                                                        onClick={async e => {
                                                                                                                                            await createFireTablet(
                                                                                                                                                {
                                                                                                                                                    variables: {
                                                                                                                                                        AdvertiserID: this
                                                                                                                                                            .props
                                                                                                                                                            .advertiserID,
                                                                                                                                                        TopInterface:
                                                                                                                                                            "Black",
                                                                                                                                                        BottomInterface:
                                                                                                                                                            "Black",
                                                                                                                                                        CreatedDate: new Date().toGMTString()
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                            this.setState(
                                                                                                                                                {
                                                                                                                                                    selected: [
                                                                                                                                                        ...data
                                                                                                                                                            .getAdvertiser
                                                                                                                                                            .FireTablet
                                                                                                                                                            .items
                                                                                                                                                    ]
                                                                                                                                                        .length
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                            UpdateLastModified(
                                                                                                                                                {
                                                                                                                                                    variables: {
                                                                                                                                                        ID: this
                                                                                                                                                            .props
                                                                                                                                                            .advertiserID,
                                                                                                                                                        LastModified: new Date().toGMTString()
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            );
                                                                                                                                        }}
                                                                                                                                    >
                                                                                                                                        +
                                                                                                                                    </button>
                                                                                                                                </div>

                                                                                                                                <Carousal
                                                                                                                                    count={
                                                                                                                                        0
                                                                                                                                    }
                                                                                                                                    selected={
                                                                                                                                        this
                                                                                                                                            .state
                                                                                                                                            .selected
                                                                                                                                    }
                                                                                                                                    changeSelected={i => {
                                                                                                                                        this.setState(
                                                                                                                                            {
                                                                                                                                                selected: i
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                    incrementCount={count => {
                                                                                                                                        this.setState(
                                                                                                                                            {
                                                                                                                                                count: count
                                                                                                                                            }
                                                                                                                                        );
                                                                                                                                    }}
                                                                                                                                >
                                                                                                                                    {[
                                                                                                                                        ...data
                                                                                                                                            .getAdvertiser
                                                                                                                                            .FireTablet
                                                                                                                                            .items
                                                                                                                                    ]
                                                                                                                                        .sort(
                                                                                                                                            (
                                                                                                                                                var1,
                                                                                                                                                var2
                                                                                                                                            ) => {
                                                                                                                                                var a = new Date(
                                                                                                                                                        var1.CreatedDate
                                                                                                                                                    ),
                                                                                                                                                    b = new Date(
                                                                                                                                                        var2.CreatedDate
                                                                                                                                                    );
                                                                                                                                                if (
                                                                                                                                                    a <
                                                                                                                                                    b
                                                                                                                                                )
                                                                                                                                                    return 1;
                                                                                                                                                if (
                                                                                                                                                    a >
                                                                                                                                                    b
                                                                                                                                                )
                                                                                                                                                    return -1;

                                                                                                                                                return 0;
                                                                                                                                            }
                                                                                                                                        )
                                                                                                                                        .reverse()
                                                                                                                                        .map(
                                                                                                                                            FireTablet => {
                                                                                                                                                return (
                                                                                                                                                    <div>
                                                                                                                                                        <button
                                                                                                                                                            style={{
                                                                                                                                                                ...styles.addBannerDelete,

                                                                                                                                                                color:
                                                                                                                                                                    [
                                                                                                                                                                        ...data
                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                            .FireTablet
                                                                                                                                                                            .items
                                                                                                                                                                    ]
                                                                                                                                                                        .length ===
                                                                                                                                                                    1
                                                                                                                                                                        ? "#ccc"
                                                                                                                                                                        : "#1b799a"
                                                                                                                                                            }}
                                                                                                                                                            disabled={
                                                                                                                                                                [
                                                                                                                                                                    ...data
                                                                                                                                                                        .getAdvertiser
                                                                                                                                                                        .FireTablet
                                                                                                                                                                        .items
                                                                                                                                                                ]
                                                                                                                                                                    .length ===
                                                                                                                                                                1
                                                                                                                                                            }
                                                                                                                                                            onClick={async () => {
                                                                                                                                                                await deleteFireTablet(
                                                                                                                                                                    {
                                                                                                                                                                        variables: {
                                                                                                                                                                            id:
                                                                                                                                                                                FireTablet.id
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                                if (
                                                                                                                                                                    [
                                                                                                                                                                        ...data
                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                            .FireTablet
                                                                                                                                                                            .items
                                                                                                                                                                    ]
                                                                                                                                                                        .length ===
                                                                                                                                                                    0
                                                                                                                                                                ) {
                                                                                                                                                                    UpdateLastModified(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                ID: this
                                                                                                                                                                                    .props
                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                LastModified: new Date().toGMTString(),
                                                                                                                                                                                fireTablet: false
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                } else if (
                                                                                                                                                                    [
                                                                                                                                                                        ...data
                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                            .FireTablet
                                                                                                                                                                            .items
                                                                                                                                                                    ].filter(
                                                                                                                                                                        ft => {
                                                                                                                                                                            if (
                                                                                                                                                                                ft.Gen7L ||
                                                                                                                                                                                ft.Gen6L ||
                                                                                                                                                                                ft.Gen5L ||
                                                                                                                                                                                ft.Gen7P ||
                                                                                                                                                                                ft.Gen6P ||
                                                                                                                                                                                ft.Gen5P ||
                                                                                                                                                                                ft.Gen5Vso
                                                                                                                                                                            ) {
                                                                                                                                                                                return true;
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    )
                                                                                                                                                                        .length ===
                                                                                                                                                                    0
                                                                                                                                                                ) {
                                                                                                                                                                    UpdateLastModified(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                ID: this
                                                                                                                                                                                    .props
                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                LastModified: new Date().toGMTString(),
                                                                                                                                                                                fireTablet: false
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                } else {
                                                                                                                                                                    UpdateLastModified(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                ID: this
                                                                                                                                                                                    .props
                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                LastModified: new Date().toGMTString()
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                }
                                                                                                                                                                if (
                                                                                                                                                                    this
                                                                                                                                                                        .state
                                                                                                                                                                        .selected ===
                                                                                                                                                                    [
                                                                                                                                                                        ...data
                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                            .FireTablet
                                                                                                                                                                            .items
                                                                                                                                                                    ]
                                                                                                                                                                        .length -
                                                                                                                                                                        1
                                                                                                                                                                ) {
                                                                                                                                                                    this.setState(
                                                                                                                                                                        {
                                                                                                                                                                            selected:
                                                                                                                                                                                this
                                                                                                                                                                                    .state
                                                                                                                                                                                    .selected -
                                                                                                                                                                                1
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                }
                                                                                                                                                            }}
                                                                                                                                                        >
                                                                                                                                                            <i className="far fa-trash-alt" />
                                                                                                                                                        </button>

                                                                                                                                                        <div className="Placement">
                                                                                                                                                            <label>
                                                                                                                                                                {" "}
                                                                                                                                                                Top
                                                                                                                                                                interface:{" "}
                                                                                                                                                            </label>
                                                                                                                                                            <select
                                                                                                                                                                value={
                                                                                                                                                                    FireTablet.TopInterface
                                                                                                                                                                }
                                                                                                                                                                onChange={async e => {
                                                                                                                                                                    await UpdateTopInterface(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                id:
                                                                                                                                                                                    FireTablet.id,
                                                                                                                                                                                TopInterface:
                                                                                                                                                                                    e
                                                                                                                                                                                        .target
                                                                                                                                                                                        .value
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                    UpdateLastModified(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                ID: this
                                                                                                                                                                                    .props
                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                LastModified: new Date().toGMTString()
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                }}
                                                                                                                                                            >
                                                                                                                                                                <option value="Black">
                                                                                                                                                                    Black
                                                                                                                                                                </option>
                                                                                                                                                                <option value="White">
                                                                                                                                                                    White
                                                                                                                                                                </option>
                                                                                                                                                            </select>
                                                                                                                                                            <label
                                                                                                                                                                style={
                                                                                                                                                                    styles.label
                                                                                                                                                                }
                                                                                                                                                            >
                                                                                                                                                                Bottom
                                                                                                                                                                interface:
                                                                                                                                                            </label>
                                                                                                                                                            <select
                                                                                                                                                                value={
                                                                                                                                                                    FireTablet.BottomInterface
                                                                                                                                                                }
                                                                                                                                                                onChange={async e => {
                                                                                                                                                                    await UpdateBottomInterface(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                id:
                                                                                                                                                                                    FireTablet.id,
                                                                                                                                                                                BottomInterface:
                                                                                                                                                                                    e
                                                                                                                                                                                        .target
                                                                                                                                                                                        .value
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                    UpdateLastModified(
                                                                                                                                                                        {
                                                                                                                                                                            variables: {
                                                                                                                                                                                ID: this
                                                                                                                                                                                    .props
                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                LastModified: new Date().toGMTString()
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    );
                                                                                                                                                                }}
                                                                                                                                                            >
                                                                                                                                                                <option value="Black">
                                                                                                                                                                    Black
                                                                                                                                                                </option>
                                                                                                                                                                <option value="White">
                                                                                                                                                                    White
                                                                                                                                                                </option>
                                                                                                                                                            </select>
                                                                                                                                                        </div>
                                                                                                                                                        <SwipeToURL
                                                                                                                                                            key={
                                                                                                                                                                FireTablet.id
                                                                                                                                                            }
                                                                                                                                                            index={
                                                                                                                                                                FireTablet.id
                                                                                                                                                            }
                                                                                                                                                            locale={
                                                                                                                                                                this
                                                                                                                                                                    .props
                                                                                                                                                                    .locale
                                                                                                                                                            }
                                                                                                                                                            appState={
                                                                                                                                                                FireTablet
                                                                                                                                                            }
                                                                                                                                                            invertedTop={
                                                                                                                                                                FireTablet.TopInterface ===
                                                                                                                                                                "Black"
                                                                                                                                                                    ? false
                                                                                                                                                                    : true
                                                                                                                                                            }
                                                                                                                                                            invertedBottom={
                                                                                                                                                                FireTablet.BottomInterface ===
                                                                                                                                                                "Black"
                                                                                                                                                                    ? false
                                                                                                                                                                    : true
                                                                                                                                                            }
                                                                                                                                                            onDropHandler={(
                                                                                                                                                                acceptedFiles,
                                                                                                                                                                rejectedFiles
                                                                                                                                                            ) => {
                                                                                                                                                                this._onDropHandlerFireTablet(
                                                                                                                                                                    acceptedFiles,
                                                                                                                                                                    rejectedFiles,
                                                                                                                                                                    updateFireTablet,
                                                                                                                                                                    UpdateLastModified,
                                                                                                                                                                    FireTablet.id
                                                                                                                                                                );
                                                                                                                                                            }}
                                                                                                                                                            isApproved={
                                                                                                                                                                FireTablet.Approval
                                                                                                                                                            }
                                                                                                                                                            onApprovalChange={async (
                                                                                                                                                                isApproved,
                                                                                                                                                                type,
                                                                                                                                                                index,
                                                                                                                                                                lastModified
                                                                                                                                                            ) => {
                                                                                                                                                                await updateApproval(
                                                                                                                                                                    {
                                                                                                                                                                        variables: {
                                                                                                                                                                            ID: index,
                                                                                                                                                                            Approval: isApproved
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                    {
                                                                                                                                                                        variables: {
                                                                                                                                                                            ID: this
                                                                                                                                                                                .props
                                                                                                                                                                                .advertiserID,
                                                                                                                                                                            LastModified: new Date().toGMTString()
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                            }}
                                                                                                                                                            comment={
                                                                                                                                                                FireTablet.Comment
                                                                                                                                                            }
                                                                                                                                                            onCommentChange={async (
                                                                                                                                                                comment,
                                                                                                                                                                type,
                                                                                                                                                                index,
                                                                                                                                                                lastModified
                                                                                                                                                            ) => {
                                                                                                                                                                await updateComment(
                                                                                                                                                                    {
                                                                                                                                                                        variables: {
                                                                                                                                                                            ID: index,
                                                                                                                                                                            Comment: comment
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                    {
                                                                                                                                                                        variables: {
                                                                                                                                                                            ID: this
                                                                                                                                                                                .props
                                                                                                                                                                                .advertiserID,
                                                                                                                                                                            LastModified: new Date().toGMTString()
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                );
                                                                                                                                                            }}
                                                                                                                                                            isVisibleCommentIcon={
                                                                                                                                                                true
                                                                                                                                                            }
                                                                                                                                                        />
                                                                                                                                                        <Page />
                                                                                                                                                    </div>
                                                                                                                                                );
                                                                                                                                            }
                                                                                                                                        )}
                                                                                                                                </Carousal>
                                                                                                                            </div>
                                                                                                                        );
                                                                                                                    }}
                                                                                                                </Query>
                                                                                                            </div>
                                                                                                        );
                                                                                                    }}
                                                                                                </Mutation>
                                                                                            );
                                                                                        }}
                                                                                    </Mutation>
                                                                                );
                                                                            }}
                                                                        </Mutation>
                                                                    );
                                                                }}
                                                            </Mutation>
                                                        );
                                                    }}
                                                </Mutation>
                                            );
                                        }}
                                    </Mutation>
                                );
                            }}
                        </Mutation>
                    );
                }}
            </Mutation>
        );
    }
}
const styles = {
    Placement: {
        position: "relative",
        top: "-12px",
        display: "flex",
        justifyContent: "center",
        padding: 20
    },
    label: {
        paddingLeft: 40
    },
    carouselWrapper: {
        padding: "0px",
        position: "relative"
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
        left: 100
    },
    addBannerDelete: {
        position: "relative",
        cursor: "pointer",
        fontSize: 14,
        color: "#1b799a",
        top: "-38px",
        left: "150px",
        background: "none",
        border: "none"
    },
    addBannerText: {
        position: "relative",
        paddingLeft: 5,
        fontSize: 12,
        color: "#333"
    },
    count: {
        color: "#999",
        fontSize: "13px",
        paddingBottom: 10
    },
    dot: {}
};
export default FireTablet;
