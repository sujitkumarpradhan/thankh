import React, { Component, PropTypes } from "react";
import axios from "axios";

import "./Presentation.css";
import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GridLoader } from "react-spinners";
import htmlToText from "html-to-text";
import Banner from "./components/sizes/banner";

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

const scope = this;

class SFComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            base64: "",
            loading: true
        };

        this.passHtmlToMail = this.passHtmlToMail.bind(this);
    }

    componentDidMount() {
        console.log(this.props.location.state.designersAlias);
        setTimeout(() => {
            this.passHtmlToMail(this.props.location.state.designersAlias);
        }, 5000);
    }

    passHtmlToMail(alias) {
        var temp = document.getElementById("divToPrint");
        var htmlToSendString = temp.outerHTML;
        var data = htmlToText.fromString(htmlToSendString, {
            wordwrap: 130
        });
        // console.log("comment: ", data);
        console.log(
            JSON.stringify({
                assignmentId: this.props.location.state.sfURL,
                customMessageSegements: data
            })
        );

        let response = fetch(
            `http://adinfoprovider.corp.amazon.com/addCommentToSalesforce`,
            {
                method: "POST",
                body: JSON.stringify({
                    assignmentId: this.props.location.state.sfURL,
                    customMessageSegments: data
                })
            }
        );

        response.then(response => {
            console.log("error: ", response);
            response
                .json()
                .then(async response => {
                    console.log("response: ", response);
                    if (response.success === true) {
                        alert("Feedback sent on salesforce");
                        this.props.history.push(this.props.location.state.path);
                    } else {
                        alert("Failed to add the comment");
                        this.props.history.push(this.props.location.state.path);
                    }
                })
                .catch(error => {
                    alert(error + ". Please try again.");
                    this.props.history.push(this.props.location.state.path);
                    console.log("Response for email", error);
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
                            <div
                                id="divToPrint"
                                style={{ ...styles, display: "none" }}
                            >
                                {`[{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"id\":\"${
                                    this.props.location.state.designersID
                                }\",\"type\":\"Mention\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback from Tentpole review\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},`}

                                {[...data.getAdvertiser.BannerCarousel.items]
                                    .filter(banner => {
                                        if (
                                            banner.ApprovalBackup != true &&
                                            banner.CommentBackup
                                        ) {
                                            return true;
                                        } else if (
                                            banner.ApprovalMain != true &&
                                            banner.CommentMain
                                        ) {
                                            console.log(
                                                "banner approval: ",
                                                banner.ApprovalMain,
                                                banner.ApprovalBackup
                                            );
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    })
                                    .map((items, index) => {
                                        if (items.SrcMain && items.SrcBackup) {
                                            return `{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"Main:_${
                                                items.Platform
                                            }_${items.Placement}(${
                                                items.Width
                                            }x${
                                                items.Height
                                            })\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"${
                                                items.SrcMain
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Italic\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback: ${
                                                items.CommentMain
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Italic\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"Backup:_${
                                                items.Platform
                                            }_${items.Placement}(${
                                                items.Width
                                            }x${
                                                items.Height
                                            })\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"${
                                                items.SrcBackup
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Italic\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback: ${
                                                items.CommentBackup
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Italic\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},`;
                                        } else if (items.SrcMain) {
                                            return `{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"Main:_${
                                                items.Platform
                                            }_${items.Placement}(${
                                                items.Width
                                            }x${
                                                items.Height
                                            })\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"${
                                                items.SrcMain
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Italic\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback: ${
                                                items.CommentMain
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Italic\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},`;
                                        } else if (items.SrcBackup) {
                                            return `{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"Backup:_${
                                                items.Platform
                                            }_${items.Placement}(${
                                                items.Width
                                            }x${
                                                items.Height
                                            })\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"${
                                                items.SrcBackup
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Italic\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback: ${
                                                items.CommentBackup
                                            }\",\"type\":\"Text\"},{\"markupType\":\"Italic\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},`;
                                        }
                                    })}

                                {[...data.getAdvertiser.FireTablet.items]
                                    .filter(banner => {
                                        if (
                                            banner.Approval != true &&
                                            banner.Comment
                                        ) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    })
                                    .map((items, index) => {
                                        return `{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Bold\",\"type\":\"MarkupBegin\"},{\"text\":\"FireTablet: Package-${index +
                                            1}\",\"type\":\"Text\"},{\"markupType\":\"Bold\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"${
                                            items.Gen7L
                                        }\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"markupType\":\"Italic\",\"type\":\"MarkupBegin\"},{\"text\":\"Feedback: ${
                                            items.Comment
                                        }\",\"type\":\"Text\"},{\"markupType\":\"Italic\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"&nbsp;\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},`;
                                    })}

                                <span>
                                    {`{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"On feedback amend please create a new Presentation with version number next to it.\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupBegin\"},{\"text\":\"Example: 00000000_Advertizer_v2\",\"type\":\"Text\"},{\"markupType\":\"Paragraph\",\"type\":\"MarkupEnd\"}]`}
                                </span>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

const styles = {
    pageStyle: {
        display: "block"
    }
};
export default SFComment;
