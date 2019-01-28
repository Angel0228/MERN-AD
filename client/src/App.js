import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

//import Components
import Adverts from "./components/advert/Adverts";
import CreateAdvert from "./components/advert/CreateAdvert";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Adverts} />
            <Route exact path="/advert/create" component={CreateAdvert} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
