import React from 'react';
import Book from './Book';

export default class Shelf extends React.Component {
  render () {
    const { books, isLoading, onShelfChange, shelf } = this.props;
    return (
      <div className='bookshelf' key={shelf.slug}>
        <h2 className='bookshelf-title'>{shelf.title}</h2>
        <div className='bookshelf-books'>
          { isLoading
            ? <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <h3>Loading...</h3>
            </div>
            : books.length > 0
              ? <ol className='books-grid'>
                {books.map(book => <Book book={book} key={book.id} onShelfChange={onShelfChange} />)}
              </ol>
              : <i>There are currently no books on this shelf. You can move books to shelves via their dropdown menu.</i>
          }
        </div>
      </div>
    );
  }
}
