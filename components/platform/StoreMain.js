import React, { Component } from "react";
import StoreWrapper from "../placement/storeWrapper";

import Page from "../layout/Page";

class Store extends Component {
    render() {
        return (
            <div>
                {({ loading, error, data, getAdvertiser }) => {
                    if (error) {
                        console.log(error);
                        return <div>Some error occurred.</div>;
                    }

                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    return (
                        <div style={styles.pageBg}>
                            <h1>Destination Store</h1>
                        </div>
                    );
                }}
                <StoreWrapper advertiserID={this.props.advertiserID} />

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
export default Store;
