import React, { Component } from "react";
import LPWrapper from "../placement/lpWrapper";

import Page from "../layout/Page";

class LandingPage extends Component {
    render() {
        return (
            <div>
                <LPWrapper advertiserID={this.props.advertiserID} />

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
        alignItems: "flex-end",
    },
    page: {
        width: "100%",
        zIndex: -1,
    },
    pageBg: {
        backgroundRepeat: "no-repeat",
        backgroundSize: "1130px",
        backgroundPosition: "center",
        position: "relative",
        // backgroundImage: `url(${LangingBg})`,
        margin: 10,
        overflowX: "hidden",
    },
};
export default LandingPage;
