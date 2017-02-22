import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import d3 from 'd3';
import * as RianActions from '../actions';
import Table from '../../components/Calendar/Table';





class Calendar extends Component {
  static propTypes = {
    actions: PropTypes.object
  };

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
    console.log($("td[title='2017-2-3']").children(0).append("<br>HEY"))
  }

  render() {
    // const { todos, actions } = this.props;

    return (
      <div style={{ zIndex: 1000, position: 'relative' }}>
        

      </div>
    );
  }
}

// function mapState(state) {
//   return {
//     // todos: state.todos
//   };
// }

// function mapDispatch(dispatch) {
//   return {
//     actions: bindActionCreators(RianActions, dispatch)
//   };
// }

// export default connect(mapState, mapDispatch)(RianApp);

export default connect(mapState, mapDispatch)(Calendar);