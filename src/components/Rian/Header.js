import React, { Component } from 'react';

import logo from '../../logo.svg';

export default class Header extends Component {
  // static propTypes = {
  //   addTodo: PropTypes.func.isRequired
  // };

  render() {
    return (
      <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Rian</h2>
      </div>
    );
  }
}