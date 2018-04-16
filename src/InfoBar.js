import './InfoBar.css';
import React from 'react';

window.daids = [];

export default class InfoBar extends React.Component {
  timeoutIds = [];

  componentDidMount () {
    const timeoutId = window.setTimeout(() => {
      this.props.clearInfoMessage();
    }, 2000);
    this.timeoutIds.push(timeoutId);
    window.daids.push(timeoutId);
  }

  componentWillUnmount () {
    this.timeoutIds.forEach(timeoutId => window.clearTimeout(timeoutId));
  }

  render () {
    const { message } = this.props;

    return (
      <div className='InfoBar'>
        { message }
      </div>
    );
  }
}
