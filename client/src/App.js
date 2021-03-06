import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Questions from './components/Questions';
import Question from './components/Question';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path='/' component={Questions} />
        <Route exact path='/question/:questionId' component={Question} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-question' component={NewQuestion} />

      </div>
    );
  }
}

export default App;
