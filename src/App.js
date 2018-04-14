import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Main from './Main';
import Search from './Search';

class App extends React.Component {
  state = {
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
  // the two functions are interchangeable.
  addNewBookToMyBooks = book => (bookId, shelfSlug) => {
    this.setState(state => ({
      myBooks: [
        ...state.myBooks,
        {
          ...book,
          slug: shelfSlug
        }
      ]
    }));

    BooksAPI.update(bookId, shelfSlug);
  }

  handleShelfChange = (bookId, shelfSlug) => {
    // optimistic update
    this.setState(state => ({
      myBooks: state.myBooks.map(book =>
        book.id === bookId
          ? { ...book, shelf: shelfSlug }
          : book)
    }));

    BooksAPI.update(bookId, shelfSlug);
  }

  render () {
    const { isLoading, myBooks } = this.state;

    return (
      <div className='app'>
        { isLoading
          ? <h1>Loading your book shelf...</h1>
          : <Switch>
            <Route path='/' exact render={() => <Main myBooks={myBooks} onShelfChange={this.handleShelfChange} />} />
            <Route path='/search' render={() => <Search myBooks={myBooks} onAddBookToMyBooks={this.addNewBookToMyBooks} onShelfChange={this.handleShelfChange} />} />
          </Switch>
        }
      </div>
    );
  }
}

export default App;
