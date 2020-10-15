import React, { Component, PropTypes } from "react";
import axios from "axios";

import "./Presentation.css";
// import html2canvas from 'html2canvas';
// import * as jsPDF from 'jspdf'

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GridLoader } from "react-spinners";

const GET_Advertiser = gql`
    query GetAdvertiser($id: ID!) {
        getAdvertiser(id: $id) {
            id
            name
            createdAt
            lastModified
            designersAlias
            sfURL

            BannerCarousel {
                items {
                    id
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
                    Vso
                    TopInterface
                    BottomInterface
                    Approval
                    Comment
                    PaddleText
                }
            }
        }
    }
`;

class sendMailValidator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // base64: "",
            loading: true,
            designerID: null
        };

        this.PushSfComment = this.PushSfComment.bind(this);
    }

    // componentDidMount() {
    //     console.log("Validation page ------------------------------");
    // }
    PushSfComment() {
        // console.log(this.props.location.state.designersAlias);

        fetch(`http://adinfoprovider.corp.amazon.com/getSalesforceDetails`, {
            method: "POST",
            body: JSON.stringify({
                assignmentId: this.props.location.state.sfURL
            })
        }).then(response => {
            response.json().then(response => {
                this.props.history.push({
                    pathname: `/sfComment/${this.props.match.params.itemID}`,
                    state: {
                        designersID:
                            response.assignmentType === "Trafficking"
                                ? JSON.parse(response.rawData)
                                      .CM_CPM_TAM_Trafficker__c
                                : JSON.parse(response.rawData).Designer__c,
                        path: this.props.location.state.path,
                        sfURL: this.props.location.state.sfURL
                    }
                });
            });
        });
    }
    render() {
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
                        return <div>Loading...</div>;
                    }

                    if (data) {
                        if (
                            (data.getAdvertiser &&
                                data.getAdvertiser.BannerCarousel &&
                                data.getAdvertiser.BannerCarousel.items &&
                                !data.getAdvertiser.BannerCarousel.items
                                    .length) ||
                            (data.getAdvertiser &&
                                data.getAdvertiser.FireTablet &&
                                data.getAdvertiser.FireTablet.items &&
                                !data.getAdvertiser.FireTablet.items.length)
                        ) {
                            // this.props.history.push(this.props.location.state.path);
                            this.props.history.push({
                                pathname: `${this.props.location.state.path}`,
                                state: { email: "false" }
                            });
                            // console.log("Validation page False 1------------------------------", data.getAdvertiser.BannerCarousel.items.length)
                            // window.history.back();
                            // return;
                        } else {
                            var temp = 0;

                            if (
                                data.getAdvertiser &&
                                data.getAdvertiser.BannerCarousel &&
                                data.getAdvertiser.BannerCarousel.items &&
                                data.getAdvertiser.BannerCarousel.items.length
                            ) {
                                //     for (var i = 0; i < data.getAdvertiser.BannerCarousel.items.length; i++) {
                                //         if (data.getAdvertiser.BannerCarousel.items[i].ApprovalMain == "false" || data.getAdvertiser.BannerCarousel.items[i].ApprovalBackup == "false") {
                                //             temp = 1;
                                //             break;
                                //         }
                                //     }
                                // }

                                // if (data.getAdvertiser && data.getAdvertiser.FireTablet && data.getAdvertiser.FireTablet.items && data.getAdvertiser.FireTablet.items.length) {
                                //     for (var i = 0; i < data.getAdvertiser.FireTablet.items.length; i++) {
                                //         if (data.getAdvertiser.BannerCarousel.items[i].ApprovalMain == "false" || data.getAdvertiser.BannerCarousel.items[i].ApprovalBackup == "false") {
                                //             temp = 1;
                                //             break;
                                //         }
                                //     }
                                // }

                                for (
                                    var i = 0;
                                    i <
                                    data.getAdvertiser.BannerCarousel.items
                                        .length;
                                    i++
                                ) {
                                    if (
                                        data.getAdvertiser.BannerCarousel.items[
                                            i
                                        ].CommentMain ||
                                        data.getAdvertiser.BannerCarousel.items[
                                            i
                                        ].CommentBackup
                                    ) {
                                        temp = 1;
                                        break;
                                    }
                                }
                            }

                            if (
                                data.getAdvertiser &&
                                data.getAdvertiser.FireTablet &&
                                data.getAdvertiser.FireTablet.items &&
                                data.getAdvertiser.FireTablet.items.length
                            ) {
                                for (
                                    var i = 0;
                                    i <
                                    data.getAdvertiser.FireTablet.items.length;
                                    i++
                                ) {
                                    if (
                                        data.getAdvertiser.FireTablet.items[i]
                                            .Comment
                                    ) {
                                        temp = 1;
                                        break;
                                    }
                                }
                            }

                            // console.log("Validation page False 2------------------------------", temp)

                            if (temp == 0) {
                                // window.history.back();
                                //  this.props.history.push(this.props.location.state.path);

                                this.props.history.push({
                                    pathname: `${
                                        this.props.location.state.path
                                    }`,
                                    state: { email: "false" }
                                });
                            } else {
                                this.PushSfComment();
                            }
                        }
                    }

                    return (
                        <div>
                            <div className="loaderMain sweet-loading">
                                <GridLoader
                                    className="override"
                                    sizeUnit={"px"}
                                    size={40}
                                    color="#8eb7e8"
                                    loading={this.state.loading}
                                />
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default sendMailValidator;
