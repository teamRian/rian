import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Rian/Header';
import App from '../components/Rian/App';
import Calendar from './Calendar/Calendar.js';
import TodoContainer from './Todo/TodoContainer.js';
import * as RianActions from '../actions';
import {Grid, Col, Row} from 'react-bootstrap';
import Navigation from '../components/Navigation/Navigation.js'

//import '../styles/Rian.css';

class RianApp extends Component {
  // static propTypes = {
  //   actions: PropTypes.object
  // };

  render() {
    const marginZero = {
      margin: "0px 0px",
      padding: "0px 0px"
    }

    const fullheight = {
      height: "100vh"
    }

    const navColor = {
      backgroundColor: "rgba(245,245,245,1)",
      height: "100vh",
      borderRight: "1px solid rgba(210,210,210,1)",
      padding: "0px 0px"
    }
    // let App = 
    return (
      <div className="App">
        <div style={marginZero}>
          <div className="row" style={marginZero}>             
              <Header />
          </div>
          <div className="row" style={marginZero}>
            <div className="col-xs-1" style={navColor}>
              <Navigation />
            </div>
            <div className="col-xs-11">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
  };
}

function mapDispatch(dispatch) {
  return {
  };
}

export default connect(mapState, mapDispatch)(RianApp);

// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import Header from '../components/Rian/Header';
// import App from '../components/Rian/App';
// import Calendar from './Calendar/Calendar.js';
// import TodoContainer from './Todo/TodoContainer.js';
// import * as RianActions from '../actions';

// //import '../styles/Rian.css';


// class RianApp extends Component {
//   // static propTypes = {
//   //   actions: PropTypes.object
//   // };

//   render() {
//     // const { todos, actions } = this.props;

//     return (
//       <div className="App">
//         <Header/>
//         <Calendar/>
//         <TodoContainer/>
//         <App/>
//       </div>
//     );
//   }
// }

// function mapState(state) {
//   return {
//     // todos: state.todos
//   };
// }

// function mapDispatch(dispatch) {
//   return {
//   };
// }

// export default connect(mapState, mapDispatch)(RianApp);