import React, { Component } from "react";

import PageFireTablet from "../layout/PageFireTablet";
import Gen7Device from "../devices/Gen7/Gen7Device";
import Gen6Device from "../devices/Gen6/Gen6Device";
import Gen5Device from "../devices/Gen5/Gen5Device";
import Gen5Vso from "../devices/Gen5Vso/Gen5Vso";
import GenMultipleDevice from "../devices/GenMultiple/GenMultipleDevice";
import Background from "./images/Bg.jpg";
import Approval from "../approval/approval";

class SwipeToURL extends Component {
    render() {
        return (
            <div>
                <div id="_tmp_hack">
                    {/* <div style={styles.approvalDiv}>
                        <Approval
                            key={this.props.key}
                            index={this.props.index}
                            comment={this.props.comment}
                            onCommentChange={this.props.onCommentChange}
                            isApproved={this.props.isApproved}
                            onApprovalChange={this.props.onApprovalChange}
                            isVisibleCommentIcon={
                                this.props.isVisibleCommentIcon
                            }
                        />
                    </div> */}
                    <PageFireTablet
                        style={styles.pageStyleHeader}
                        title="Swipe to ASIN Detail / URL"
                        description=""
                        onDropHandler={this.props.onDropHandler}
                    >
                        <img style={styles.bg} src={Background} />

                        <GenMultipleDevice
                            asset={this.props.appState.GenMultiple}
                            button={this.props.appState.GenMultipleButton}
                            invertTop={this.props.invertedTop}
                            invertBottom={this.props.invertedBottom}
                            placement="SwipeToURL"
                            orientation="landscape"
                            locale={this.props.locale}
                        />
                    </PageFireTablet>
                </div>
                <div style={styles.colorAlt}>
                    <PageFireTablet
                        style={styles.pageStyle}
                        title="Wakescreen Gen 7-8-9"
                        description="Comments"
                        onDropHandler={this.props.onDropHandler}
                    >
                        <Gen7Device
                            asset={this.props.appState.Gen7P}
                            button={this.props.appState.Gen7PButton}
                            invertTop={this.props.invertedTop}
                            invertBottom={this.props.invertedBottom}
                            orientation="portrait"
                            ShowUI={true}
                            locale={this.props.locale}
                        />
                        <Gen7Device
                            asset={this.props.appState.Gen7L}
                            button={this.props.appState.Gen7LButton}
                            invertTop={this.props.invertedTop}
                            invertBottom={this.props.invertedBottom}
                            orientation="landscape"
                            ShowUI={true}
                            locale={this.props.locale}
                        />
                    </PageFireTablet>
                </div>
                <PageFireTablet
                    style={styles.pageStyle}
                    title="Wakescreen Gen 6"
                    description="Comments"
                    onDropHandler={this.props.onDropHandler}
                >
                    <Gen6Device
                        asset={this.props.appState.Gen6P}
                        button={this.props.appState.Gen6PButton}
                        invertTop={this.props.invertedTop}
                        orientation="portrait"
                    />
                    <Gen6Device
                        asset={this.props.appState.Gen6L}
                        button={this.props.appState.Gen6LButton}
                        invertTop={this.props.invertedTop}
                        orientation="landscape"
                    />
                </PageFireTablet>
                <div style={styles.colorAlt}>
                    <PageFireTablet
                        style={styles.pageStyle}
                        title="Wakescreen Gen 5"
                        description="Comments"
                        onDropHandler={this.props.onDropHandler}
                    >
                        <Gen5Device
                            id={this.props.index}
                            asset={this.props.appState.Gen5P}
                            paddleText={this.props.appState.PaddleText}
                            orientation="portrait"
                        />
                        <Gen5Device
                            id={this.props.index}
                            paddleText={this.props.appState.PaddleText}
                            asset={this.props.appState.Gen5L}
                            orientation="landscape"
                        />
                    </PageFireTablet>
                </div>
                <PageFireTablet
                    style={styles.pageStyle}
                    title="VSO Offer"
                    description="Comments"
                    onDropHandler={this.props.onDropHandler}
                >
                    <Gen5Vso
                        asset={this.props.appState.Vso}
                        orientation="portrait"
                    />
                    <Gen5Vso
                        asset={this.props.appState.Vso}
                        orientation="full"
                    />
                </PageFireTablet>
            </div>
        );
    }
}

const styles = {
    pageStyle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        overflowX: "hidden"
    },
    pageStyleHeader: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        color: "#fff",
        overflowX: "hidden"
    },
    colorAlt: {
        backgroundColor: "#f5f5f5",
        height: 700
    },
    bg: {
        maxWidth: "100%",
        maxHeight: "12%",
        // minHeight: "40%",
        position: "absolute",
        top: 60,
        zIndex: -1,
        overflowX: "hidden"
    },
    approvalDiv: {
        top: 50,

        position: "relative"
    }
};

export default SwipeToURL;
