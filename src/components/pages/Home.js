import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Footer from "../sections/footer";
import Banner from "../sections/banner";
import Art from "../sections/art";
import "../../style/global.css";


class Home extends React.Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div className="App">
        <Banner pageType={
          "home"
        } />
        <Art />
        <Footer />
       
      </div>
    );
  }
}
export default withRouter(Home);

