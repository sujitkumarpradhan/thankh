import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Footer from "../sections/footer";
import Banner from "../sections/banner";
import Faqinfo from "../sections/faqInfo";
import "../../style/global.css";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="App">
          <Banner pageType={
          "faq"
        }/>
        <Faqinfo/>
        <Footer/>
        </div>
    );
  }
}
export default withRouter(FAQ);
