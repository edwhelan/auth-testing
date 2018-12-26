import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Questions from './components/Questions';
import Question from './components/Question';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Questions} />
        <Route exact path='/question/:questionId' component={Question} />
      </div>
    );
  }
}

export default App;
