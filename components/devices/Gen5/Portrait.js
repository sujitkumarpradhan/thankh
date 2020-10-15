import React, { Component } from "react";

import PortraitImage from "./images/Gen5_p.svg";
import PortraitImageUI from "./images/Gen5UI-P.svg";
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

class Portrait extends Component {
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
                                        <div style={styles.devicePortrait}>
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
                                            <img
                                                style={
                                                    styles.deviceImageLandscapeUI
                                                }
                                                alt="Gen7 Device landscape UI"
                                                src={PortraitImageUI}
                                            />
                                        </div>
                                        <div style={styles.devicePortrait}>
                                            {this.props.asset ? (
                                                <img
                                                    style={
                                                        styles.deviceAssetPortrait
                                                    }
                                                    alt="Gen5 Device portrait asset"
                                                    src={this.props.asset}
                                                />
                                            ) : null}
                                            <img
                                                style={
                                                    styles.deviceImagePortrait
                                                }
                                                alt="Gen5 Device portrait"
                                                src={PortraitImage}
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
    devicePortrait: {
        position: "relative"
    },
    deviceImagePortrait: {
        width: 400
    },
    deviceAssetPortrait: {
        position: "absolute",
        width: 255,
        left: 71,
        top: 72
    },
    deviceImageLandscapeUI: {
        width: 254,
        zIndex: 1,
        position: "absolute",
        top: 72,
        left: 71.2
    },
    pageTitle: {
        display: "flex",
        flexDirection: "column",
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
        top: 377,
        left: 73,
        width: 70,
        height: 30,
        zIndex: 2,
        verticalAlign: "middle",
        overflow: "auto"
    }
};

export default Portrait;
