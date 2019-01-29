import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "./App.css";

//import Components
import Adverts from "./components/advert/Adverts";
import Advert from "./components/advert/Advert";
import CreateAdvert from "./components/advert/CreateAdvert";
import EditAdvert from "./components/advert/EditAdvert";
import UserProfile from "./components/user/UserProfile";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Adverts} />
            <Route exact path="/advert/detail/:id" component={Advert} />
            <Route exact path="/advert/create" component={CreateAdvert} />
            <Route exact path="/advert/update/:id" component={EditAdvert} />
            <Route exact path="/users/:id" component={UserProfile} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
