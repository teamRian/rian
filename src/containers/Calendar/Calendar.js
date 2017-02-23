import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { calendarRequest, calendarPost } from '../../actions/CalendarActions';

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
        <Table 
          Calendar={this.props.Calendar}
          calendarRequest={query=>this.props.calendarRequest.bind(this)(query)}
          calendarPost={form=>this.props.calendarPost.bind(this)(form)}
        />        
      </div>
    );
  }
}

function mapState(state) {
  return {
    Calendar: state.Calendar
  };
}

function mapDispatch(dispatch) {
  return {
    calendarRequest: (query)=> {
      console.log('request dispatch');
      dispatch(calendarRequest(query));
    },
    calendarPost: (form)=> {
      console.log('post dispatch: ', form);
      dispatch(calendarPost(form));
    }
  };
}

export default connect(mapState, mapDispatch)(Calendar);