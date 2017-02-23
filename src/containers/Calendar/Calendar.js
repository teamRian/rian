import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calendarRequest } from '../../actions/CalendarActions';

import d3 from 'd3';
import {} from '../../actions';
import Table from '../../components/Calendar/Table';
import '../../styles/Calendar.css';

class Calendar extends Component {
  constructor(props){
    super(props)
    console.log('props: ',this.props);
  }
  // onTypeChange(type) {
  //   this.setState({
  //     type,
  //   });
  // }

  componentDidMount(){
  }

  render() {
    // const { todos, actions } = this.props;

    return (
      <div id="calendar-container" style={{ zIndex: 1000, position: 'relative' }}>
        <Table data={this.props.data} status={this.props.status} type={this.props.type} getPlan={(query)=>this.props.getPlan.bind(this)(query)}/>        
      </div>
    );
  }
}

function mapState(state) {
  return {
    // todos: state.todos
    data: state.Calendar.data,
    status: state.Calendar.status,
    type: state.Calendar.type
  };
}

function mapDispatch(dispatch) {
  return {
    getPlan: (query)=> {
      console.log('inside map dispatch');
      dispatch(calendarRequest(query)
    )}
  };
}

export default connect(mapState, mapDispatch)(Calendar);