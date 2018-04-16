import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import debounce from 'lodash.debounce';

export default class Search extends React.Component {
  state = {
    error: null,
    isSearching: false,
    searchResults: [],
    searchTerm: ''
  };

  handleSearchTermChange = event => {
    const searchTerm = event.target.value;
    this.setState(state => ({
      isSearching: false,
      searchTerm
    }));
    this.searchBooks(searchTerm);
  }

  mergeBooksData = (myBooks, searchResults) => {
    return searchResults.map(resultBook => {
      const myBook = this.props.myBooks.find(myBook => myBook.id === resultBook.id);
      const shelf = myBook ? myBook.shelf : 'none';
      return {
        ...resultBook,
        shelf
      };
    });
  }

  // NOTES: The search from BooksAPI is limited to a particular set of search terms.
  // You can find these search terms here:
  // https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  searchBooks = debounce((searchTerm) => {
    this.setState(state => ({ isSearching: true }));
    // JFYI: searchTerm will be '' when user deletes input text -> 403 -> error message
    BooksAPI.search(searchTerm).then(response => {
      if (response && !response.error) {
        this.setState(state => ({
          error: null,
          isSearching: false,
          searchResults: response
        }));
      } else {
        this.setState(state => ({
          error: (response && response.error) || 'Response is undefined',
          isSearching: false
        }));
      }
    });
  }, 500);

  render () {
    const { error, isSearching, searchResults, searchTerm } = this.state;
    const { isLoading, myBooks, onAddNewBookToMyBooks, onShelfChange } = this.props;
    const books = this.mergeBooksData(myBooks, searchResults);

    return (
      isLoading
        ? <h3 style={{ textAlign: 'center' }}>Loading shelf data...</h3>
        : <div className='search-books'>
          <div className='search-books-bar'>
            <Link className='close-search' to='/'>Close</Link>
            <div className='search-books-input-wrapper'>
              <input
                onChange={this.handleSearchTermChange}
                placeholder='Search by title or author'
                autoFocus
                type='text'
                value={searchTerm} />
            </div>
          </div>
          <div className='search-books-results'>
            { isSearching
              ? <h3 style={{ textAlign: 'center' }}>Searching...</h3>
              : error
                ? <div style={{ textAlign: 'center' }}>
                    No results.
                  <p>(Message from server: {error})</p>
                </div>
                : <ol className='books-grid'>
                  { books.map(book =>
                    <Book book={book} key={book.id} onShelfChange={book.shelf !== 'none' ? onShelfChange : onAddNewBookToMyBooks(book)} />
                  )}
                </ol>
            }
          </div>
        </div>
    );
  }
}
