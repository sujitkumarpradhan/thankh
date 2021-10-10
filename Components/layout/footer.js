import React, { Component } from "react";
import Amazonlogo from "../../assets/Amazon.svg";
import "../../style/global.css";

class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div style={styles.footer} className="feedback footer">
                    <footer>
                        <img
                            style={styles.logo}
                            alt="Amazon"
                            src={Amazonlogo}
                        />
                        <b> DSS Design Scale Service &nbsp;</b> | © 2020, Amazon.com, Inc. All right reserved. Property of Amazon.{" "}
                        {/* <span style={styles.footerLink}>
                            <a
                                href="https://trawler.amazon.com/ba%20checklist%20feedback"
                                target="_blank"
                            >
                                <i className="far fa-comments" /> Got feedback
                                for us? &nbsp;&nbsp;
                            </a>
                            |
                            <a
                                href="https://tt.amazon.com/quicklink/Q000911421"
                                target="_blank"
                            >
                                &nbsp;&nbsp;Report issue
                            </a>
                        </span> */}
                    </footer>
                </div>
            </div>
        );
    }
}

const styles = {
    footer: {
        padding: 20,
        fontSize: 11,
        color: "#999",
        // display: "flex",
        justifyContent: "center",
        backgroundColor: "#1b2531",
        width: "100%",
        bottom: 0,
        position: "fixed",
        left: 0,
        zIndex: 100,
        alignItems: "center"
    },
    footerLink: {
        marginLeft: "20px"
    },
    logo: {
        height: 14,
        paddingRight: 20,
        position: "relative",
        top: "6px"
    }
};

export default Footer;
