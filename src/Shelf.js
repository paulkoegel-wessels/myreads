import React from 'react';
import Book from './Book';

export default class Shelf extends React.Component {
  render () {
    const { books, shelf } = this.props;
    return (
      <div className='bookshelf' key={shelf.slug}>
        <h2 className='bookshelf-title'>{shelf.title}</h2>
        <div className='bookshelf-books'>
          <ol className='books-grid'>
            {books.map(book => <Book book={book} />)}
          </ol>
        </div>
      </div>
    );
  }
}
