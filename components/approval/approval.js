import React, { Component } from "react";
import "./approval.css";

import CommentBox from "../comment/commentBox";
class Approval extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenCommentBox: false
        };

        this.openCommentBox = this.openCommentBox.bind(this);
        console.log(this.state);
    }

    openCommentBox(event) {
        this.setState({ isOpenCommentBox: !this.state.isOpenCommentBox });
        console.log(this.state.isOpenCommentBox);
    }
    render() {
        return (
            <div>
                <div
                    className="approval"
                    style={{
                        ...styles.approval,
                        marginTop: this.props.approvalPadding ? "70px" : "",
                        position: this.props.approvalPadding ? "relative" : "",
                        top: this.props.approvalPadding ? "-50px" : "",
                        left: this.props.approvalPadding ? "485px" : ""
                    }}
                >
                    <label className="radio">
                        <div
                            type="radio"
                            name="radio"
                            id="true"
                            checked={this.props.isApproved === "true"}
                            // onChange={e => {
                            //     this.props.onApprovalChange(
                            //         e.target.id,
                            //         this.props.type,
                            //         this.props.index,
                            //         new Date().toGMTString()
                            //     );
                            // }}
                        />

                        <span
                            className="checkmark"
                            style={{
                                backgroundColor:
                                    this.props.isApproved === "true"
                                        ? "#06dc79"
                                        : "#eee"
                            }}
                        >
                            &#x2713;
                        </span>
                    </label>
                    <label className="radio">
                        <div
                            type="radio"
                            name="radio"
                            id="false"
                            checked={this.props.isApproved === "false"}
                            // onChange={e => {
                            //     this.props.onApprovalChange(
                            //         e.target.id,
                            //         this.props.type,
                            //         this.props.index,
                            //         new Date().toGMTString()
                            //     );
                            // }}
                        />
                        <span
                            className="checkmarkNotApproved"
                            style={{
                                backgroundColor:
                                    this.props.isApproved === "false"
                                        ? "#dd4b40"
                                        : "#eee"
                            }}
                        >
                            &#215;
                        </span>
                    </label>

                    <a
                        className="comment"
                        style={{
                            ...styles.comment,
                            visibility:
                                this.props.isVisibleCommentIcon &&
                                this.props.isApproved
                                    ? "visible"
                                    : "hidden"
                        }}
                        href="javascript:void(0)"
                        id="comment"
                        onClick={this.openCommentBox}
                    >
                        <i className="fas fa-comment-alt" />
                    </a>
                </div>
                <div>
                    {this.state.isOpenCommentBox === true ? (
                        <CommentBox
                            type={this.props.type}
                            index={this.props.index}
                            comment={this.props.comment}
                            // onCommentChange={this.props.onCommentChange}
                            isOpen={this.state.isOpenCommentBox}
                            onExit={isOpen => {
                                this.setState({
                                    isOpenCommentBox: isOpen
                                });
                            }}
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}
const styles = {
    comment: {
        position: "relative",
        fontSize: 24
    },
    approval: {}
};
export default Approval;
