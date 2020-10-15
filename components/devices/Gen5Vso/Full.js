import React, { Component } from "react";

class Full extends Component {
    render() {
        return (
            <div>
                {this.props.asset ? (
                    <img
                        style={styles.deviceAssetVso}
                        alt="VSO asset"
                        src={this.props.asset}
                    />
                ) : null}
            </div>
        );
    }
}

const styles = {
    deviceAssetVso: {
        position: "relative",
        width: 240,
        left: 10,
        bottom: 224,
        border: "1px solid #999"
    }
};

export default Full;
