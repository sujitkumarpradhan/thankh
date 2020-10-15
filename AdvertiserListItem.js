import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./Presentation.css";

import { Link, Route, Switch } from "react-router-dom";

import { Query, Mutation } from "react-apollo";

class AdvertiserListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status,
            sfURL: this.props.sfURL,
        };
        // console.log("URL CHECK FOR VALIDATION------------------", this.props.location.pathname);
    }

    // componentDidMount() {
    //     // console.log(this.props.location.state.designersAlias);
    //     console.log("sfURL: ", this.props.sfURL);
    //     if (this.props.sfURL === null) {
    //         this.setState({
    //             status: this.props.status
    //         });
    //     } else {
    //         fetch(
    //             `http://adinfoprovider.corp.amazon.com/getSalesforceDetails`,
    //             {
    //                 method: "POST",
    //                 body: JSON.stringify({
    //                     assignmentId: this.props.sfURL
    //                 })
    //             }
    //         ).then(response => {
    //             response.json().then(response => {
    //                 this.setState({
    //                     status: response.status
    //                 });
    //             });
    //         });
    //     }
    // }
    render() {
        return (
            <tr>
                <td style={styles.listItem}>
                    <Link
                        to={`/presentation/Desktop/${this.props.name}/${
                            this.props.id
                        }/${this.props.event}/${this.props.sfURL.replace(
                            "https://ams-amazon.my.salesforce.com/",
                            ""
                        )}`}
                        className="ListItem"
                    >
                        {this.props.name}
                    </Link>
                </td>
                <td style={styles.listItem}>{`R${this.props.version}`}</td>
                <td style={styles.listItem}>{this.props.event}</td>

                <td style={styles.listItem}>{this.props.locale}</td>
                <td style={styles.listItem}>{this.props.designer}</td>

                <td style={styles.listItem}>{this.props.createdAt}</td>

                <td style={styles.listItem}>{this.props.lastModified}</td>
            </tr>
        );
    }
}
export default AdvertiserListItem;
const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    listItem: {
        marginRight: "10px",
    },
    listItemStatus: {
        color: "#ee810c",
    },
    error: {
        fontSize: "12px",
        color: "#905020",
        padding: "10px",
        textAlign: "center",
    },
    characterBg: {
        height: 40,
        width: "100vw",
        backgroundColor: "#fff",
    },
};
