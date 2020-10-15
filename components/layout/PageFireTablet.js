import React, { Component } from "react";
import Dropzone from "react-dropzone";
import logo from "./images/AmazonBlack.svg";

class PageFireTablet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description
        };
    }

    render() {
        return (
            <div className="pagebreak" style={styles.pagePadding}>
                <span
                    style={styles.pageTitle}
                    value={this.state.title}
                    className="_w_t"
                >
                    {this.state.title}
                </span>

                <Dropzone
                    style={{}}
                    disableClick={true}
                    accept="image/*"
                    onDrop={this.props.onDropHandler}
                >
                    <div style={this.props.style}> {this.props.children} </div>
                </Dropzone>

                <footer style={styles.footer}>
                    <img style={styles.logo} alt="Amazon" src={logo} />
                    <b> ADX &nbsp; </b> Amazon Display Advertising Design and
                    User Experience. ©2018, Amazon.com, Inc.All Rights Reserved.
                </footer>
            </div>
        );
    }
}

const styles = {
    pageTitle: {
        paddingTop: 20,
        paddingBottom: 5,
        textAlign: "center",
        display: "block",
        fontSize: "1.5em",
        fontWeight: "bold",
        width: "600px",
        border: 0,
        margin: "0 auto",
        fontFamily: "HelveticaNeue-CondensedBold",
        color: "#FF9900",
        background: "transparent"
    },
    pageDescription: {
        paddingTop: 0,
        paddingBottom: 10,
        textAlign: "center",
        display: "block",
        fontSize: "14px",
        width: "580px",
        border: 0,
        margin: "0 auto",
        fontFamily: "HelveticaNeue",
        color: "#999",
        background: "transparent",
        resize: "none",
        overflow: "hidden"
    },
    pagePadding: {
        marginTop: 40,
        marginBottom: 30
    },
    footer: {
        paddingTop: 0,
        fontSize: 10,
        color: "#666",
        display: "flex",
        justifyContent: "center",
        zIndex: 1000
    },
    logo: {
        height: 16,
        paddingRight: 20
    }
};

export default PageFireTablet;
