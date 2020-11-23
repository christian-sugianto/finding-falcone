import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Success from "./pages/Success";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/success" component={Success} />
    </Router>
  );
}

export default App;
