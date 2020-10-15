import React, { Component } from "react";

import Page from "../layout/Page";
import BannerWrappers from "../sizes/bannerWrappers";
import FireTVBg from "./images/FireTVBG1.jpg";

class FireTV extends Component {
    render() {
        return (
            <div>
                <div style={styles.pageBg}>
                    <BannerWrappers
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        placement="Gateway"
                        width={1920}
                        height={1080}
                        top={36}
                        left={2}
                        disableToggle={true}
                        approvalPadding={true}
                        paddingCarousel={true}
                    />
                </div>
                <Page
                    style={styles.pageStyle}
                    description="Type creative comments here..."
                />
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
    pageBg: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "1130px",
        backgroundPosition: "center",
        position: "relative",
        backgroundImage: `url(${FireTVBg})`,
        margin: 10,
        overflow: "hidden"
    }
};
export default FireTV;
