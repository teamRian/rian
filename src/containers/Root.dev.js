import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Rian from './Rian';
import DevTools from './DevTools';
import '../styles/Rian.css';

export default class Root extends Component {
  // static propTypes = {
  //   store: PropTypes.object
  // };

  // <Rian />
  // <DevTools />

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Rian />
          <DevTools />
        </div>
      </Provider>
    );
  }
}