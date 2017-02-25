import React, { Component } from 'react';

import ChatApp from '../../containers/Chat/ChatApp';


class App extends Component {
  render() {
    return (
      <div>
        <p className="App-intro">
        	Calendar | TodoList | Chatbox | Whiteboard        	
        </p>

        <ChatApp/>

      </div>
    );
  }
}

export default App;
