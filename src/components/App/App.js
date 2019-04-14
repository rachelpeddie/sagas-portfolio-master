import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Admin from '../Admin/Admin';
import Projects from '../Projects/Projects';
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <h1>Rachel Peddie</h1>
        <Router>
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/' component={Projects} />
        </Router>
      </div>
    );
  }
}

export default App;
