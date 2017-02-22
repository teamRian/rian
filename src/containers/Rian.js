import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Rian/Header';
import App from '../components/Rian/App';
import Calendar from './Calendar/Calendar.js';
import * as RianActions from '../actions';

//import '../styles/Rian.css';


class RianApp extends Component {
  // static propTypes = {
  //   actions: PropTypes.object
  // };

  render() {
    // const { todos, actions } = this.props;

    return (
      <div className="App">
        <Header/>
        <Calendar/>
        <App/>
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