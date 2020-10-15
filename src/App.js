import React, { Component } from 'react';
import './App.css';
import Footer from "./components/sections/footer";
import Banner from "./components/sections/banner";
import Art from "./components/sections/art";
import "./style/global.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Banner/>
        <Art/>
        <Footer/>
      </div>
    );
  }
}

export default App;
