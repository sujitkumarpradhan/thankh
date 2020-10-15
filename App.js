import React, { Component } from "react";
import "./App.css";
import { Grid, Row, Col } from "react-bootstrap";
import Create from "./Components/pages/create.js";
import Footer from "./Components/layout/footer.js";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Create />
        <Footer />
      </div>
    );
  }
}

export default App;
const styles = {
  headline: {
    position: "relative",
    color: "#e07414",
    fontSize: "100px",
    top: "5vh"
  }
};
