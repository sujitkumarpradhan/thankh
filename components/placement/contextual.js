import React, { Component } from "react";
import update from "react-addons-update";

import Page from "../layout/Page";
import BannerWrapper from "../sizes/bannerWrapper";
import pageBgContextual from "./images/DesktopContextual.jpg";
import BannerWrappers from "../sizes/bannerWrappers";

class Contextual extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        console.log("Contextual Event:", this.props.MajorEvent);
    }

    render() {
        return (
            <div>
                <div>
                    <div style={styles.pageBgPrime}>
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={300}
                            height={250}
                            top={556}
                            left={584}
                        />

                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={160}
                            height={600}
                            top={220}
                            left={-650}
                        />
                        <BannerWrappers
                            advertiserID={this.props.advertiserID}
                            platform={this.props.platform}
                            placement={this.props.placement}
                            width={970}
                            height={250}
                            top={190}
                            left={33}
                        />
                    </div>
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
        width: "100%",
        zIndex: -1
    },
    pageBgPrime: {
        backgroundRepeat: "no-repeat",
        height: "2810px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${pageBgContextual})`,
        top: 30,
        overflowX: "hidden"
    }
};
export default Contextual;
