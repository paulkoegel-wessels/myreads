import './App.css';
import React from 'react';
import Main from './Main';
import Search from './Search';

class BooksApp extends React.Component {
  render () {
    return (
      <div className='app'>
        { window.location.pathname === '/search'
          ? <Search />
          : <Main />}
      </div>
    );
  }
}

export default BooksApp;
