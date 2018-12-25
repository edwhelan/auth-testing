import React, { Component } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Questions from './components/Questions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Questions />
        <p>work in progress...</p>
      </div>
    );
  }
}

export default App;
