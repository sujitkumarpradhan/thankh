import React, { Component } from "react";
import "./commentBox.css";

class CommentBox extends Component {
    state = {
        comment: null
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.comment === prevState.comment) {
            return null;
        }

        if (!nextProps.comment) {
            return null;
        }

        return {
            comment: nextProps.comment
        };
    }

    render() {
        if (!this.props.isOpen) {
            return null;
        }
        return (
            <div
                className="CommentBox"
                style={styles.CommentBox}
                id="exit"
                onClick={async e => {
                    // const response = await this.props.onCommentChange(
                    //     this.state.comment,
                    //     this.props.type,
                    //     this.props.index,
                    //     new Date().toGMTString()
                    // );
                    // console.log("onCommentChange:", response);
                    this.props.onExit(false);
                }}
            >
                <button
                    onClick={async e => {
                        // const response = await this.props.onCommentChange(
                        //     this.state.comment,
                        //     this.props.type,
                        //     this.props.index,
                        //     new Date().toGMTString()
                        // );
                        // console.log("onCommentChange:", response);
                        this.props.onExit(false);
                    }}
                    style={styles.close}
                >
                    X
                </button>
                <div
                    // placeholder="type your comments here..."
                    // data-gramm_editor="false"
                    style={styles.comment}
                    // value={this.state.comment}
                    // onChange={e => {
                    //     this.setState({
                    //         comment: e.target.value
                    //     });
                    // }}
                    // onClick={e => {
                    //     e.preventDefault();
                    //     e.stopPropagation();
                    // }}
                >
                    {this.props.comment}
                </div>
            </div>
        );
    }
}
export default CommentBox;
const styles = {
    comment: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        width: "600px",
        height: "120px",
        border: 1,
        margin: "0 auto",
        fontFamily: "HelveticaNeue",
        color: "#666",
        marginTop: "20%",
        backgroundColor: "#fff"
    },
    CommentBox: {
        width: "100vw"
    },
    close: {
        background: "none",
        border: "none",
        fontSize: "40px",
        position: "absolute",
        right: "100px",
        color: "#555",
        fontWeight: "200"
    }
};
