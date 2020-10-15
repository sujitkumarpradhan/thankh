import React, { Component } from "react";
import Page from "../layout/Page";
import ReactLoading from "react-loading";
import StoreMain from "./Store";

import gql from "graphql-tag";

import { Query, Mutation } from "react-apollo";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            sfURL
            Store {
                items {
                    id
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
class StoreWrapper extends Component {
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
                                mutation UpdateStore(
                                    $id: ID!
                                    $PreviewLink: String
                                    $Designer: String
                                    $CreatedBy: String
                                    $SfURL: String
                                    $Password: String
                                ) {
                                    updateStore(
                                        input: {
                                            id: $id
                                            PreviewLink: $PreviewLink
                                            Designer: $Designer
                                            CreatedBy: $CreatedBy
                                            SfURL: $SfURL
                                            Password: $Password
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
                            {(updateStore, { loading, error }) => {
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
                                            mutation CreateStore(
                                                $AdvertiserID: ID!
                                                $CreatedDate: String
                                            ) {
                                                createStore(
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
                                        {(addStore, { loading, error }) => {
                                            if (error) {
                                                console.log(error);
                                                return (
                                                    <div>
                                                        Store was not created
                                                        beacuse of the error:{" "}
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
                                                        mutation DeleteStore(
                                                            $id: ID!
                                                        ) {
                                                            deleteStore(
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
                                                        deleteStore,
                                                        { loading, error }
                                                    ) => {
                                                        if (error) {
                                                            console.log(error);
                                                            return (
                                                                <div>
                                                                    Store was
                                                                    not deleted
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
                                                                    .Store.items
                                                                    .length ===
                                                                    0 && (
                                                                    <div>
                                                                        No Store
                                                                        Added
                                                                    </div>
                                                                )}

                                                                <button
                                                                    disabled={
                                                                        data
                                                                            .getAdvertiser
                                                                            .Store
                                                                            .items
                                                                            .length ===
                                                                            10 ||
                                                                        [
                                                                            ...data
                                                                                .getAdvertiser
                                                                                .Store
                                                                                .items,
                                                                        ].filter(
                                                                            (
                                                                                store
                                                                            ) => {
                                                                                if (
                                                                                    store.StoreImg ===
                                                                                    null
                                                                                ) {
                                                                                    return true;
                                                                                } else if (
                                                                                    !store.StoreImg.includes(
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
                                                                                .Store
                                                                                .items
                                                                                .length ===
                                                                                10 ||
                                                                            [
                                                                                ...data
                                                                                    .getAdvertiser
                                                                                    .Store
                                                                                    .items,
                                                                            ].filter(
                                                                                (
                                                                                    store
                                                                                ) => {
                                                                                    if (
                                                                                        store.StoreImg ===
                                                                                        null
                                                                                    ) {
                                                                                        return true;
                                                                                    } else if (
                                                                                        !store.StoreImg.includes(
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
                                                                        await addStore(
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
                                                                                        .Store
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
                                                                                .Store
                                                                                .items
                                                                                .length
                                                                        );
                                                                    }}
                                                                >
                                                                    +
                                                                </button>
                                                                <Carousal
                                                                    count={0}
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
                                                                            .Store
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
                                                                                Store
                                                                            ) => {
                                                                                return (
                                                                                    <div>
                                                                                        <button
                                                                                            disabled={
                                                                                                data
                                                                                                    .getAdvertiser
                                                                                                    .Store
                                                                                                    .items
                                                                                                    .length ===
                                                                                                1
                                                                                            }
                                                                                            style={{
                                                                                                ...styles.addBannerDelete,
                                                                                                opacity:
                                                                                                    data
                                                                                                        .getAdvertiser
                                                                                                        .Store
                                                                                                        .items
                                                                                                        .length ===
                                                                                                    1
                                                                                                        ? "0.3"
                                                                                                        : "1",
                                                                                            }}
                                                                                            onClick={async (
                                                                                                e
                                                                                            ) => {
                                                                                                await deleteStore(
                                                                                                    {
                                                                                                        variables: {
                                                                                                            id:
                                                                                                                Store.id,
                                                                                                        },
                                                                                                    }
                                                                                                );

                                                                                                if (
                                                                                                    this
                                                                                                        .state
                                                                                                        .selected ===
                                                                                                    data
                                                                                                        .getAdvertiser
                                                                                                        .Store
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
                                                                                            Store{" "}
                                                                                            <i className="far fa-trash-alt" />
                                                                                        </button>

                                                                                        <StoreMain
                                                                                            key={
                                                                                                Store.id
                                                                                            }
                                                                                            storeId={
                                                                                                Store.id
                                                                                            }
                                                                                            advertiserID={
                                                                                                this
                                                                                                    .props
                                                                                                    .advertiserID
                                                                                            }
                                                                                            storeImg={
                                                                                                Store.StoreImg
                                                                                            }
                                                                                            storeUrl={
                                                                                                Store.PreviewLink
                                                                                            }
                                                                                            mainSfUrl={
                                                                                                data
                                                                                                    .getAdvertiser
                                                                                                    .sfURL
                                                                                            }
                                                                                            sfUrl={
                                                                                                Store.SfURL
                                                                                            }
                                                                                            designer={
                                                                                                Store.Designer
                                                                                            }
                                                                                            designedBy={
                                                                                                Store.CreatedBy
                                                                                            }
                                                                                            password={
                                                                                                Store.Password
                                                                                            }
                                                                                            onSave={async (
                                                                                                sfUrl,
                                                                                                designer,
                                                                                                designedBy,
                                                                                                password,
                                                                                                storeUrl
                                                                                            ) => {
                                                                                                updateStore(
                                                                                                    {
                                                                                                        variables: {
                                                                                                            id:
                                                                                                                Store.id,
                                                                                                            PreviewLink: storeUrl,
                                                                                                            Designer: designer,
                                                                                                            CreatedBy: designedBy,
                                                                                                            SfURL: sfUrl,
                                                                                                            Password: password,
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
        borderColor: "#fff",
        border: "none",
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
export default StoreWrapper;
