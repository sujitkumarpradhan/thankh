import React, { Component } from "react";
import Dropzone from "react-dropzone";

import logo from "./images/Amazon.svg";

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            page: this.props.page
        };
    }
    render() {
        return (
            <div>
                <div style={styles.footer}>
                    <footer>
                        <img style={styles.logo} alt="Amazon" src={logo} />
                        <b> CCS &nbsp; </b> Campaign and Creative Services | ©
                        2019, amazon.com, Inc. All Rights Reserved. Property of
                        Amazon. Do not distribute.
                    </footer>
                </div>
            </div>
        );
    }
}

const styles = {
    pageDescription: {
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        display: "block",
        fontSize: "14px",
        width: "960px",
        height: "80px",
        border: 1,
        margin: "0 auto",
        fontFamily: "HelveticaNeue",
        color: "#666",
        background: "transparent",
        resize: "auto"
    },
    pagePadding: {
        padding: 10,
        width: "100%",
        position: "fixed",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        bottom: 0,
        boxShadow: "rgba(77, 77, 77, 0.62) 1px 2px 11px 1px"
    },
    footer: {
        padding: 20,
        fontSize: 11,
        color: "#999",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#1b2531",
        width: "100%",
        bottom: 0,
        position: "fixed",
        left: 0,
        zIndex: 1000,
        pageBreakAfter: "always"
    },
    logo: {
        height: 14,
        paddingRight: 20,
        position: "relative",
        top: "2px"
    }
};

export default Page;
