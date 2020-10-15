import React, { Component } from "react";

import Portrait from "./Portrait";
import Landscape from "./Landscape";

class Gen7Device extends Component {
    render() {
        if (this.props.orientation === "portrait") {
            return (
                <Portrait
                    asset={this.props.asset}
                    invertTop={this.props.invertTop}
                    invertBottom={this.props.invertBottom}
                    ShowUI={this.props.ShowUI}
                    locale={this.props.locale}
                    button={this.props.button}
                />
            );
        } else if (this.props.orientation === "landscape") {
            return (
                <Landscape
                    asset={this.props.asset}
                    invertTop={this.props.invertTop}
                    invertBottom={this.props.invertBottom}
                    ShowUI={this.props.ShowUI}
                    VideoUI={this.props.VideoUI}
                    EndslateUI={this.props.EndslateUI}
                    locale={this.props.locale}
                    button={this.props.button}
                />
            );
        } else {
            return <div>Invalid Orientation</div>;
        }
    }
}

export default Gen7Device;
