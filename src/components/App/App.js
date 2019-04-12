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
        <p>Rachel Peddie</p>
        <Router>
          <Route path='/admin' component={Admin} />
          <Route exact path='/' component={Projects} />
        </Router>
      </div>
    );
  }
}

export default App;
