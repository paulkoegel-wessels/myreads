import React from 'react';
import { Link } from 'react-router-dom';
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
    const { myBooks, onShelfChange } = this.props;

    return (
      <div className='list-books'>
        <div className='list-books-title'>
          <h1>MyReads</h1>
        </div>

        <div className='list-books-content'>
          <div>
            { SHELVES.map(shelf => {
              const booksForShelf = myBooks.filter(book => book.shelf === shelf.slug);
              return <Shelf books={booksForShelf} key={shelf.slug} onShelfChange={onShelfChange} shelf={shelf} />;
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
