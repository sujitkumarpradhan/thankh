import React, { Component } from "react";
import Page from "../layout/Page";
import ReactLoading from "react-loading";
import LandingPageMain from "./LandingPageMain";

import gql from "graphql-tag";

import { Query, Mutation } from "react-apollo";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            sfURL
            LandingPage {
                items {
                    id
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
class LPWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            count: 0,
        };
    }
    render() {
        return (
            <Query
                query={GET_Advertiser}
                variables={{
                    id: this.props.advertiserID,
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
                                    query: GET_Advertiser,
                                    variables: {
                                        id: this.props.advertiserID,
                                    },
                                },
                            ]}
                            mutation={gql`
                                mutation UpdateLandingPage(
                                    $id: ID!
                                    $PreviewLink: String
                                    $Designer: String
                                    $CreatedBy: String
                                    $SfURL: String
                                ) {
                                    updateLandingPage(
                                        input: {
                                            id: $id
                                            PreviewLink: $PreviewLink
                                            Designer: $Designer
                                            CreatedBy: $CreatedBy
                                            SfURL: $SfURL
                                        }
                                    ) {
                                        id
                                    }
                                }
                            `}
                            onCompleted={() => {
                                window.location.reload(); // temp solution to cause app to re-render
                            }}
                        >
                            {(updateLandingPage, { loading, error }) => {
                                if (error) {
                                    console.log(error);
                                    return (
                                        <div>
                                            Data was not saved beacuse of the
                                            error: {error}.
                                        </div>
                                    );
                                }

                                return (
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
                                            mutation CreateLandingPage(
                                                $AdvertiserID: ID!
                                                $CreatedDate: String
                                            ) {
                                                createLandingPage(
                                                    input: {
                                                        AdvertiserID: $AdvertiserID
                                                        CreatedDate: $CreatedDate
                                                    }
                                                ) {
                                                    id
                                                }
                                            }
                                        `}
                                    >
                                        {(
                                            addLandingPage,
                                            { loading, error }
                                        ) => {
                                            if (error) {
                                                console.log(error);
                                                return (
                                                    <div>
                                                        Landing page was not
                                                        created beacuse of the
                                                        error: {error}.
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
                                                            margin: "0 auto",
                                                            position:
                                                                "relative",
                                                        }}
                                                    >
                                                        <ReactLoading
                                                            type={"bars"}
                                                            color={"#5389b5"}
                                                            height={80}
                                                            width={40}
                                                        />
                                                    </div>
                                                );
                                            }
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
                                                        mutation DeleteLandingPage(
                                                            $id: ID!
                                                        ) {
                                                            deleteLandingPage(
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
                                                        deleteLandingPage,
                                                        { loading, error }
                                                    ) => {
                                                        if (error) {
                                                            console.log(error);
                                                            return (
                                                                <div>
                                                                    LandingPage
                                                                    was not
                                                                    deleted
                                                                    beacuse of
                                                                    the error:{" "}
                                                                    {error}.
                                                                </div>
                                                            );
                                                        }
                                                        if (loading) {
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
                                                                            80
                                                                        }
                                                                        width={
                                                                            40
                                                                        }
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                        return (
                                                            <div>
                                                                {data
                                                                    .getAdvertiser
                                                                    .LandingPage ===
                                                                null ? (
                                                                    <div>
                                                                        No
                                                                        Landing
                                                                        Page
                                                                        Added
                                                                    </div>
                                                                ) : (
                                                                    data
                                                                        .getAdvertiser
                                                                        .LandingPage
                                                                        .items
                                                                        .length ===
                                                                        0 && (
                                                                        <div>
                                                                            No
                                                                            Landing
                                                                            Page
                                                                            Added
                                                                        </div>
                                                                    )
                                                                )}
                                                                {data
                                                                    .getAdvertiser
                                                                    .LandingPage ===
                                                                null ? (
                                                                    <div>
                                                                        No
                                                                        Landing
                                                                        Page
                                                                        Added
                                                                    </div>
                                                                ) : (
                                                                    <div>
                                                                        <button
                                                                            disabled={
                                                                                data
                                                                                    .getAdvertiser
                                                                                    .LandingPage
                                                                                    .items
                                                                                    .length ===
                                                                                    10 ||
                                                                                [
                                                                                    ...data
                                                                                        .getAdvertiser
                                                                                        .LandingPage
                                                                                        .items,
                                                                                ].filter(
                                                                                    (
                                                                                        store
                                                                                    ) => {
                                                                                        if (
                                                                                            store.DesktopImg ===
                                                                                            null
                                                                                        ) {
                                                                                            return true;
                                                                                        } else if (
                                                                                            !store.DesktopImg.includes(
                                                                                                "fugu-files.s3."
                                                                                            )
                                                                                        ) {
                                                                                            return true;
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
                                                                                    data
                                                                                        .getAdvertiser
                                                                                        .LandingPage
                                                                                        .items
                                                                                        .length ===
                                                                                        10 ||
                                                                                    [
                                                                                        ...data
                                                                                            .getAdvertiser
                                                                                            .LandingPage
                                                                                            .items,
                                                                                    ].filter(
                                                                                        (
                                                                                            store
                                                                                        ) => {
                                                                                            if (
                                                                                                store.DesktopImg ===
                                                                                                null
                                                                                            ) {
                                                                                                return true;
                                                                                            } else if (
                                                                                                !store.DesktopImg.includes(
                                                                                                    "fugu-files.s3."
                                                                                                )
                                                                                            ) {
                                                                                                return true;
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
                                                                                await addLandingPage(
                                                                                    {
                                                                                        variables: {
                                                                                            AdvertiserID: this
                                                                                                .props
                                                                                                .advertiserID,

                                                                                            CreatedDate: new Date().toGMTString(),
                                                                                        },
                                                                                    }
                                                                                );

                                                                                this.setState(
                                                                                    {
                                                                                        selected:
                                                                                            data
                                                                                                .getAdvertiser
                                                                                                .LandingPage
                                                                                                .items
                                                                                                .length,
                                                                                    }
                                                                                );
                                                                                console.log(
                                                                                    "Selected:",
                                                                                    this
                                                                                        .state
                                                                                        .selected,
                                                                                    data
                                                                                        .getAdvertiser
                                                                                        .LandingPage
                                                                                        .items
                                                                                        .length
                                                                                );
                                                                            }}
                                                                        >
                                                                            +
                                                                        </button>
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
                                                                                    .LandingPage
                                                                                    .items,
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
                                                                                    (
                                                                                        LandingPage
                                                                                    ) => {
                                                                                        return (
                                                                                            <div>
                                                                                                <button
                                                                                                    disabled={
                                                                                                        data
                                                                                                            .getAdvertiser
                                                                                                            .LandingPage
                                                                                                            .items
                                                                                                            .length ===
                                                                                                        1
                                                                                                    }
                                                                                                    style={{
                                                                                                        ...styles.addBannerDelete,
                                                                                                        opacity:
                                                                                                            data
                                                                                                                .getAdvertiser
                                                                                                                .LandingPage
                                                                                                                .items
                                                                                                                .length ===
                                                                                                            1
                                                                                                                ? "0.3"
                                                                                                                : "1",
                                                                                                    }}
                                                                                                    onClick={async (
                                                                                                        e
                                                                                                    ) => {
                                                                                                        await deleteLandingPage(
                                                                                                            {
                                                                                                                variables: {
                                                                                                                    id:
                                                                                                                        LandingPage.id,
                                                                                                                },
                                                                                                            }
                                                                                                        );

                                                                                                        if (
                                                                                                            this
                                                                                                                .state
                                                                                                                .selected ===
                                                                                                            data
                                                                                                                .getAdvertiser
                                                                                                                .LandingPage
                                                                                                                .items
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
                                                                                                    Delete
                                                                                                    Landing
                                                                                                    Page{" "}
                                                                                                    <i className="far fa-trash-alt" />
                                                                                                </button>

                                                                                                <LandingPageMain
                                                                                                    key={
                                                                                                        LandingPage.id
                                                                                                    }
                                                                                                    landingPageId={
                                                                                                        LandingPage.id
                                                                                                    }
                                                                                                    advertiserID={
                                                                                                        this
                                                                                                            .props
                                                                                                            .advertiserID
                                                                                                    }
                                                                                                    LandingPageImg={
                                                                                                        LandingPage.DesktopImg
                                                                                                    }
                                                                                                    LandingPageUrl={
                                                                                                        LandingPage.PreviewLink
                                                                                                    }
                                                                                                    mainSfUrl={
                                                                                                        data
                                                                                                            .getAdvertiser
                                                                                                            .sfURL
                                                                                                    }
                                                                                                    sfUrl={
                                                                                                        LandingPage.SfURL
                                                                                                    }
                                                                                                    designer={
                                                                                                        LandingPage.Designer
                                                                                                    }
                                                                                                    designedBy={
                                                                                                        LandingPage.CreatedBy
                                                                                                    }
                                                                                                    password={
                                                                                                        LandingPage.Password
                                                                                                    }
                                                                                                    onSave={async (
                                                                                                        sfUrl,
                                                                                                        designer,
                                                                                                        designedBy,
                                                                                                        lpUrl
                                                                                                    ) => {
                                                                                                        updateLandingPage(
                                                                                                            {
                                                                                                                variables: {
                                                                                                                    id:
                                                                                                                        LandingPage.id,
                                                                                                                    PreviewLink: lpUrl,
                                                                                                                    Designer: designer,
                                                                                                                    CreatedBy: designedBy,
                                                                                                                    SfURL: sfUrl,
                                                                                                                },
                                                                                                            }
                                                                                                        );
                                                                                                    }}
                                                                                                />
                                                                                                <Page />
                                                                                            </div>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                        </Carousal>
                                                                    </div>
                                                                )}
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
            </Query>
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
    addBannerButton: {
        height: 30,
        width: 30,
        backgroundColor: "#207dbb",
        borderRadius: "50%",
        border: "none",
        borderColor: "#fff",
        position: "relative",
        cursor: "pointer",
        fontSize: 18,
        color: "#fff",
        top: "30px",
        left: 100,
        zIndex: 10,
    },
    addBannerDelete: {
        position: "absolute",
        cursor: "pointer",
        fontSize: 14,
        color: "#1b799a",
        top: "80px",
        right: "80px",
        zIndex: 50,
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
export default LPWrapper;
