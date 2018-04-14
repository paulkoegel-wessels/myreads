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

  constructor (props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount () {
    // auto-focus search field
    this.inputRef.current.focus();
  }

  handleSearchTermChange = event => {
    const searchTerm = event.target.value;
    this.setState(state => ({
      isSearching: false,
      searchTerm
    }));
    this.searchBooks(searchTerm);
  }

  enrichResponseWithMyBooksData = responseBooks => {
    return responseBooks.map(book => {
      const myBook = this.props.myBooks.find(myBook => myBook.id === book.id);
      const shelf = myBook ? myBook.shelf : 'none';
      return {
        ...book,
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
          searchResults: this.enrichResponseWithMyBooksData(response)
        }));
      } else {
        this.setState(state => ({
          error: (response && response.error) || 'Response is undefined',
          isSearching: false
        }));
      }
    });
  }, 300);

  render () {
    const { error, isSearching, searchResults, searchTerm } = this.state;
    const { onAddBookToMyBooks, onShelfChange } = this.props;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link className='close-search' to='/'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              onChange={this.handleSearchTermChange}
              placeholder='Search by title or author'
              ref={this.inputRef}
              type='text'
              value={searchTerm} />
          </div>
        </div>
        <div className='search-books-results'>
          { isSearching
            ? <h3 style={{ margin: '0 auto' }}>Searching...</h3>
            : error
              ? `No results. (Error message from server: ${error})`
              : <ol className='books-grid'>
                { searchResults.map(book =>
                  <Book book={book} key={book.id} onShelfChange={book.shelf !== 'none' ? onShelfChange : onAddBookToMyBooks(book)} />
                )}
              </ol>
          }
        </div>
      </div>
    );
  }
}
