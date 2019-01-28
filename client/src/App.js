import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Adverts from "./components/advert/Adverts";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Adverts} />
        </div>
      </Router>
    );
  }
}

export default App;
