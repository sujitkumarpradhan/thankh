import React, { Component } from "react";

import Portrait from "./Portrait";
import Landscape from "./Landscape";

class Gen5Device extends Component {
    render() {
        if (this.props.orientation === "portrait") {
            return (
                <Portrait
                    asset={this.props.asset}
                    id={this.props.id}
                    paddleText={this.props.paddleText}
                />
            );
        } else if (this.props.orientation === "landscape") {
            return (
                <Landscape
                    asset={this.props.asset}
                    id={this.props.id}
                    paddleText={this.props.paddleText}
                />
            );
        } else {
            return <div>Invalid Orientation</div>;
        }
    }
}

export default Gen5Device;
