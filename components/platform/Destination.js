import React, { Component } from "react";

import LandingPage from "./LandingPage";
import Store from "./StoreMain";
import "./navigation.css";
import StoreMain from "../placement/Store";

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickState: {
                value: "Store",
            },
            title: "Advertiser",
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event) {
        this.setState({
            clickState: { value: event.target.id },
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
                                this.state.clickState.value === "Store"
                                    ? "#131a22"
                                    : "",
                        }}
                        id="Store"
                        href="#"
                        className="navLink"
                        onClick={this.handleClick}
                    >
                        Store
                    </a>
                    <a
                        style={{
                            ...styles.NavLink,
                            backgroundColor:
                                this.state.clickState.value === "Landing Page"
                                    ? "#131a22"
                                    : "",
                        }}
                        id="Landing Page"
                        href="#"
                        className="navLink"
                        onClick={this.handleClick}
                    >
                        Landing Page
                    </a>
                </div>
                {this.state.clickState.value === "Store" ? (
                    <Store
                        advertiserID={this.props.advertiserID}
                        platform="Store"
                        landingPageURL={this.props.landingPageURL}
                        createdAt={this.props.createdAt}
                    />
                ) : null}
                {this.state.clickState.value === "Landing Page" ? (
                    <LandingPage
                        advertiserID={this.props.advertiserID}
                        platform="Store"
                        landingPageURL={this.props.landingPageURL}
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
        alignItems: "flex-end",
    },
    page: {
        width: "100%",
        zIndex: -1,
    },
};
export default Destination;
