import React, { Component } from "react";

import PortraitImage from "./images/Gen7-p.svg";
import PortraitImageUITop from "./images/Gen7UI-P-Top.svg";
import PortraitImageUIBottom from "./images/Gen7UI-P-Bottom.svg";
import PortraitImageUIBottomDE from "./images/Gen7UI-P-Bottom-DE.svg";
import PortraitImageUITopWhite from "./images/Gen7UI-P-Top-W.svg";
import PortraitImageUIBottomWhite from "./images/Gen7UI-P-Bottom-W.svg";
import PortraitImageUIBottomWhiteDE from "./images/Gen7UI-P-Bottom-W-DE.svg";
import Profile from "./images/profile-7.svg";

class Portrait extends Component {
    render() {
        return (
            <div>
                <div style={styles.devicePortrait}>
                    <img
                        style={{
                            ...styles.deviceImageProfile,
                            visibility: this.props.ShowUI ? "visible" : "hidden"
                        }}
                        alt="Gen7 Device Portrait profile"
                        src={Profile}
                    />
                    <img
                        style={{
                            ...styles.deviceImagePortraitUI,
                            visibility: this.props.ShowUI
                                ? "visible"
                                : "hidden",
                            content: this.props.invertTop
                                ? `url(${PortraitImageUITopWhite})`
                                : `url(${PortraitImageUITop})`
                        }}
                        alt="Gen7 Device Portrait UI Top"
                    />
                    <img
                        style={{
                            ...styles.deviceImagePortraitUI,
                            visibility: this.props.ShowUI
                                ? "visible"
                                : "hidden",
                            content: this.props.invertBottom
                                ? this.props.locale === "DE"
                                    ? `url(${PortraitImageUIBottomWhiteDE})`
                                    : `url(${PortraitImageUIBottomWhite})`
                                : this.props.locale === "DE"
                                    ? `url(${PortraitImageUIBottomDE})`
                                    : `url(${PortraitImageUIBottom})`
                        }}
                        alt="Gen7 Device Portrait UI Bottom"
                    />
                </div>
                <div style={styles.devicePortrait}>
                    {this.props.button ? (
                        <img
                            style={{
                                ...styles.deviceAssetPortrait,
                                zIndex: 3
                            }}
                            alt="Gen7 Device portrait button asset"
                            src={this.props.button}
                        />
                    ) : null}
                    {this.props.asset ? (
                        <img
                            style={styles.deviceAssetPortrait}
                            alt="Fake Device portrait asset"
                            src={this.props.asset}
                        />
                    ) : null}
                    <img
                        style={styles.deviceImagePortrait}
                        alt="Fake Device portrait"
                        src={PortraitImage}
                    />
                </div>
            </div>
        );
    }
}

const styles = {
    devicePortrait: {
        position: "relative"
    },
    deviceImagePortrait: {
        width: 400
    },
    deviceAssetPortrait: {
        position: "absolute",
        width: 272,
        left: 64,
        top: 60
    },
    deviceImagePortraitUI: {
        width: 271,
        zIndex: 1,
        position: "absolute",
        top: 60,
        left: 63,
        content: `url(${PortraitImageUITop})`,
        visibility: "hidden"
    },
    deviceImageProfile: {
        height: 23,
        zIndex: 2,
        position: "absolute",
        top: 68,
        left: 303,
        visibility: "hidden"
    }
};

export default Portrait;
