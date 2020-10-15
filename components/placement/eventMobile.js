import React, { Component } from "react";
import "./Mobile.css";

import Page from "../layout/Page";
import pageMobile3 from "./images/pageMobile3.png";
import pageMobile4 from "./images/pageMobile4.png";
import pageMobile5 from "./images/pageMobile5.png";
import deviceIphone from "./images/deviceIphone.png";
import TabletCA from "./images/tabletCA_event.jpg";
import deviceTablet from "./images/deviceTablet.png";

import BannerWrapper from "../sizes/bannerWrapper";
import BannerWrappers from "../sizes/bannerWrappers";
import { relative } from "path";

class EventMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isApproved: null,
        };
    }

    render() {
        return (
            <div style={styles.divWrapper}>
                <div style={styles.mobile}>
                    <img style={styles.pageHeader} src={pageMobile3} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        asin={1}
                        placement={this.props.placement}
                        width={320}
                        height={50}
                        top={130}
                    />
                </div>
                <div style={styles.mobile}>
                    <img style={styles.pageHeader} src={pageMobile3} />
                    <span style={styles.labelbanner}> 320X50 ASIN 2</span>
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        asin={2}
                        placement={this.props.placement}
                        width={320}
                        height={50}
                        top={100}
                    />
                </div>

                {/* <div
                    style={{
                        ...styles.toggle
                    }}
                >
                    <div style={styles.mobile}>
                        <img style={styles.pageHeader} src={pageMobile5} />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={414}
                            height={125}
                            top={300}
                            left={0}
                        />
                    </div>
                </div> */}
                <div
                    style={{
                        ...styles.toggle,
                    }}
                >
                    <div style={styles.mobile}>
                        <img style={styles.pageHeader} src={pageMobile4} />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={300}
                            height={250}
                            top={200}
                        />
                    </div>
                </div>

                <div
                    style={{
                        ...styles.toggle,
                        display:
                            this.props.locale === "CA" &&
                            this.props.MajorEvent === "BFCM"
                                ? "initial"
                                : "none",
                    }}
                >
                    <div style={styles.mobile}>
                        <img style={styles.pageHeader} src={pageMobile4} />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={414}
                            height={100}
                            top={214}
                            left={0}
                        />
                    </div>
                </div>
                <div
                    style={{
                        ...styles.tabletNEw,
                        display:
                            this.props.locale === "CA" &&
                            this.props.MajorEvent === "BFCM"
                                ? "initial"
                                : "none",
                    }}
                >
                    <img style={styles.TabletMock} src={TabletCA} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={300}
                        height={250}
                        top={140}
                        left={-10}
                    />
                </div>
                <div
                    style={{
                        ...styles.tabletNEw,
                    }}
                >
                    <img style={styles.TabletMock} src={TabletCA} />

                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement={this.props.placement}
                        width={970}
                        height={250}
                        top={180}
                        left={-4}
                    />
                </div>

                <Page />
            </div>
        );
    }
}
const styles = {
    pageHeader: {
        position: "absolute",
        width: "324px",
        left: 15,
        top: 68,
        height: "574px",
    },
    TabletMock: {
        position: "absolute",
        width: "560px",
        left: "116px",
        top: "78px",
        height: "724px",
        height: "824px",
    },

    tabletNEw: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "800px 1000px",
        height: 1200,
        width: 800,
        //marginLeft: "-30%",
        position: "relative",
        backgroundImage: `url(${deviceTablet})`,
        top: 20,
    },
    mobile: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "354px 722px",
        height: 800,
        width: 354,
        marginRight: 40,
        position: "relative",
        backgroundImage: `url(${deviceIphone})`,
        top: 20,
    },
    divWrapper: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    labelbanner: {
        top: "170px",
        color: "#1175c6",
        backgroundColor: "#feffff",
        border: "1px solid #7bacd5",
        padding: "2px",
        fontSize: "11px",
        borderRadius: "3px",
        width: "29%",
        marginLeft: "19px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        position: "relative",
    },
};
export default EventMobile;
