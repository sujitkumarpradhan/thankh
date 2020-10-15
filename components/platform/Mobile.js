import React, { Component } from "react";

import EventMobile from "../placement/eventMobile";
import GatewayMobile from "../placement/gatewayMobile";
import ContextualMobile from "../placement/contextualMobile";
import "./navigation.css";
import { relative } from "path";

class Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickState: {
                value: "Gateway"
            },
            title: "Advertiser",
            bannerSrc: null,
            backupBannerSrc: null
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
            clickState: { value: event.target.id }
        });
        console.log(event.target.id);
    }
    render() {
        return (
            <div>
                <div className="subNavigation">
                    <a
                        style={{
                            ...styles.NavLink,
                            backgroundColor:
                                this.state.clickState.value === "Gateway"
                                    ? "#131a22"
                                    : ""
                        }}
                        id="Gateway"
                        href="#"
                        className="navLink"
                        onClick={this.handleClick}
                    >
                        Gateway
                    </a>
                    <a
                        style={{
                            ...styles.NavLink,
                            backgroundColor:
                                this.state.clickState.value === "Event"
                                    ? "#131a22"
                                    : ""
                        }}
                        id="Event"
                        href="#"
                        className="navLink"
                        onClick={this.handleClick}
                    >
                        Event
                    </a>
                    <a
                        style={{
                            ...styles.NavLink,
                            backgroundColor:
                                this.state.clickState.value === "Contextual"
                                    ? "#131a22"
                                    : ""
                        }}
                        id="Contextual"
                        href="#"
                        className="navLink"
                        onClick={this.handleClick}
                    >
                        Contextual
                    </a>
                </div>
                {this.state.clickState.value === "Gateway" ? (
                    <GatewayMobile
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        MajorEvent={this.props.MajorEvent}
                        locale={this.props.locale}
                        placement="Gateway"
                        createdAt={this.props.createdAt}
                    />
                ) : null}
                {this.state.clickState.value === "Event" ? (
                    <EventMobile
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        MajorEvent={this.props.MajorEvent}
                        locale={this.props.locale}
                        placement="Event"
                        createdAt={this.props.createdAt}
                    />
                ) : null}
                {this.state.clickState.value === "Contextual" ? (
                    <ContextualMobile
                        advertiserID={this.props.advertiserID}
                        platform={this.props.platform}
                        MajorEvent={this.props.MajorEvent}
                        locale={this.props.locale}
                        placement="Contextual"
                        createdAt={this.props.createdAt}
                    />
                ) : null}
            </div>
        );
    }
}
const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    page: {
        width: "100%",
        zIndex: -1
    }
};
export default Mobile;
