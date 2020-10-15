import React, { Component } from "react";

import PortraitImage from "./images/Gen7-p.png";

class Portrait extends Component {
    render() {
        return (
            <div style={styles.devicePortrait}>
                {this.props.asset ? (
                    <img
                        style={styles.deviceAssetPortrait}
                        alt="Gen7 Device portrait asset"
                        src={this.props.asset}
                    />
                ) : null}
                <img
                    style={styles.deviceImagePortrait}
                    alt="Gen7 Device portrait"
                    src={PortraitImage}
                />
            </div>
        );
    }
}

const styles = {
    devicePortrait: {
        position: "relative",
        left: 20
    },
    deviceImagePortrait: {
        width: 400
    },
    deviceAssetPortrait: {
        position: "absolute",
        width: 262,
        left: 66,
        top: 42
    }
};

export default Portrait;
