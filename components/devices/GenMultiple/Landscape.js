import React, { Component } from "react";

// import Switch, { Case, Default } from "react-switch-case";

import LandscapeImageSwipe from "./images/ASIN-URL.svg";
import LandscapeImageVideo from "./images/Video-overlay.svg";
import LandscapeImageDualVideo from "./images/DualCTA-Video-overlay.svg";
import LandscapeImageDual from "./images/DualCTA.svg";
import LandscapeImageCreative from "./images/panels.svg";
import LandscapeImageUITop from "./images/Gen7-l-UI-Top.svg";
import LandscapeImageUIBottom from "./images/Gen7-l-UI-Bottom.svg";
import LandscapeImageUIBottomDE from "./images/Gen7-l-UI-Bottom-DE.svg";
import LandscapeImageUITopWhite from "./images/Gen7-l-UI-Top-W.svg";
import LandscapeImageUIBottomWhite from "./images/Gen7-l-UI-Bottom_W.svg";
import LandscapeImageUIBottomWhiteDE from "./images/Gen7-l-UI-Bottom_W-DE.svg";

import Profile from "./images/profile-7.svg";

class Landscape extends Component {
    render() {
        return (
            <div>
                <div style={styles.deviceLandscape}>
                    <img
                        style={styles.deviceImageProfile}
                        alt="Gen7 Device landscape profile"
                        src={Profile}
                    />
                    <img
                        style={{
                            ...styles.deviceImageLandscapeUI,
                            content: this.props.invertTop
                                ? `url(${LandscapeImageUITopWhite})`
                                : `url(${LandscapeImageUITop})`
                        }}
                        alt="Gen7 Device landscape UI Top"
                    />
                    <img
                        style={{
                            ...styles.deviceImageLandscapeUI,

                            content: this.props.invertBottom
                                ? this.props.locale === "DE"
                                    ? `url(${LandscapeImageUIBottomWhiteDE})`
                                    : `url(${LandscapeImageUIBottomWhite})`
                                : this.props.locale === "DE"
                                    ? `url(${LandscapeImageUIBottomDE})`
                                    : `url(${LandscapeImageUIBottom})`
                        }}
                        alt="Gen7 Device landscape UI Bottom"
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
                            alt="Gen7 Device landscape asset"
                            src={this.props.asset}
                        />
                    ) : null}

                    {this.props.placement === "SwipeToURL" && (
                        <img
                            style={styles.deviceImageLandscape}
                            alt="Gen7 Device landscape"
                            src={LandscapeImageSwipe}
                        />
                    )}

                    {(() => {
                        switch (this.props.placement) {
                            case "VideoOverlay":
                                return (
                                    <img
                                        style={styles.deviceImageLandscape}
                                        alt="Gen7 Device landscape"
                                        src={LandscapeImageVideo}
                                    />
                                );
                                break;
                            case "DualCTA":
                                return (
                                    <img
                                        style={styles.deviceImageLandscape}
                                        alt="Gen7 Device landscape"
                                        src={LandscapeImageDual}
                                    />
                                );
                                break;
                            case "DualCTAVideo":
                                return (
                                    <img
                                        style={styles.deviceImageLandscape}
                                        alt="Gen7 Device landscape"
                                        src={LandscapeImageDualVideo}
                                    />
                                );
                                break;
                            case "CreativeBuilder":
                                return (
                                    <img
                                        style={styles.deviceImageLandscape}
                                        alt="Gen7 Device landscape"
                                        src={LandscapeImageCreative}
                                    />
                                );
                                break;

                            default:
                                break;
                        }
                    })()}
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
        height: 520
    },
    deviceAssetLandscape: {
        position: "absolute",
        height: 316,
        top: 34,
        left: 410
    },
    deviceImageLandscapeUI: {
        height: 316,
        zIndex: 1,
        position: "absolute",
        top: 34,
        left: 410,
        content: "url()"
    },
    deviceImageProfile: {
        height: 25,
        zIndex: 2,
        position: "absolute",
        top: 45,
        left: 878
    }
};
export default Landscape;
