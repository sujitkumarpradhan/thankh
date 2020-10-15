import React, { Component } from "react";

import LandscapeImage from "./images/Gen5_l.svg";
import LandscapeImageUI from "./images/Gen5UI-L.svg";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";

const GET_FireTablet = gql`
    query GetFireTablet($id: String!) {
        getFireTablet(id: $id) {
            id
            PaddleText
        }
    }
`;

class Landscape extends Component {
    state = {
        paddleText: ""
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.paddleText === prevState.paddleText) {
            return null;
        }

        if (!nextProps.paddleText) {
            return null;
        }
        console.log(nextProps.paddleText);
        return {
            paddleText: nextProps.paddleText
        };
    }

    render() {
        return (
            <Mutation
                refetchQueries={[
                    {
                        query: GET_FireTablet,
                        variables: {
                            id: this.props.id
                        }
                    }
                ]}
                mutation={gql`
                    mutation UpdatePaddleText(
                        $id: String!
                        $PaddleText: String
                    ) {
                        updateFireTablet(
                            input: { id: $id, PaddleText: $PaddleText }
                        ) {
                            id
                        }
                    }
                `}
            >
                {(updatePaddleText, { loading }) => {
                    return (
                        <Query
                            query={GET_FireTablet}
                            variables={{
                                id: this.props.id
                            }}
                        >
                            {({ loading, error, data, getFireTablet }) => {
                                if (error) {
                                    console.log(error);
                                    return <div>Some error occurred.</div>;
                                }

                                if (loading) {
                                    return <div>Loading...</div>;
                                }

                                return (
                                    <div>
                                        <div style={styles.deviceLandscape}>
                                            <textarea
                                                valign="middle"
                                                cols="2"
                                                rows="2"
                                                maxLength="24"
                                                style={styles.pageTitle}
                                                contentEditable={true}
                                                value={this.state.paddleText}
                                                onChange={async e => {
                                                    const response = await this.setState(
                                                        {
                                                            paddleText:
                                                                e.target.value
                                                        }
                                                    );
                                                    console.log(
                                                        "paddle text:",
                                                        response
                                                    );
                                                }}
                                                onBlur={() =>
                                                    updatePaddleText({
                                                        variables: {
                                                            id: this.props.id,
                                                            PaddleText: this
                                                                .state
                                                                .paddleText
                                                        }
                                                    })
                                                }
                                            />
                                            {/* <div
                                                hasNonKeyedChildren
                                                noNormalize
                                                cols="2"
                                                rows="2"
                                                maxLength="24"
                                                style={styles.pageTitle}
                                                contentEditable={true}
                                                value={this.state.paddleText}
                                                onInput={async e => {
                                                    const response = await this.setState(
                                                        {
                                                            paddleText:
                                                                e.target
                                                                    .innerText
                                                        }
                                                    );
                                                }}
                                                onBlur={() =>
                                                    updatePaddleText({
                                                        variables: {
                                                            id: this.props.id,
                                                            PaddleText: this
                                                                .state
                                                                .paddleText
                                                        }
                                                    })
                                                }
                                            >
                                                {this.state.paddleText
                                                    .split("")
                                                    .reverse()}
                                            </div> */}

                                            <img
                                                style={
                                                    styles.deviceImageLandscapeUI
                                                }
                                                alt="Gen7 Device landscape UI"
                                                src={LandscapeImageUI}
                                            />
                                        </div>
                                        <div style={styles.deviceLandscape}>
                                            {this.props.asset ? (
                                                <img
                                                    style={
                                                        styles.deviceAssetLandscape
                                                    }
                                                    alt="Gen5 Device landscape asset"
                                                    src={this.props.asset}
                                                />
                                            ) : null}
                                            <img
                                                style={
                                                    styles.deviceImageLandscape
                                                }
                                                alt="Gen5 Device landscape"
                                                src={LandscapeImage}
                                            />
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

const styles = {
    deviceLandscape: {
        position: "relative"
    },

    deviceImageLandscape: {
        height: 400
    },
    deviceAssetLandscape: {
        position: "absolute",
        height: 255,
        top: 69,
        left: 77
    },
    deviceImageLandscapeUI: {
        height: 254,
        zIndex: 1,
        position: "absolute",
        top: 72,
        left: 77.2
    },
    pageTitle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "11px",
        position: "absolute",
        border: 0,
        margin: "0 auto",
        fontFamily: "HelveticaNeue",
        color: "#999",
        background: "transparent",
        resize: "none",
        overflow: "hidden",
        top: 223,
        left: 79,
        zIndex: 2,
        width: 70,
        height: 30
    }
};
export default Landscape;
