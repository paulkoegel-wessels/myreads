import React from 'react';
import { Link } from 'react-router-dom';
import searchIcon from './icons/search.svg';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';

const SHELVES = [
  {
    slug: 'currentlyReading',
    title: 'Currently Reading'
  },
  {
    slug: 'wantToRead',
    title: 'Want to read'
  },
  {
    slug: 'read',
    title: 'Read'
  }
];

export default class Main extends React.Component {
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

  handleShelfChange = (bookId, shelfSlug) => {
    // optimistic update
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
  render () {
    const { books, isLoading } = this.state;

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>

        <div className='list-books-content'>
          <div>
            { SHELVES.map(shelf => {
              const booksForShelf = books.filter(book => book.shelf === shelf.slug);

              return <Shelf books={booksForShelf} isLoading={isLoading} key={shelf.slug} onShelfChange={this.handleShelfChange} shelf={shelf} />;
            })}
          </div>
        </div>

        <div className='open-search'>
          <Link to='/search'>
            <img alt='Search' src={searchIcon} />
          </Link>
        </div>
      </div>
    );
  }
}
