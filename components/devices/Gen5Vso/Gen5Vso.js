import React, { Component } from "react";

import Portrait from "./Portrait";
import Full from "./Full";

class Gen5Vso extends Component {
    render() {
        if (this.props.orientation === "portrait") {
            return <Portrait asset={this.props.asset} />;
        } else if (this.props.orientation === "full") {
            return <Full asset={this.props.asset} />;
        } else {
            return <div>Invalid Orientation</div>;
        }
    }
}

export default Gen5Vso;

const styles = {
    vso: {
        width: 240,
        height: 240,
        border: "1px solid #999"
    }
};
