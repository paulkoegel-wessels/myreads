import './App.css';
import React from 'react';
import * as BooksAPI from './BooksAPI';
import Main from './Main';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: true
  };

  componentDidMount () {
    BooksAPI.getAll().then(books => this.setState(state => ({
      ...state,
      books,
      isLoading: false
    })));
  }

  render () {
    return (
      <div className='app'>
        { this.state.isLoading
          ? <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <h1>Loading...</h1>
          </div>
          : window.location.pathname === '/search'
            ? <Search />
            : <Main books={this.state.books} />}
      </div>
    );
  }
}

export default BooksApp;
