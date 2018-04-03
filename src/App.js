import './App.css';
import React from 'react';
import Main from './Main';
import Search from './Search';
import { Route } from 'react-router-dom';

class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Route path='/' exact component={Main} />
        <Route path='/search' component={Search} />
      </div>
    );
  }
}

export default App;
