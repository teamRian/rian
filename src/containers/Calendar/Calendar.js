import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';
import * as RianActions from '../../actions';
import Table from '../../components/Calendar/Table';
import '../../styles/Calendar.css';
class Calendar extends Component {
  constructor(props){
    super(props)
    this.state = {
      type: 'month'
    }
  }
  onTypeChange(type) {
    this.setState({
      type,
    });
  }

  componentDidMount(){
  }

  render() {
    // const { todos, actions } = this.props;

    return (
      <div id="calendar-container" style={{ zIndex: 1000, position: 'relative' }}>
        <Table time/>        
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

export default connect(mapState, mapDispatch)(Calendar);