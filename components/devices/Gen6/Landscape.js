import React, { Component } from "react";

import LandscapeImage from "./images/Gen6_l.svg";
import LandscapeUI from "./images/Gen6UI-L.svg";
import LandscapeUIWhite from "./images/Gen6UI-L-W.svg";

import Profile from "./images/profile-6.svg";

class Landscape extends Component {
    render() {
        return (
            <div>
                <div style={styles.deviceLandscape}>
                    <img
                        style={styles.deviceImageProfile}
                        alt="Gen6 Device landscape profile"
                        src={Profile}
                    />
                    <img
                        style={{
                            ...styles.deviceImageLandscapeUI,
                            content: this.props.invertTop
                                ? `url(${LandscapeUIWhite})`
                                : `url(${LandscapeUI})`
                        }}
                        alt="Gen6 Device landscape UI Top"
                    />
                </div>
                <div style={styles.deviceLandscape}>
                    {this.props.button ? (
                        <img
                            style={{
                                ...styles.deviceAssetLandscape,
                                zIndex: 3
                            }}
                            alt="Gen7 Device landscape button asset"
                            src={this.props.button}
                        />
                    ) : null}
                    {this.props.asset ? (
                        <img
                            style={styles.deviceAssetLandscape}
                            alt="Gen6 Device landscape asset"
                            src={this.props.asset}
                        />
                    ) : null}
                    <img
                        style={styles.deviceImageLandscape}
                        alt="Gen6 Device landscape"
                        src={LandscapeImage}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    deviceLandscape: {
        position: "relative"
    },

    deviceImageLandscape: {
        height: 400
    },
    deviceAssetLandscape: {
        position: "absolute",
        height: 256,
        top: 68,
        left: 76
    },
    deviceImageLandscapeUI: {
        height: 260,
        zIndex: 1,
        position: "absolute",
        top: 75,
        left: 75,
        content: "url()"
    },
    deviceImageProfile: {
        height: 38,
        zIndex: 2,
        position: "absolute",
        top: 89,
        left: 80
    }
};
export default Landscape;
