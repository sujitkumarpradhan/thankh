import React, { Component } from "react";

import Portrait from "./Portrait";
import Landscape from "./Landscape";

class Gen6Device extends Component {
    render() {
        if (this.props.orientation === "portrait") {
            return (
                <Portrait
                    asset={this.props.asset}
                    invertTop={this.props.invertTop}
                    button={this.props.button}
                />
            );
        } else if (this.props.orientation === "landscape") {
            return (
                <Landscape
                    asset={this.props.asset}
                    invertTop={this.props.invertTop}
                    button={this.props.button}
                />
            );
        } else {
            return <div>Invalid Orientation</div>;
        }
    }
}

export default Gen6Device;
