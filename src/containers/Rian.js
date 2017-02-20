import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import App from '../components/App';
import * as RianActions from '../actions';

import '../styles/App.css';


class RianApp extends Component {
  // static propTypes = {
  //   todos: PropTypes.array,
  //   actions: PropTypes.object
  // };

  render() {
    // const { todos, actions } = this.props;

    return (
      <div className="App">
        <Header />
        <App />
      </div>
    );
  }
}

function mapState(state) {
  return {
    // todos: state.todos
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(RianActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(RianApp);