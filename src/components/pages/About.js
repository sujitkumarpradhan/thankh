import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Footer from "../sections/footer";
import Banner from "../sections/banner";
import Aboutus from "../sections/aboutUs";
import "../../style/global.css";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="App">
          <Banner pageType={
          "about"
        }/>
        <Aboutus/>
        <Footer/>
        </div>
    );
  }
}
export default withRouter(About);
