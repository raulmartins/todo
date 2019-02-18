import './App.css'
import React, { Component } from 'react';

import Header from './templates/Header'
import Footer from './templates/Footer'
import { HashRouter } from 'react-router-dom'
import Rauter from './Router'

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="app">
          <Header title="Register" subtitle="Task" />
          <Rauter />
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

export default App;
