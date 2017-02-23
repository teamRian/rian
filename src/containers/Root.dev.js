import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Rian from './Rian';
import DevTools from './DevTools';
import '../styles/Rian.css';
import NoteEditor from './NoteEditor/NoteEditorContainer.js'


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
          <NoteEditor />
          <DevTools />
        </div>
      </Provider>
    );
  }
}