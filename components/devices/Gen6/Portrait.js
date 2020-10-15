import React, { Component } from "react";

import PortraitImage from "./images/Gen6_p.svg";
import PortraitUI from "./images/Gen6UI-P.svg";
import PortraitUIWhite from "./images/Gen6UI-P-W.svg";
import Profile from "./images/profile-6.svg";

class Portrait extends Component {
    render() {
        return (
            <div>
                <div style={styles.devicePortrait}>
                    <img
                        style={styles.deviceImageProfile}
                        alt="Gen6 Device Portrait profile"
                        src={Profile}
                    />
                    <img
                        style={{
                            ...styles.deviceImagePortraitUI,
                            content: this.props.invertTop
                                ? `url(${PortraitUIWhite})`
                                : `url(${PortraitUI})`
                        }}
                        alt="Gen6 Device Portrait UI Top"
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
        width: 256,
        left: 74,
        top: 70
    },
    deviceImagePortraitUI: {
        width: 260,
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

export default Portrait;
