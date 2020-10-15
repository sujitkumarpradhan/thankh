import React, { Component } from "react";

import LandscapeImage from "./images/Gen7-l.svg";
import LandscapeUI from "./images/Gen7-l-UI.svg";
import LandscapeImageUITop from "./images/Gen7-l-UI-Top.svg";
import LandscapeImageUIBottom from "./images/Gen7-l-UI-Bottom.svg";
import LandscapeImageUIBottomDE from "./images/Gen7-l-UI-Bottom-DE.svg";
import LandscapeImageUITopWhite from "./images/Gen7-l-UI-Top-W.svg";
import LandscapeImageUIBottomWhite from "./images/Gen7-l-UI-Bottom_W.svg";
import LandscapeImageUIBottomWhiteDE from "./images/Gen7-l-UI-Bottom_W-DE.svg";
import LandscapeVideoUI from "./images/Gen7UI-Video.svg";
import LandscapeEndslateUI from "./images/Gen7UI-endSlate.svg";
import Profile from "./images/profile-7.svg";
class Landscape extends Component {
    render() {
        return (
            <div>
                <div style={styles.deviceLandscape}>
                    <img
                        style={{
                            ...styles.deviceVideoUI,
                            visibility: this.props.VideoUI
                                ? "visible"
                                : "hidden"
                        }}
                        alt="Gen7 Device landscape video UI"
                        src={LandscapeVideoUI}
                    />
                    <img
                        style={{
                            ...styles.deviceVideoUI,
                            visibility: this.props.EndslateUI
                                ? "visible"
                                : "hidden"
                        }}
                        alt="Gen7 Device landscape endslate UI"
                        src={LandscapeEndslateUI}
                    />
                    <img
                        style={{
                            ...styles.deviceImageProfile,
                            visibility: this.props.ShowUI ? "visible" : "hidden"
                        }}
                        alt="Gen7 Device landscape profile"
                        src={Profile}
                    />
                    <img
                        style={{
                            ...styles.deviceImageLandscapeUI,
                            visibility: this.props.ShowUI
                                ? "visible"
                                : "hidden",
                            content: this.props.invertTop
                                ? `url(${LandscapeImageUITopWhite})`
                                : `url(${LandscapeImageUITop})`
                        }}
                        alt="Gen7 Device landscape UI Top"
                    />
                    <img
                        style={{
                            ...styles.deviceImageLandscapeUI,
                            visibility: this.props.ShowUI
                                ? "visible"
                                : "hidden",
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
                                height:
                                    this.props.VideoUI || this.props.EndslateUI
                                        ? 231
                                        : 272,
                                top:
                                    this.props.VideoUI || this.props.EndslateUI
                                        ? 96
                                        : 60,
                                zIndex: 3
                            }}
                            alt="Gen7 Device landscape button asset"
                            src={this.props.button}
                        />
                    ) : null}
                    {this.props.asset ? (
                        <img
                            style={{
                                ...styles.deviceAssetLandscape,
                                height:
                                    this.props.VideoUI || this.props.EndslateUI
                                        ? 231
                                        : 272,
                                top:
                                    this.props.VideoUI || this.props.EndslateUI
                                        ? 96
                                        : 60
                            }}
                            alt="Gen7 Device landscape asset"
                            src={this.props.asset}
                        />
                    ) : null}

                    <img
                        style={styles.deviceImageLandscape}
                        alt="Gen7 Device landscape"
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
        height: 272,
        top: 60,
        left: 64
    },
    deviceImageLandscapeUI: {
        height: 271,
        zIndex: 1,
        position: "absolute",
        top: 60,
        left: 64,
        content: `url(${LandscapeImageUITop})`,
        visibility: "hidden"
    },
    deviceImageProfile: {
        height: 23,
        zIndex: 2,
        position: "absolute",
        top: 68,
        left: 466,
        visibility: "hidden"
    },
    deviceVideoUI: {
        zIndex: 2,
        position: "absolute",
        top: 58,
        left: 63,
        height: 273,
        visibility: "hidden"
    }
};
export default Landscape;
