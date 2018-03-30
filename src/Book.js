import React from 'react';

export default class Book extends React.Component {
  render () {
    const { book, onShelfChange } = this.props;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail})` }} />
            <div className='book-shelf-changer'>
              <select onChange={event => onShelfChange(book.id, event.target.value)} value={book.shelf}>
                <option value='none' disabled>Move to...</option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>{book.authors.join(', ')}</div>
        </div>
      </li>
    );
  }
}
