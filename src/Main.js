import React from 'react';
import { navigateTo } from './helpers';
import searchIcon from './icons/search.svg';
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
  render () {
    const { books } = this.props;

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>

        <div className='list-books-content'>
          <div>
            { SHELVES.map(shelf => {
              const booksForShelf = books.filter(book => book.shelf === shelf.slug);

              return <Shelf key={shelf.slug} shelf={shelf} books={booksForShelf} />;
            })}
          </div>
        </div>

        <div className='open-search'>
          <a onClick={() => navigateTo('/search')}>
            <img alt='Search' src={searchIcon} />
          </a>
        </div>
      </div>
    );
  }
}
