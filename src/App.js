import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Main from './Main';
import Search from './Search';
import InfoBar from './InfoBar';

class App extends React.Component {
  state = {
    infoMessage: null,
    isLoading: true,
    myBooks: []
  };

  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState(state => ({
        isLoading: false,
        myBooks: books
      }));
    });
  }

  // The returned function has the same signature as `handleShelfChange` so
  // the two functions are compatible.
  addNewBookToMyBooks = book => (bookId, shelfSlug) => {
    this.setState(state => ({
      infoMessage: `Added book to ${shelfSlug}.`,
      myBooks: [
        ...state.myBooks,
        {
          ...book,
          shelf: shelfSlug
        }
      ]
    }));

    BooksAPI.update(bookId, shelfSlug);
  }

  clearInfoMessage = () => {
    this.setState(state => ({
      infoMessage: null
    }));
  }

  handleShelfChange = (bookId, shelfSlug) => {
    // optimistic update
    this.setState(state => ({
      infoMessage: `Moved book to ${shelfSlug}.`,
      myBooks: state.myBooks.map(book =>
        book.id === bookId
          ? { ...book, shelf: shelfSlug }
          : book)
    }));

    BooksAPI.update(bookId, shelfSlug);
  }

  render () {
    const { infoMessage, isLoading, myBooks } = this.state;

    return (
      <div className='app'>
        <Switch>
          <Route path='/' exact render={() =>
            <Main isLoading={isLoading} myBooks={myBooks} onShelfChange={this.handleShelfChange} />
          } />
          <Route path='/search' render={() =>
            <Search isLoading={isLoading} myBooks={myBooks} onAddNewBookToMyBooks={this.addNewBookToMyBooks} onShelfChange={this.handleShelfChange} />
          } />
        </Switch>
        { infoMessage &&
          <InfoBar clearInfoMessage={this.clearInfoMessage} message={infoMessage} /> }
      </div>
    );
  }
}

export default App;
