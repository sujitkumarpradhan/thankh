import React, { Component } from "react";

import Page from "../layout/Page";
import pageHeader from "./images/pageHeader.jpg";
import pageMid from "./images/pageMid.jpg";
import pageSec from "./images/pageSec.jpg";
import pageFooter from "./images/pageFooter.jpg";
import pageHeaderPD19 from "./images/PD-pageHeader2019.jpg";
import pageMidPD19 from "./images/PD-pageMid2019.jpg";

import pageFooterPD19 from "./images/PD-pageFooter2019.jpg";

import BannerWrappers from "../sizes/bannerWrappers";

class Event extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "Prime Day" &&
                            this.props.createdAt.includes("2019") != true
                                ? "initial"
                                : "none",
                        position: "relative",
                        top: "30px"
                    }}
                >
                    <img style={styles.page} src={pageHeader} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={980}
                        height={55}
                    />
                    <img style={styles.page} src={pageMid} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={970}
                        height={250}
                    />
                    <img style={styles.page} src={pageFooter} />
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>

                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "BFCM"
                                ? "initial"
                                : "none",
                        position: "relative",
                        top: "30px"
                    }}
                >
                    <img style={styles.page} src={pageHeader} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={980}
                        height={55}
                    />
                    <img style={styles.page} src={pageMid} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={970}
                        height={250}
                    />
                    <img style={styles.page} src={pageFooter} />
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>
                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.MajorEvent === "Prime Day" &&
                            this.props.createdAt.includes("2019")
                                ? "initial"
                                : "none",
                        position: "relative",
                        top: "30px"
                    }}
                >
                    <img style={styles.page} src={pageHeaderPD19} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={980}
                        height={55}
                    />
                    <img style={styles.page} src={pageMidPD19} />
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={970}
                        height={250}
                    />
                    <img style={styles.page} src={pageFooterPD19} />
                    <Page
                        style={styles.pageStyle}
                        description="Type creative comments here..."
                    />
                </div>
            </div>
        );
    }
}
const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    page: {
        width: "80%",
        zIndex: -1,
        overflowX: "hidden"
    }
};
export default Event;
