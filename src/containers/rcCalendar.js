import 'rc-calendar/assets/index.css'
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as RianActions from '../actions';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
console.log('fullcalendar: ', FullCalendar)
import '../styles/Rian.css';
import 'rc-select/assets/index.css';
import Select from 'rc-select';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';

import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function onSelect(value) {
  console.log('select', value.format(format));
}

class RianCalendar extends Component {
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
        <FullCalendar
          style={{ margin: 10 }}
          Select={Select}
          fullscreen
          onSelect={onSelect}
          defaultValue={now}
          locale={cn ? zhCN : enUS}
          
        />

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

export default RianCalendar;