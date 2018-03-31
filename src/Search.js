import React from 'react';
import { navigateTo } from './helpers';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import debounce from 'lodash.debounce';

export default class Search extends React.Component {
  state = {
    books: [],
    error: null,
    isLoading: false,
    searchTerm: ''
  };

  handleSearchTermChange = event => {
    const searchTerm = event.target.value;
    this.setState(state => ({
      ...state,
      isLoading: true,
      searchTerm
    }));
    this.searchBooks(searchTerm);
  }

  handleShelfChange = (bookId, shelfSlug) => {
    this.setState(state => {
      return {
        ...state,
        books: state.books.map(book =>
          book.id === bookId
            ? { ...book, shelf: shelfSlug }
            : book)
      };
    });

    BooksAPI.update(bookId, shelfSlug);
  }

  // NOTES: The search from BooksAPI is limited to a particular set of search terms.
  // You can find these search terms here:
  // https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
  searchBooks = debounce((searchTerm) => {
    // JFYI: searchTerm will be '' when user deletes input text -> 403 -> error message
    BooksAPI.search(searchTerm).then(response => {
      if (response && !response.error) {
        this.setState(state => ({
          ...state,
          books: response,
          error: null,
          isLoading: false
        }));
      } else {
        this.setState(state => ({
          ...state,
          error: (response && response.error) || 'Response is undefined',
          isLoading: false
        }));
      }
    });
  }, 300);

  render () {
    const { books, error, isLoading, searchTerm } = this.state;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <a className='close-search' onClick={() => navigateTo('/')}>Close</a>
          <div className='search-books-input-wrapper'>
            <input
              onChange={this.handleSearchTermChange}
              placeholder='Search by title or author'
              type='text'
              value={searchTerm} />
          </div>
        </div>
        <div className='search-books-results'>
          { isLoading
            ? 'Loading...'
            : error
              ? `No results. (Error message from server: ${error})`
              : <ol className='books-grid'>
                { books.map(book =>
                  <Book book={book} key={book.id} onShelfChange={this.handleShelfChange} />
                )}
              </ol>
          }
        </div>
      </div>
    );
  }
}
