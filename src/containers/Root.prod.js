import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Rian from './Rian';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <TodoApp />
      </Provider>
    );
  }
}