import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import "./App.css"

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="/">
            <Room></Room>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;