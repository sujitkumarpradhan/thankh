import React, { Component } from "react";
import Dropzone from "react-dropzone";
import BannerWrapper from "./bannerWrapper";
import "./bannerWrappers.css";
import ReactLoading from "react-loading";
import { ApolloConsumer } from "react-apollo";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";
import Gateway from "../placement/gateway";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            name
            createdAt
            MajorEvent
            lastModified
            BannerCarousel {
                items {
                    id
                    ASIN
                    AdvertiserID
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
            Destination {
                items {
                    id
                    DestinationURLMain
                    DestinationURLBackup
                    AdvertiserID
                    CreativeVersion
                }
            }
        }
    }
`;

const Filter_Banner = gql`
    query ListBanners($DestinationID: ID!) {
        listBannerCarousels(
            filter: { DestinationID: { contains: $DestinationID } }
        ) {
            items {
                id
            }
        }
    }
`;

const Carousal = ({
    children,
    count,
    selected,
    changeSelected,
    incrementCount,
}) => {
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
                                selected === index ? "#1175c5" : "#bbb",
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

class BannerWrappers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            count: 0,
        };
        console.log(props);
        this.increment = this.increment.bind(this);
    }
    increment() {
        this.setState({
            count: this.state.count + 1,
        });
    }

    render() {
        return (
            <ApolloConsumer>
                {(client) => (
                    <Mutation
                        refetchQueries={[
                            {
                                query: GET_Advertiser,
                                variables: {
                                    id: this.props.advertiserID,
                                },
                            },
                        ]}
                        mutation={gql`
                            mutation CreateDestination(
                                $AdvertiserID: ID!
                                $CreativeVersion: Int!
                            ) {
                                Destination: createDestination(
                                    input: {
                                        AdvertiserID: $AdvertiserID
                                        CreativeVersion: $CreativeVersion
                                    }
                                ) {
                                    id
                                }
                            }
                        `}
                    >
                        {(createDestinationURL, { loading, data }) => {
                            return (
                                <Mutation
                                    mutation={gql`
                                        mutation CreateBannerCarousel(
                                            $AdvertiserID: ID!
                                            $CreatedDate: String!
                                            $DestinationID: ID!
                                            $CreativeVersion: Int!
                                        ) {
                                            DG1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 300
                                                    Height: 250
                                                    Placement: "Gateway"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DG2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 970
                                                    Height: 250
                                                    Placement: "Gateway"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DG3: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 3000
                                                    Height: 1200
                                                    Placement: "Gateway"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }

                                            DE1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 980
                                                    Height: 55
                                                    Placement: "Event"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DE2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 970
                                                    Height: 250
                                                    Placement: "Event"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DC1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 300
                                                    Height: 250
                                                    Placement: "Contextual"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DC2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 160
                                                    Height: 600
                                                    Placement: "Contextual"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            DC3: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 970
                                                    Height: 250
                                                    Placement: "Contextual"
                                                    Platform: "Desktop"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }

                                            MG1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 320
                                                    Height: 50
                                                    ASIN: 1
                                                    Placement: "Gateway"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            MG6: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 320
                                                    Height: 50
                                                    ASIN: 2
                                                    Placement: "Gateway"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            MG2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 300
                                                    Height: 250
                                                    Placement: "Gateway"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            # MG3: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 414
                                            #         Height: 150
                                            #         Placement: "Gateway"
                                            #         Platform: "Mobile"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # MG4: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 1280
                                            #         Height: 300
                                            #         Placement: "Gateway"
                                            #         Platform: "Mobile"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }

                                            # MG5: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 1500
                                            #         Height: 600
                                            #         Placement: "Gateway"
                                            #         Platform: "Mobile"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }

                                            ME1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 320
                                                    Height: 50
                                                    ASIN: 1
                                                    Placement: "Event"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            ME6: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 320
                                                    Height: 50
                                                    ASIN: 2
                                                    Placement: "Event"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            ME2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 300
                                                    Height: 250
                                                    Placement: "Event"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            # ME3: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 414
                                            #         Height: 100
                                            #         Placement: "Event"
                                            #         Platform: "Mobile"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # ME4: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 414
                                            #         Height: 125
                                            #         Placement: "Event"
                                            #         Platform: "Mobile"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            ME5: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 970
                                                    Height: 250
                                                    Placement: "Event"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            MC1: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 414
                                                    Height: 125
                                                    Placement: "Contextual"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            MC2: createBannerCarousel(
                                                input: {
                                                    AdvertiserID: $AdvertiserID
                                                    Width: 970
                                                    Height: 250
                                                    Placement: "Contextual"
                                                    Platform: "Mobile"
                                                    DestinationID: $DestinationID
                                                    CreativeVersion: $CreativeVersion
                                                    CreatedDate: $CreatedDate
                                                }
                                            ) {
                                                id
                                            }
                                            # FTV: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 1920
                                            #         Height: 1080
                                            #         Placement: "Gateway"
                                            #         Platform: "FireTV"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # LPD: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 3000
                                            #         Height: 600
                                            #         Placement: "Gateway"
                                            #         Platform: "LandingPage"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # LPT: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 2560
                                            #         Height: 550
                                            #         Placement: "Gateway"
                                            #         Platform: "LandingPage"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # LPM: createBannerCarousel(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         Width: 1242
                                            #         Height: 1000
                                            #         Placement: "Gateway"
                                            #         Platform: "LandingPage"
                                            #         DestinationID: $DestinationID
                                            #         CreativeVersion: $CreativeVersion
                                            #         CreatedDate: $CreatedDate
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                            # FT: createFireTablet(
                                            #     input: {
                                            #         AdvertiserID: $AdvertiserID
                                            #         TopInterface: "Black"
                                            #         BottomInterface: "Black"
                                            #         PaddleText: "Shop now"
                                            #         CreatedDate: $CreatedDate
                                            #         DestinationID: $DestinationID
                                            #     }
                                            # ) {
                                            #     id
                                            # }
                                        }
                                    `}
                                >
                                    {(addBanner, { loading }) => {
                                        return (
                                            <Mutation
                                                refetchQueries={[
                                                    {
                                                        query: GET_Advertiser,
                                                        variables: {
                                                            id: this.props
                                                                .advertiserID,
                                                        },
                                                    },
                                                ]}
                                                mutation={gql`
                                                    mutation UpdateLastModified(
                                                        $ID: ID!
                                                        $LastModified: String
                                                        $gateway: Boolean
                                                        $event: Boolean
                                                        $contextual: Boolean
                                                        $mGateway: Boolean
                                                        $mEvent: Boolean
                                                        $mContextual: Boolean
                                                        $fireTv: Boolean
                                                        $lp: Boolean
                                                    ) {
                                                        updateLastModified: updateAdvertiser(
                                                            input: {
                                                                id: $ID
                                                                lastModified: $LastModified
                                                                gateway: $gateway
                                                                event: $event
                                                                contextual: $contextual
                                                                mGateway: $mGateway
                                                                mEvent: $mEvent
                                                                mContextual: $mContextual
                                                                fireTv: $fireTv
                                                                lp: $lp
                                                            }
                                                        ) {
                                                            id
                                                            lastModified
                                                            gateway
                                                            event
                                                            contextual
                                                            mGateway
                                                            mEvent
                                                            mContextual
                                                            fireTv
                                                            lp
                                                        }
                                                    }
                                                `}
                                            >
                                                {(
                                                    UpdateLastModified,
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
                                                                            .advertiserID,
                                                                    },
                                                                },
                                                            ]}
                                                            mutation={gql`
                                                                mutation UpdateApprovalMain(
                                                                    $ID: ID!
                                                                    $ApprovalMain: String
                                                                ) {
                                                                    updateApprovalMain: updateBannerCarousel(
                                                                        input: {
                                                                            id: $ID
                                                                            ApprovalMain: $ApprovalMain
                                                                        }
                                                                    ) {
                                                                        id
                                                                    }
                                                                }
                                                            `}
                                                        >
                                                            {(
                                                                updateApprovalMain,
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
                                                                                        .advertiserID,
                                                                                },
                                                                            },
                                                                        ]}
                                                                        mutation={gql`
                                                                            mutation UpdateApprovalBackup(
                                                                                $ID: ID!
                                                                                $ApprovalBackup: String
                                                                            ) {
                                                                                updateBannerCarousel(
                                                                                    input: {
                                                                                        id: $ID
                                                                                        ApprovalBackup: $ApprovalBackup
                                                                                    }
                                                                                ) {
                                                                                    id
                                                                                }
                                                                            }
                                                                        `}
                                                                    >
                                                                        {(
                                                                            updateApprovalBackup,
                                                                            {
                                                                                loading,
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
                                                                                                    .advertiserID,
                                                                                            },
                                                                                        },
                                                                                    ]}
                                                                                    mutation={gql`
                                                                                        mutation UpdateCommentMain(
                                                                                            $ID: ID!
                                                                                            $CommentMain: String
                                                                                        ) {
                                                                                            updateBannerCarousel(
                                                                                                input: {
                                                                                                    id: $ID
                                                                                                    CommentMain: $CommentMain
                                                                                                }
                                                                                            ) {
                                                                                                id
                                                                                            }
                                                                                        }
                                                                                    `}
                                                                                >
                                                                                    {(
                                                                                        updateCommentMain,
                                                                                        {
                                                                                            loading,
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
                                                                                                                .advertiserID,
                                                                                                        },
                                                                                                    },
                                                                                                ]}
                                                                                                mutation={gql`
                                                                                                    mutation UpdateCommentBackup(
                                                                                                        $ID: ID!
                                                                                                        $CommentBackup: String
                                                                                                    ) {
                                                                                                        updateBannerCarousel(
                                                                                                            input: {
                                                                                                                id: $ID
                                                                                                                CommentBackup: $CommentBackup
                                                                                                            }
                                                                                                        ) {
                                                                                                            id
                                                                                                        }
                                                                                                    }
                                                                                                `}
                                                                                            >
                                                                                                {(
                                                                                                    updateCommentBackup,
                                                                                                    {
                                                                                                        loading,
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
                                                                                                                            .advertiserID,
                                                                                                                    },
                                                                                                                },
                                                                                                            ]}
                                                                                                            mutation={gql`
                                                                                                                mutation UpdateSrcMain(
                                                                                                                    $ID: ID!
                                                                                                                    $SrcMain: String
                                                                                                                    $contentType: String
                                                                                                                ) {
                                                                                                                    updateBannerCarousel(
                                                                                                                        input: {
                                                                                                                            id: $ID
                                                                                                                            SrcMain: $SrcMain
                                                                                                                            contentType: $contentType
                                                                                                                        }
                                                                                                                    ) {
                                                                                                                        id
                                                                                                                    }
                                                                                                                }
                                                                                                            `}
                                                                                                        >
                                                                                                            {(
                                                                                                                updateSrcMain,
                                                                                                                {
                                                                                                                    loading,
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
                                                                                                                                        .advertiserID,
                                                                                                                                },
                                                                                                                            },
                                                                                                                        ]}
                                                                                                                        mutation={gql`
                                                                                                                            mutation UpdateSrcBackup(
                                                                                                                                $ID: ID!
                                                                                                                                $SrcBackup: String
                                                                                                                            ) {
                                                                                                                                updateBannerCarousel(
                                                                                                                                    input: {
                                                                                                                                        id: $ID
                                                                                                                                        SrcBackup: $SrcBackup
                                                                                                                                    }
                                                                                                                                ) {
                                                                                                                                    id
                                                                                                                                }
                                                                                                                            }
                                                                                                                        `}
                                                                                                                    >
                                                                                                                        {(
                                                                                                                            updateSrcBackup,
                                                                                                                            {
                                                                                                                                loading,
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
                                                                                                                                                    .advertiserID,
                                                                                                                                            },
                                                                                                                                        },
                                                                                                                                    ]}
                                                                                                                                    mutation={gql`
                                                                                                                                        mutation updateDestinationMain(
                                                                                                                                            $ID: String!
                                                                                                                                            $DestinationURLMain: String
                                                                                                                                        ) {
                                                                                                                                            updateDestinationURL(
                                                                                                                                                input: {
                                                                                                                                                    id: $ID
                                                                                                                                                    DestinationURLMain: $DestinationURLMain
                                                                                                                                                }
                                                                                                                                            ) {
                                                                                                                                                id
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    `}
                                                                                                                                >
                                                                                                                                    {(
                                                                                                                                        updateDestinationMain,
                                                                                                                                        {
                                                                                                                                            loading,
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
                                                                                                                                                                .advertiserID,
                                                                                                                                                        },
                                                                                                                                                    },
                                                                                                                                                ]}
                                                                                                                                                mutation={gql`
                                                                                                                                                    mutation updateDestinationBackup(
                                                                                                                                                        $ID: String!
                                                                                                                                                        $DestinationURLBackup: String
                                                                                                                                                    ) {
                                                                                                                                                        updateDestinationURL(
                                                                                                                                                            input: {
                                                                                                                                                                id: $ID
                                                                                                                                                                DestinationURLBackup: $DestinationURLBackup
                                                                                                                                                            }
                                                                                                                                                        ) {
                                                                                                                                                            id
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                `}
                                                                                                                                            >
                                                                                                                                                {(
                                                                                                                                                    updateDestinationBackup,
                                                                                                                                                    {
                                                                                                                                                        loading,
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
                                                                                                                                                                            .advertiserID,
                                                                                                                                                                    },
                                                                                                                                                                },
                                                                                                                                                            ]}
                                                                                                                                                            mutation={gql`
                                                                                                                                                                mutation DeleteBanner(
                                                                                                                                                                    $id: ID!
                                                                                                                                                                ) {
                                                                                                                                                                    deleteBannerCarousel(
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
                                                                                                                                                                deleteBanner,
                                                                                                                                                                {
                                                                                                                                                                    loading,
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
                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                },
                                                                                                                                                                            },
                                                                                                                                                                        ]}
                                                                                                                                                                        mutation={gql`
                                                                                                                                                                            mutation DeleteDestination(
                                                                                                                                                                                $id: ID!
                                                                                                                                                                            ) {
                                                                                                                                                                                deleteDestination(
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
                                                                                                                                                                            deleteDestination,
                                                                                                                                                                            {
                                                                                                                                                                                loading,
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
                                                                                                                                                                                            : "",
                                                                                                                                                                                    }}
                                                                                                                                                                                >
                                                                                                                                                                                    <Query
                                                                                                                                                                                        query={
                                                                                                                                                                                            GET_Advertiser
                                                                                                                                                                                        }
                                                                                                                                                                                        variables={{
                                                                                                                                                                                            id: this
                                                                                                                                                                                                .props
                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                        }}
                                                                                                                                                                                    >
                                                                                                                                                                                        {({
                                                                                                                                                                                            loading,
                                                                                                                                                                                            error,
                                                                                                                                                                                            data,
                                                                                                                                                                                            getAdvertiser,
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
                                                                                                                                                                                                                "25vh",
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
                                                                                                                                                                                                        .BannerCarousel
                                                                                                                                                                                                        .items
                                                                                                                                                                                                        .length ===
                                                                                                                                                                                                        0 && (
                                                                                                                                                                                                        <div>
                                                                                                                                                                                                            No
                                                                                                                                                                                                            Banner
                                                                                                                                                                                                            Added
                                                                                                                                                                                                        </div>
                                                                                                                                                                                                    )}
                                                                                                                                                                                                    <div>
                                                                                                                                                                                                        {" "}
                                                                                                                                                                                                        <button
                                                                                                                                                                                                            disabled={
                                                                                                                                                                                                                [
                                                                                                                                                                                                                    ...data
                                                                                                                                                                                                                        .getAdvertiser
                                                                                                                                                                                                                        .BannerCarousel
                                                                                                                                                                                                                        .items,
                                                                                                                                                                                                                ].filter(
                                                                                                                                                                                                                    (
                                                                                                                                                                                                                        banner
                                                                                                                                                                                                                    ) => {
                                                                                                                                                                                                                        if (
                                                                                                                                                                                                                            banner.Platform ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .platform &&
                                                                                                                                                                                                                            banner.Placement ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .placement &&
                                                                                                                                                                                                                            banner.Width ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .width &&
                                                                                                                                                                                                                            banner.Height ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .height
                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                            return true;
                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                            return false;
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                )
                                                                                                                                                                                                                    .length ===
                                                                                                                                                                                                                    10 ||
                                                                                                                                                                                                                [
                                                                                                                                                                                                                    ...data
                                                                                                                                                                                                                        .getAdvertiser
                                                                                                                                                                                                                        .BannerCarousel
                                                                                                                                                                                                                        .items,
                                                                                                                                                                                                                ].filter(
                                                                                                                                                                                                                    (
                                                                                                                                                                                                                        banner
                                                                                                                                                                                                                    ) => {
                                                                                                                                                                                                                        if (
                                                                                                                                                                                                                            banner.Platform ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .platform &&
                                                                                                                                                                                                                            banner.Placement ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .placement &&
                                                                                                                                                                                                                            banner.Width ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .width &&
                                                                                                                                                                                                                            banner.Height ===
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .height
                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                banner.SrcMain ===
                                                                                                                                                                                                                                null
                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                !banner.SrcMain.includes(
                                                                                                                                                                                                                                    "fugu-files.s3."
                                                                                                                                                                                                                                )
                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                console.log(
                                                                                                                                                                                                                                    "banner Src:",
                                                                                                                                                                                                                                    banner.SrcMain
                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                banner.SrcBackup !=
                                                                                                                                                                                                                                null
                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                    !banner.SrcBackup.includes(
                                                                                                                                                                                                                                        "fugu-files.s3."
                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                }
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
                                                                                                                                                                                                            style={{
                                                                                                                                                                                                                ...styles.addBannerButton,
                                                                                                                                                                                                                opacity:
                                                                                                                                                                                                                    [
                                                                                                                                                                                                                        ...data
                                                                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                                                                            .BannerCarousel
                                                                                                                                                                                                                            .items,
                                                                                                                                                                                                                    ].filter(
                                                                                                                                                                                                                        (
                                                                                                                                                                                                                            banner
                                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                banner.Platform ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .platform &&
                                                                                                                                                                                                                                banner.Placement ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .placement &&
                                                                                                                                                                                                                                banner.Width ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .width &&
                                                                                                                                                                                                                                banner.Height ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .height
                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                return false;
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        }
                                                                                                                                                                                                                    )
                                                                                                                                                                                                                        .length ===
                                                                                                                                                                                                                        10 ||
                                                                                                                                                                                                                    [
                                                                                                                                                                                                                        ...data
                                                                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                                                                            .BannerCarousel
                                                                                                                                                                                                                            .items,
                                                                                                                                                                                                                    ].filter(
                                                                                                                                                                                                                        (
                                                                                                                                                                                                                            banner
                                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                banner.Platform ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .platform &&
                                                                                                                                                                                                                                banner.Placement ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .placement &&
                                                                                                                                                                                                                                banner.Width ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .width &&
                                                                                                                                                                                                                                banner.Height ===
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .height
                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                    banner.SrcMain ===
                                                                                                                                                                                                                                    null
                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                } else if (
                                                                                                                                                                                                                                    !banner.SrcMain.includes(
                                                                                                                                                                                                                                        "fugu-files.s3."
                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                } else if (
                                                                                                                                                                                                                                    banner.SrcBackup !=
                                                                                                                                                                                                                                    null
                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                        !banner.SrcBackup.includes(
                                                                                                                                                                                                                                            "fugu-files.s3."
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        return true;
                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                        return false;
                                                                                                                                                                                                                                    }
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
                                                                                                                                                                                                                        ? "0.3"
                                                                                                                                                                                                                        : "1",
                                                                                                                                                                                                            }}
                                                                                                                                                                                                            onClick={async (
                                                                                                                                                                                                                e
                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                const Destination = await createDestinationURL(
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                            AdvertiserID: this
                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                            CreativeVersion:
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .state
                                                                                                                                                                                                                                    .selected +
                                                                                                                                                                                                                                2,
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                );
                                                                                                                                                                                                                await addBanner(
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                            AdvertiserID: this
                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                .advertiserID,

                                                                                                                                                                                                                            CreatedDate: new Date().toGMTString(),
                                                                                                                                                                                                                            CreativeVersion:
                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                    .state
                                                                                                                                                                                                                                    .selected +
                                                                                                                                                                                                                                2,
                                                                                                                                                                                                                            DestinationID:
                                                                                                                                                                                                                                Destination
                                                                                                                                                                                                                                    .data
                                                                                                                                                                                                                                    .Destination
                                                                                                                                                                                                                                    .id,
                                                                                                                                                                                                                        },
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                );

                                                                                                                                                                                                                this.setState(
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        selected: [
                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width &&
                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .height
                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                        )
                                                                                                                                                                                                                            .length,
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                );
                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                    {
                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                            LastModified: new Date().toGMTString(),
                                                                                                                                                                                                                        },
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
                                                                                                                                                                                                        changeSelected={(
                                                                                                                                                                                                            i
                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                            this.setState(
                                                                                                                                                                                                                {
                                                                                                                                                                                                                    selected: i,
                                                                                                                                                                                                                }
                                                                                                                                                                                                            );
                                                                                                                                                                                                        }}
                                                                                                                                                                                                        incrementCount={(
                                                                                                                                                                                                            count
                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                            this.setState(
                                                                                                                                                                                                                {
                                                                                                                                                                                                                    count: count,
                                                                                                                                                                                                                }
                                                                                                                                                                                                            );
                                                                                                                                                                                                        }}
                                                                                                                                                                                                    >
                                                                                                                                                                                                        {[
                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                .items,
                                                                                                                                                                                                        ]
                                                                                                                                                                                                            .filter(
                                                                                                                                                                                                                (
                                                                                                                                                                                                                    banner
                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                        banner.ASIN
                                                                                                                                                                                                                            ? banner.ASIN ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .asin &&
                                                                                                                                                                                                                              banner.Platform ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .platform &&
                                                                                                                                                                                                                              banner.Placement ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .placement &&
                                                                                                                                                                                                                              banner.Width ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .width &&
                                                                                                                                                                                                                              banner.Height ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .height
                                                                                                                                                                                                                            : banner.Platform ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .platform &&
                                                                                                                                                                                                                              banner.Placement ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .placement &&
                                                                                                                                                                                                                              banner.Width ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .width &&
                                                                                                                                                                                                                              banner.Height ===
                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                      .height
                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                        return true;
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        return false;
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                }
                                                                                                                                                                                                            )
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
                                                                                                                                                                                                                (
                                                                                                                                                                                                                    banner,
                                                                                                                                                                                                                    index
                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                    return (
                                                                                                                                                                                                                        <div
                                                                                                                                                                                                                            key={
                                                                                                                                                                                                                                index
                                                                                                                                                                                                                            }
                                                                                                                                                                                                                            style={{
                                                                                                                                                                                                                                ...styles.deleteWrapper,
                                                                                                                                                                                                                                top: this
                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                    .paddingCarousel
                                                                                                                                                                                                                                    ? "-10px"
                                                                                                                                                                                                                                    : "-20px",
                                                                                                                                                                                                                            }}
                                                                                                                                                                                                                        >
                                                                                                                                                                                                                            <button
                                                                                                                                                                                                                                disabled={
                                                                                                                                                                                                                                    [
                                                                                                                                                                                                                                        ...data
                                                                                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                                                                                            .BannerCarousel
                                                                                                                                                                                                                                            .items,
                                                                                                                                                                                                                                    ].filter(
                                                                                                                                                                                                                                        (
                                                                                                                                                                                                                                            banner
                                                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                                banner.Platform ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .platform &&
                                                                                                                                                                                                                                                banner.Placement ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .placement &&
                                                                                                                                                                                                                                                banner.Width ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .width &&
                                                                                                                                                                                                                                                banner.Height ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .height &&
                                                                                                                                                                                                                                                banner.Height !=
                                                                                                                                                                                                                                                    50 &&
                                                                                                                                                                                                                                                banner.Width !=
                                                                                                                                                                                                                                                    320
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                return false;
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                        .length ===
                                                                                                                                                                                                                                        1 ||
                                                                                                                                                                                                                                    [
                                                                                                                                                                                                                                        ...data
                                                                                                                                                                                                                                            .getAdvertiser
                                                                                                                                                                                                                                            .BannerCarousel
                                                                                                                                                                                                                                            .items,
                                                                                                                                                                                                                                    ].filter(
                                                                                                                                                                                                                                        (
                                                                                                                                                                                                                                            banner
                                                                                                                                                                                                                                        ) => {
                                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                                banner.Platform ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .platform &&
                                                                                                                                                                                                                                                banner.Placement ===
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .placement &&
                                                                                                                                                                                                                                                banner.Height ===
                                                                                                                                                                                                                                                    50 &&
                                                                                                                                                                                                                                                banner.Width ===
                                                                                                                                                                                                                                                    320
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                return true;
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                return false;
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                        .length ===
                                                                                                                                                                                                                                        2
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                style={{
                                                                                                                                                                                                                                    ...styles.addBannerDelete,
                                                                                                                                                                                                                                    left:
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width ===
                                                                                                                                                                                                                                            414 ||
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width ===
                                                                                                                                                                                                                                            1920 ||
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width ===
                                                                                                                                                                                                                                            1280 ||
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width ===
                                                                                                                                                                                                                                            1500 ||
                                                                                                                                                                                                                                        (this
                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                            .width ===
                                                                                                                                                                                                                                            970 &&
                                                                                                                                                                                                                                            this
                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                .platform ===
                                                                                                                                                                                                                                                "Mobile")
                                                                                                                                                                                                                                            ? "180px"
                                                                                                                                                                                                                                            : this
                                                                                                                                                                                                                                                  .props
                                                                                                                                                                                                                                                  .platform ===
                                                                                                                                                                                                                                                  "LandingPage" ||
                                                                                                                                                                                                                                              (this
                                                                                                                                                                                                                                                  .props
                                                                                                                                                                                                                                                  .placement ===
                                                                                                                                                                                                                                                  "Gateway" &&
                                                                                                                                                                                                                                                  this
                                                                                                                                                                                                                                                      .props
                                                                                                                                                                                                                                                      .width ===
                                                                                                                                                                                                                                                      3000)
                                                                                                                                                                                                                                            ? this
                                                                                                                                                                                                                                                  .props
                                                                                                                                                                                                                                                  .width /
                                                                                                                                                                                                                                                  4 -
                                                                                                                                                                                                                                              100
                                                                                                                                                                                                                                            : this
                                                                                                                                                                                                                                                  .props
                                                                                                                                                                                                                                                  .width /
                                                                                                                                                                                                                                                  2 -
                                                                                                                                                                                                                                              10,
                                                                                                                                                                                                                                    top: this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .paddingCarousel
                                                                                                                                                                                                                                        ? "-30px"
                                                                                                                                                                                                                                        : "",
                                                                                                                                                                                                                                    opacity:
                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .width &&
                                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .height &&
                                                                                                                                                                                                                                                    banner.Height !=
                                                                                                                                                                                                                                                        50 &&
                                                                                                                                                                                                                                                    banner.Width !=
                                                                                                                                                                                                                                                        320
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                            .length ===
                                                                                                                                                                                                                                            1 ||
                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                                        50 &&
                                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                                        320
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                            .length ===
                                                                                                                                                                                                                                            2
                                                                                                                                                                                                                                            ? "0.3"
                                                                                                                                                                                                                                            : "1",
                                                                                                                                                                                                                                    cursor:
                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .width &&
                                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .height &&
                                                                                                                                                                                                                                                    banner.Height !=
                                                                                                                                                                                                                                                        50 &&
                                                                                                                                                                                                                                                    banner.Width !=
                                                                                                                                                                                                                                                        320
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                            .length ===
                                                                                                                                                                                                                                            1 ||
                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                                        50 &&
                                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                                        320
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                            .length ===
                                                                                                                                                                                                                                            2
                                                                                                                                                                                                                                            ? "default"
                                                                                                                                                                                                                                            : "pointer",
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                onClick={async (
                                                                                                                                                                                                                                    e
                                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                                    const dataNew = await client.query(
                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                            query: GET_Advertiser,
                                                                                                                                                                                                                                            variables: {
                                                                                                                                                                                                                                                id: this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .advertiserID,
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                    await dataNew.data.getAdvertiser.BannerCarousel.items
                                                                                                                                                                                                                                        .filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                bannerlist
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    bannerlist.DestinationID ===
                                                                                                                                                                                                                                                    banner.DestinationID
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                        .map(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                item
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                deleteBanner(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            id:
                                                                                                                                                                                                                                                                item.id,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                    await deleteDestination(
                                                                                                                                                                                                                                        {
                                                                                                                                                                                                                                            variables: {
                                                                                                                                                                                                                                                id:
                                                                                                                                                                                                                                                    banner.DestinationID,
                                                                                                                                                                                                                                            },
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    );

                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                            .state
                                                                                                                                                                                                                                            .selected ===
                                                                                                                                                                                                                                        [
                                                                                                                                                                                                                                            ...data
                                                                                                                                                                                                                                                .getAdvertiser
                                                                                                                                                                                                                                                .BannerCarousel
                                                                                                                                                                                                                                                .items,
                                                                                                                                                                                                                                        ].filter(
                                                                                                                                                                                                                                            (
                                                                                                                                                                                                                                                banner
                                                                                                                                                                                                                                            ) => {
                                                                                                                                                                                                                                                if (
                                                                                                                                                                                                                                                    banner.Platform ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .platform &&
                                                                                                                                                                                                                                                    banner.Placement ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .placement &&
                                                                                                                                                                                                                                                    banner.Width ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .width &&
                                                                                                                                                                                                                                                    banner.Height ===
                                                                                                                                                                                                                                                        this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .height
                                                                                                                                                                                                                                                ) {
                                                                                                                                                                                                                                                    return true;
                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                    return false;
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        )
                                                                                                                                                                                                                                            .length -
                                                                                                                                                                                                                                            1
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        this.setState(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                selected:
                                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                                        .state
                                                                                                                                                                                                                                                        .selected -
                                                                                                                                                                                                                                                    1,
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                <i className="far fa-trash-alt" />
                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                            <BannerWrapper
                                                                                                                                                                                                                                key={
                                                                                                                                                                                                                                    banner.id
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                platform={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .platform
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                ASIN={
                                                                                                                                                                                                                                    banner.ASIN
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                asin={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .asin
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                contentType={
                                                                                                                                                                                                                                    banner.contentType
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                placement={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .placement
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                advertiserID={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .advertiserID
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                CreativeVersion={
                                                                                                                                                                                                                                    banner.CreativeVersion
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                key={
                                                                                                                                                                                                                                    banner.id
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                index={
                                                                                                                                                                                                                                    banner.id
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                DestinationID={
                                                                                                                                                                                                                                    banner.DestinationID
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                indexDestination={
                                                                                                                                                                                                                                    banner.DestinationID
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                width={
                                                                                                                                                                                                                                    banner.Width
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                height={
                                                                                                                                                                                                                                    banner.Height
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                isVisibleCommentIcon={
                                                                                                                                                                                                                                    true
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                isApprovedMain={
                                                                                                                                                                                                                                    banner.ApprovalMain
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                isApprovedBackup={
                                                                                                                                                                                                                                    banner.ApprovalBackup
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                commentMain={
                                                                                                                                                                                                                                    banner.CommentMain
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                commentBackup={
                                                                                                                                                                                                                                    banner.commentBackup
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                onSrcChange={async (
                                                                                                                                                                                                                                    src,
                                                                                                                                                                                                                                    type,
                                                                                                                                                                                                                                    index,
                                                                                                                                                                                                                                    lastModified,
                                                                                                                                                                                                                                    contentType
                                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "main"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateSrcMain(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    SrcMain: src,
                                                                                                                                                                                                                                                    contentType: contentType,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        if (
                                                                                                                                                                                                                                            this
                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                .platform ===
                                                                                                                                                                                                                                            "Desktop"
                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                            console.log(
                                                                                                                                                                                                                                                "inside desktop"
                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Gateway"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                console.log(
                                                                                                                                                                                                                                                    "inside gateway"
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            gateway: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Event"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            event: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Contextual"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            contextual: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        } else if (
                                                                                                                                                                                                                                            this
                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                .platform ===
                                                                                                                                                                                                                                            "Mobile"
                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                            if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Gateway"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            mGateway: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Event"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            mEvent: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            } else if (
                                                                                                                                                                                                                                                this
                                                                                                                                                                                                                                                    .props
                                                                                                                                                                                                                                                    .placement ===
                                                                                                                                                                                                                                                "Contextual"
                                                                                                                                                                                                                                            ) {
                                                                                                                                                                                                                                                UpdateLastModified(
                                                                                                                                                                                                                                                    {
                                                                                                                                                                                                                                                        variables: {
                                                                                                                                                                                                                                                            ID: this
                                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                                .advertiserID,
                                                                                                                                                                                                                                                            LastModified: lastModified,
                                                                                                                                                                                                                                                            mContextual: true,
                                                                                                                                                                                                                                                        },
                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        } else if (
                                                                                                                                                                                                                                            this
                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                .platform ===
                                                                                                                                                                                                                                            "FireTV"
                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                            UpdateLastModified(
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                    variables: {
                                                                                                                                                                                                                                                        ID: this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .advertiserID,
                                                                                                                                                                                                                                                        LastModified: lastModified,
                                                                                                                                                                                                                                                        fireTv: true,
                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                        } else if (
                                                                                                                                                                                                                                            this
                                                                                                                                                                                                                                                .props
                                                                                                                                                                                                                                                .platform ===
                                                                                                                                                                                                                                            "LandingPage"
                                                                                                                                                                                                                                        ) {
                                                                                                                                                                                                                                            UpdateLastModified(
                                                                                                                                                                                                                                                {
                                                                                                                                                                                                                                                    variables: {
                                                                                                                                                                                                                                                        ID: this
                                                                                                                                                                                                                                                            .props
                                                                                                                                                                                                                                                            .advertiserID,
                                                                                                                                                                                                                                                        LastModified: lastModified,
                                                                                                                                                                                                                                                        lp: true,
                                                                                                                                                                                                                                                    },
                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                    } else if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "backup"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateSrcBackup(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    SrcBackup: src,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        UpdateLastModified(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                                                                                    LastModified: lastModified,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                onApprovalChange={async (
                                                                                                                                                                                                                                    isApproved,
                                                                                                                                                                                                                                    type,
                                                                                                                                                                                                                                    index,
                                                                                                                                                                                                                                    lastModified
                                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "main"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateApprovalMain(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    ApprovalMain: isApproved,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );

                                                                                                                                                                                                                                        UpdateLastModified(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                                                                                    LastModified: lastModified,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    } else if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "backup"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateApprovalBackup(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    ApprovalBackup: isApproved,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        UpdateLastModified(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                                                                                    LastModified: lastModified,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                onCommentChange={async (
                                                                                                                                                                                                                                    comment,
                                                                                                                                                                                                                                    type,
                                                                                                                                                                                                                                    index,
                                                                                                                                                                                                                                    lastModified
                                                                                                                                                                                                                                ) => {
                                                                                                                                                                                                                                    if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "main"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateCommentMain(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    CommentMain: comment,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        UpdateLastModified(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                                                                                    LastModified: lastModified,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    } else if (
                                                                                                                                                                                                                                        type ===
                                                                                                                                                                                                                                        "backup"
                                                                                                                                                                                                                                    ) {
                                                                                                                                                                                                                                        await updateCommentBackup(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: index,
                                                                                                                                                                                                                                                    CommentBackup: comment,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                        UpdateLastModified(
                                                                                                                                                                                                                                            {
                                                                                                                                                                                                                                                variables: {
                                                                                                                                                                                                                                                    ID: this
                                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                                        .advertiserID,
                                                                                                                                                                                                                                                    LastModified: lastModified,
                                                                                                                                                                                                                                                },
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                bannerSrc={
                                                                                                                                                                                                                                    banner.SrcMain
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                backupBannerSrc={
                                                                                                                                                                                                                                    banner.SrcBackup
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                disableToggle={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .disableToggle
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                approvalPadding={
                                                                                                                                                                                                                                    this
                                                                                                                                                                                                                                        .props
                                                                                                                                                                                                                                        .approvalPadding
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            />
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
                )}
            </ApolloConsumer>
        );
    }
}

export default BannerWrappers;

const styles = {
    addBannerButton: {
        height: 30,
        width: 30,
        backgroundColor: "#207dbb",
        borderRadius: "50%",
        borderColor: "#fff",
        border: "none",
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
        top: "-14px",
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
        color: "#333",
        fontSize: "13px",
        paddingBottom: 10,
    },
    dot: {},
    carouselWrapper: {},
    banner: {
        top: "317px",
        position: "relative",
    },
    deleteWrapper: {
        top: "-20px",
        position: "relative",
    },
};
