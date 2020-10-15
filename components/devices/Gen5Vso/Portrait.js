import React, { Component } from "react";

import PortraitImage from "./images/Gen5-vso.svg";

class Portrait extends Component {
    render() {
        return (
            <div style={styles.devicePortrait}>
                {this.props.asset ? (
                    <img
                        style={styles.deviceAssetPortrait}
                        alt="Gen5 Device portrait asset"
                        src={this.props.asset}
                    />
                ) : null}
                <img
                    style={styles.deviceImagePortrait}
                    alt="Gen5 Device portrait"
                    src={PortraitImage}
                />
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
        width: 65,
        left: 88,
        top: 137,
        border: "1px solid #222"
    }
};

export default Portrait;
