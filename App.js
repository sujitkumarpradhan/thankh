import React, { Component } from "react";
import { render } from "react-dom";
import logo from "./images/Fugu_logo_1-0-04.svg";
import "./App.css";
import Pagination from "react-js-pagination";
import characters from "./images/empty.png";
import { Link } from "react-router-dom";
import AdvertiserListItem from "./AdvertiserListItem";
import ReactLoading from "react-loading";
import { withApollo } from "react-apollo";
import { ApolloConsumer } from "react-apollo";
import { emptyState } from "./images/empty.png";
import { withRouter } from "react-router-dom";

import {
    AdvertiserList,
    AdvertiserItem,
    AddAdvertiser,
    getLevel,
} from "./Advertiser";

import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

import Page from "./components/layout/Page";
import "react-bootstrap";

const GET_Advertisers = gql`
    query ListAdvertisers {
        listAdvertisers {
            items {
                id
                name
                locale
                createdAt
                lastModified
                MajorEvent
                sfURL
                designersAlias
                status
                version
            }
        }
    }
`;
const Filter_Advertisers = gql`
    query ListAdvertisers($sfURL: String!) {
        listAdvertisers(filter: { sfURL: { contains: $sfURL } }) {
            items {
                id
                sfURL
                version
            }
        }
    }
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            locale: "",
            sort: "createdAt",
            data: [],
            searchText: "",
            color: "#999",
            event: "",
            status: "",
            title: "",
            pageCount: 0,
            indexOfFirstLink: 0,
            perPage: 10,
            indexOfLastLink: 10,
            selected: 1,
            filteredList: [],
            year: "2020",
            version: 1,
            time: Date.now(),
        };

        // this.setState({filterList: []});

        this.redirectLink = this.redirectLink.bind(this);
        this.searchAdv = this.searchAdv.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    async componentWillMount() {
        console.log("inside willmount", this.props.location.state);
        if (
            this.props.location.state &&
            this.props.location.state.from.indexOf("presentation") !== -1
        ) {
            console.log("inside if");
            this.props.history.push({
                pathname: `/`,
            });
            window.location.reload(true);
        }
    }
    componentDidMount() {
        this._isMounted = true;
        console.log("window popstate", window.onpopstate);
        window.onpopstate = () => {
            if (this._isMounted) {
                const { hash } = window.location;
                console.log("outside brwser if", window.location);
                if (
                    window.onpopstate &&
                    window.location.href.indexOf("/presentation/") == -1
                ) {
                    this.props.history.push({
                        pathname: `/`,
                    });
                    window.location.reload(true);
                }
            }
        };
    }

    redirectLink(itemID, name, MajorEvent, sfUrl) {
        this.props.history.push(
            `/presentation/Desktop/${name}/${itemID}/${MajorEvent}/${sfUrl.replace(
                "https://ams-amazon.my.salesforce.com/",
                ""
            )}`
        );
    }
    handlePageChange(pageNumber) {
        console.log("inside page click");
        this.setState({
            selected: pageNumber,
            indexOfLastLink: pageNumber * this.state.perPage,
            indexOfFirstLink:
                pageNumber * this.state.perPage - this.state.perPage,
        });
        console.log(
            "Last Link:",
            this.state.indexOfLastLink,
            "First Link:",
            this.state.indexOfFirstLink,
            "selected: ",
            this.state.selected,
            "Per Page:",
            this.state.perPage
        );
    }

    searchAdv(e) {
        this.setState({ searchText: e.target.value });
    }

    render() {
        return (
            <div>
                <Mutation
                    refetchQueries={[
                        {
                            query: GET_Advertisers,
                        },
                    ]}
                    mutation={gql`
                        mutation CreateAdvertiser(
                            $name: String!
                            $designersAlias: String!
                            $version: Int!
                            $createdAt: String!
                            $lastModified: String!
                            $locale: String!
                            $MajorEvent: String!
                            $sfURL: String!
                        ) {
                            Advertiser: createAdvertiser(
                                input: {
                                    name: $name
                                    designersAlias: $designersAlias
                                    version: $version
                                    createdAt: $createdAt
                                    lastModified: $lastModified
                                    locale: $locale
                                    MajorEvent: $MajorEvent
                                    sfURL: $sfURL
                                    gateway: false
                                    event: false
                                    contextual: false
                                    mGateway: false
                                    mEvent: false
                                    mContextual: false
                                    fireTablet: false
                                    fireTv: false
                                    lp: false
                                }
                            ) {
                                id
                                name
                                createdAt
                                locale
                                MajorEvent
                                sfURL
                                version
                            }
                        }
                    `}
                >
                    {(createAdvertiser, { loading, data }) => {
                        return (
                            <Mutation
                                refetchQueries={[
                                    {
                                        query: GET_Advertisers,
                                    },
                                ]}
                                mutation={gql`
                                    mutation CreateDestination(
                                        $AdvertiserID: ID!
                                    ) {
                                        Destination: createDestination(
                                            input: {
                                                AdvertiserID: $AdvertiserID
                                                CreativeVersion: 1
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
                                                ) {
                                                    DG1: createBannerCarousel(
                                                        input: {
                                                            AdvertiserID: $AdvertiserID
                                                            Width: 300
                                                            Height: 250
                                                            Placement: "Gateway"
                                                            Platform: "Desktop"
                                                            DestinationID: $DestinationID
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                            CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
                                                    #         CreatedDate: $CreatedDate
                                                    #     }
                                                    # ) {
                                                    #     id
                                                    # }
                                                    Store: createStore(
                                                        input: {
                                                            AdvertiserID: $AdvertiserID
                                                            CreatedDate: $CreatedDate
                                                        }
                                                    ) {
                                                        id
                                                    }
                                                    LandingPage: createLandingPage(
                                                        input: {
                                                            AdvertiserID: $AdvertiserID
                                                            CreatedDate: $CreatedDate
                                                        }
                                                    ) {
                                                        id
                                                    }
                                                    # LPT: createBannerCarousel(
                                                    #     input: {
                                                    #         AdvertiserID: $AdvertiserID
                                                    #         Width: 2560
                                                    #         Height: 550
                                                    #         Placement: "Gateway"
                                                    #         Platform: "LandingPage"
                                                    #         DestinationID: $DestinationID
                                                    #         CreativeVersion: 1
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
                                                    #         CreativeVersion: 1
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
                                            {(addCreatives, { loading }) => {
                                                return (
                                                    // <ApolloConsumer>
                                                    //     {client => (
                                                    <div className="HeaderWrapper">
                                                        <div>
                                                            <img
                                                                className="logoFugu"
                                                                src={logo}
                                                            />
                                                        </div>
                                                        <div className="Header">
                                                            Presentation Tool
                                                        </div>
                                                        <div className="Create">
                                                            <AddAdvertiser
                                                                loading={
                                                                    loading
                                                                }
                                                                onAdd={async ({
                                                                    name,
                                                                    sfURL,
                                                                    designersAlias,
                                                                    version,
                                                                    createdAt,
                                                                    locale,
                                                                    MajorEvent,
                                                                    status,
                                                                    error,
                                                                }) => {
                                                                    const advertiserNameCheck = /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/;
                                                                    if (error) {
                                                                        this.setState(
                                                                            {
                                                                                error: error,
                                                                            }
                                                                        );
                                                                    } else {
                                                                        const response = await createAdvertiser(
                                                                            {
                                                                                variables: {
                                                                                    name: name,
                                                                                    designersAlias: designersAlias,
                                                                                    version: version,
                                                                                    createdAt: createdAt,
                                                                                    lastModified: createdAt,
                                                                                    locale: locale,
                                                                                    MajorEvent: MajorEvent,
                                                                                    sfURL: sfURL,
                                                                                },
                                                                            }
                                                                        );
                                                                        const Destination = await createDestinationURL(
                                                                            {
                                                                                variables: {
                                                                                    AdvertiserID:
                                                                                        response
                                                                                            .data
                                                                                            .Advertiser
                                                                                            .id,
                                                                                },
                                                                            }
                                                                        );
                                                                        addCreatives(
                                                                            {
                                                                                variables: {
                                                                                    AdvertiserID:
                                                                                        response
                                                                                            .data
                                                                                            .Advertiser
                                                                                            .id,

                                                                                    CreatedDate: new Date().toGMTString(),
                                                                                    DestinationID:
                                                                                        Destination
                                                                                            .data
                                                                                            .Destination
                                                                                            .id,
                                                                                },
                                                                            }
                                                                        ).then(
                                                                            this.redirectLink(
                                                                                response
                                                                                    .data
                                                                                    .Advertiser
                                                                                    .id,
                                                                                response
                                                                                    .data
                                                                                    .Advertiser
                                                                                    .name,
                                                                                response
                                                                                    .data
                                                                                    .Advertiser
                                                                                    .MajorEvent,
                                                                                sfURL
                                                                            )
                                                                        );
                                                                    }
                                                                }}
                                                            />
                                                            <div
                                                                style={{
                                                                    ...styles.error,
                                                                    visibility:
                                                                        this
                                                                            .state
                                                                            .error ===
                                                                        null
                                                                            ? "hidden"
                                                                            : "visible",
                                                                }}
                                                            >
                                                                <i className="fas fa-exclamation-triangle" />{" "}
                                                                {
                                                                    this.state
                                                                        .error
                                                                }
                                                            </div>
                                                        </div>
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

                <Mutation
                    ignoreResults
                    refetchQueries={[
                        {
                            query: GET_Advertisers,
                        },
                    ]}
                    mutation={gql`
                        mutation DeleteAdvertiser($id: ID!) {
                            deleteAdvertiser(input: { id: $id }) {
                                id
                            }
                        }
                    `}
                >
                    {(deleteAdvertiser) => {
                        return (
                            <Query
                                query={GET_Advertisers}
                                onCompleted={(data) => {
                                    if (
                                        this.props.location.state &&
                                        this.props.location.state.from.indexOf(
                                            "presentation"
                                        )
                                    )
                                        window.location.reload(true);
                                }}
                            >
                                {({
                                    loading,
                                    error,
                                    data,
                                    listAdvertisers,
                                }) => {
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

                                    if (data != null) {
                                        this.state.data =
                                            data.listAdvertisers.items;
                                        this.state.filterList =
                                            data.listAdvertisers.items;
                                    }
                                    return (
                                        <div className="List">
                                            {this.state.filterList.length ===
                                                0 && (
                                                <div
                                                    style={{
                                                        ...styles,
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "center",
                                                        alignItems: "center",
                                                        position: "relative",
                                                    }}
                                                >
                                                    <img
                                                        alt="Empty State"
                                                        src={characters}
                                                        style={{
                                                            ...styles,
                                                            height: 300,
                                                            opacity: 0.3,
                                                        }}
                                                    />
                                                    <span
                                                        style={{
                                                            ...styles,
                                                            fontSize: 26,
                                                            fontWeight: 600,
                                                            color: "#188c77",
                                                        }}
                                                    >
                                                        {" "}
                                                        It feels little empty
                                                        here!{" "}
                                                    </span>
                                                    <p
                                                        style={{
                                                            ...styles,
                                                            fontSize: 16,
                                                            fontWeight: 300,
                                                            color: "#48657c",
                                                            textAlign: "center",
                                                            paddingTop: 15,
                                                        }}
                                                    >
                                                        Be the first one to
                                                        create a presentation.
                                                        <br /> Start by adding
                                                        your salesforce
                                                        assignment URL.{" "}
                                                    </p>
                                                </div>
                                            )}
                                            <div
                                                className="filterWrapper"
                                                style={{
                                                    ...styles,
                                                    display:
                                                        this.state.filterList
                                                            .length === 0
                                                            ? "none"
                                                            : "flex",
                                                }}
                                            >
                                                <label className="Filter">
                                                    <i
                                                        className="fa fa-filter"
                                                        aria-hidden="true"
                                                    />
                                                    <select
                                                        value={this.state.event}
                                                        onChange={(e) =>
                                                            this.setState({
                                                                event:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="FilterInput"
                                                        required
                                                    >
                                                        <option value="" hidden>
                                                            Major Event
                                                        </option>
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="Prime Day">
                                                            Prime Day
                                                        </option>
                                                        <option value="BFCM">
                                                            BFCM
                                                        </option>
                                                    </select>
                                                </label>

                                                <label className="Filter">
                                                    <i
                                                        className="fa fa-filter"
                                                        aria-hidden="true"
                                                    />
                                                    <select
                                                        value={
                                                            this.state.locale
                                                        }
                                                        onChange={(e) =>
                                                            this.setState({
                                                                locale:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="FilterInput"
                                                        required
                                                    >
                                                        <option value="" hidden>
                                                            Locale
                                                        </option>
                                                        <option value="">
                                                            All
                                                        </option>
                                                        <option value="US">
                                                            US
                                                        </option>
                                                        <option value="CA">
                                                            CA
                                                        </option>
                                                        <option value="UK">
                                                            UK
                                                        </option>
                                                        <option value="DE">
                                                            DE
                                                        </option>
                                                        <option value="FR">
                                                            FR
                                                        </option>
                                                        <option value="IT">
                                                            IT
                                                        </option>
                                                        <option value="ES">
                                                            ES
                                                        </option>
                                                        <option value="IN">
                                                            IN
                                                        </option>
                                                        <option value="JP">
                                                            JP
                                                        </option>
                                                        <option value="AU">
                                                            AU
                                                        </option>
                                                        <option value="MX">
                                                            MX
                                                        </option>
                                                    </select>
                                                </label>
                                                <label className="Filter">
                                                    <i
                                                        className="fa fa-filter"
                                                        aria-hidden="true"
                                                    />

                                                    <select
                                                        value={this.state.year}
                                                        onChange={(e) =>
                                                            this.setState({
                                                                year:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="FilterInput"
                                                        required
                                                    >
                                                        <option value="2020">
                                                            2020
                                                        </option>
                                                        <option value="2019">
                                                            2019
                                                        </option>
                                                    </select>
                                                </label>
                                                <label className="Filter">
                                                    <i
                                                        className="fa fa-arrow-down"
                                                        aria-hidden="true"
                                                    />

                                                    <select
                                                        value={this.state.sort}
                                                        onChange={(e) =>
                                                            this.setState({
                                                                sort:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="FilterInput"
                                                        required
                                                    >
                                                        <option value="createdAt">
                                                            Created at
                                                        </option>
                                                        <option value="lastModified">
                                                            Last modified
                                                        </option>
                                                    </select>
                                                </label>

                                                <label className="Filter">
                                                    <input
                                                        className="CreateInputSearch"
                                                        placeholder="Search text"
                                                        type="text"
                                                        value=""
                                                        value={
                                                            this.state
                                                                .searchText
                                                        }
                                                        onChange={(e) =>
                                                            this.searchAdv(e)
                                                        }
                                                    />
                                                </label>
                                            </div>
                                            <ul>
                                                <table
                                                    className="table table-striped"
                                                    style={{
                                                        ...styles,
                                                        display:
                                                            this.state
                                                                .filterList
                                                                .length === 0
                                                                ? "none"
                                                                : "inline",
                                                        minWidth: 800,
                                                    }}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th>Advertiser</th>
                                                            <th>Round</th>
                                                            <th>Major Event</th>
                                                            <th>Locale</th>
                                                            <th>Designers</th>
                                                            <th>Created At</th>
                                                            <th>
                                                                Last Modified
                                                            </th>
                                                            {/* <th>Status</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {[
                                                            ...this.state
                                                                .filterList,
                                                        ]
                                                            .sort(
                                                                (
                                                                    var1,
                                                                    var2
                                                                ) => {
                                                                    if (
                                                                        this
                                                                            .state
                                                                            .sort ===
                                                                        "lastModified"
                                                                    ) {
                                                                        var a = new Date(
                                                                                var1.lastModified
                                                                            ),
                                                                            b = new Date(
                                                                                var2.lastModified
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
                                                                    } else if (
                                                                        this
                                                                            .state
                                                                            .sort ===
                                                                        "createdAt"
                                                                    ) {
                                                                        var a = new Date(
                                                                                var1.createdAt
                                                                            ),
                                                                            b = new Date(
                                                                                var2.createdAt
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
                                                                }
                                                            )
                                                            .filter(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    if (
                                                                        advertiser.createdAt.includes(
                                                                            this
                                                                                .state
                                                                                .year
                                                                        )
                                                                    ) {
                                                                        return true;
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                }
                                                            )
                                                            .filter(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    if (
                                                                        advertiser.MajorEvent ===
                                                                        this
                                                                            .state
                                                                            .event
                                                                    ) {
                                                                        return true;
                                                                    } else if (
                                                                        this
                                                                            .state
                                                                            .event ===
                                                                        ""
                                                                    ) {
                                                                        return true;
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                }
                                                            )
                                                            .filter(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    if (
                                                                        advertiser.status ===
                                                                        this
                                                                            .state
                                                                            .status
                                                                    ) {
                                                                        return true;
                                                                    } else if (
                                                                        this
                                                                            .state
                                                                            .status ===
                                                                        ""
                                                                    ) {
                                                                        return true;
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                }
                                                            )

                                                            .filter(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    if (
                                                                        advertiser.locale ===
                                                                        this
                                                                            .state
                                                                            .locale
                                                                    ) {
                                                                        return true;
                                                                    } else if (
                                                                        this
                                                                            .state
                                                                            .locale ===
                                                                        ""
                                                                    ) {
                                                                        return true;
                                                                    } else {
                                                                        return false;
                                                                    }
                                                                }
                                                            )
                                                            .filter(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    return (
                                                                        advertiser.name
                                                                            .toLowerCase()
                                                                            .search(
                                                                                this.state.searchText.toLowerCase()
                                                                            ) !==
                                                                            -1 ||
                                                                        advertiser.designersAlias
                                                                            .toLowerCase()
                                                                            .search(
                                                                                this.state.searchText.toLowerCase()
                                                                            ) !==
                                                                            -1
                                                                    );
                                                                }
                                                            )
                                                            .slice(
                                                                this.state
                                                                    .indexOfFirstLink,
                                                                this.state
                                                                    .indexOfLastLink
                                                            )
                                                            .map(
                                                                (
                                                                    advertiser
                                                                ) => {
                                                                    return (
                                                                        <AdvertiserListItem
                                                                            key={
                                                                                advertiser.id
                                                                            }
                                                                            id={
                                                                                advertiser.id
                                                                            }
                                                                            status={
                                                                                advertiser.status
                                                                            }
                                                                            sfURL={
                                                                                advertiser.sfURL
                                                                            }
                                                                            version={
                                                                                advertiser.version
                                                                            }
                                                                            locale={
                                                                                advertiser.locale
                                                                            }
                                                                            name={
                                                                                advertiser.name
                                                                            }
                                                                            event={
                                                                                advertiser.MajorEvent
                                                                            }
                                                                            createdAt={
                                                                                advertiser.createdAt
                                                                            }
                                                                            lastModified={
                                                                                advertiser.lastModified
                                                                            }
                                                                            designer={
                                                                                advertiser.designersAlias
                                                                            }
                                                                        />
                                                                    );
                                                                }
                                                            )}
                                                    </tbody>
                                                </table>

                                                <div className="pagination-wrapper">
                                                    <Pagination
                                                        hideDisabled
                                                        activePage={
                                                            this.state.selected
                                                        }
                                                        itemsCountPerPage={
                                                            this.state.perPage
                                                        }
                                                        totalItemsCount={
                                                            [
                                                                ...this.state
                                                                    .filterList,
                                                            ]
                                                                .sort(
                                                                    (
                                                                        var1,
                                                                        var2
                                                                    ) => {
                                                                        if (
                                                                            this
                                                                                .state
                                                                                .sort ===
                                                                            "lastModified"
                                                                        ) {
                                                                            var a = new Date(
                                                                                    var1.lastModified
                                                                                ),
                                                                                b = new Date(
                                                                                    var2.lastModified
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
                                                                        } else if (
                                                                            this
                                                                                .state
                                                                                .sort ===
                                                                            "createdAt"
                                                                        ) {
                                                                            var a = new Date(
                                                                                    var1.createdAt
                                                                                ),
                                                                                b = new Date(
                                                                                    var2.createdAt
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
                                                                    }
                                                                )
                                                                .filter(
                                                                    (
                                                                        advertiser
                                                                    ) => {
                                                                        if (
                                                                            advertiser.MajorEvent ===
                                                                            this
                                                                                .state
                                                                                .event
                                                                        ) {
                                                                            return true;
                                                                        } else if (
                                                                            this
                                                                                .state
                                                                                .event ===
                                                                            ""
                                                                        ) {
                                                                            return true;
                                                                        } else {
                                                                            return false;
                                                                        }
                                                                    }
                                                                )
                                                                .filter(
                                                                    (
                                                                        advertiser
                                                                    ) => {
                                                                        if (
                                                                            advertiser.status ===
                                                                            this
                                                                                .state
                                                                                .status
                                                                        ) {
                                                                            return true;
                                                                        } else if (
                                                                            this
                                                                                .state
                                                                                .status ===
                                                                            ""
                                                                        ) {
                                                                            return true;
                                                                        } else {
                                                                            return false;
                                                                        }
                                                                    }
                                                                )

                                                                .filter(
                                                                    (
                                                                        advertiser
                                                                    ) => {
                                                                        if (
                                                                            advertiser.locale ===
                                                                            this
                                                                                .state
                                                                                .locale
                                                                        ) {
                                                                            return true;
                                                                        } else if (
                                                                            this
                                                                                .state
                                                                                .locale ===
                                                                            ""
                                                                        ) {
                                                                            return true;
                                                                        } else {
                                                                            return false;
                                                                        }
                                                                    }
                                                                )
                                                                .filter(
                                                                    (
                                                                        advertiser
                                                                    ) => {
                                                                        if (
                                                                            advertiser.createdAt.includes(
                                                                                this
                                                                                    .state
                                                                                    .year
                                                                            )
                                                                        ) {
                                                                            return true;
                                                                        } else {
                                                                            return false;
                                                                        }
                                                                    }
                                                                )
                                                                .filter(
                                                                    (
                                                                        advertiser
                                                                    ) => {
                                                                        return (
                                                                            advertiser.name
                                                                                .toLowerCase()
                                                                                .search(
                                                                                    this.state.searchText.toLowerCase()
                                                                                ) !==
                                                                            -1
                                                                        );
                                                                    }
                                                                ).length
                                                        }
                                                        pageRangeDisplayed={5}
                                                        onChange={
                                                            this
                                                                .handlePageChange
                                                        }
                                                    />
                                                </div>
                                            </ul>
                                        </div>
                                    );
                                }}
                            </Query>
                        );
                    }}
                </Mutation>
                <Page
                    style={styles.pageStyle}
                    description="Type creative comments here..."
                />
            </div>
        );
    }
}

export default withRouter(App);

const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    listItem: {
        marginRight: "10px",
    },
    listItemStatus: {
        color: "#ee810c",
    },
    error: {
        fontSize: "12px",
        color: "#905020",
        padding: "10px",
        textAlign: "center",
    },
    characterBg: {
        height: 40,
        width: "100vw",
        backgroundColor: "#fff",
    },
};
