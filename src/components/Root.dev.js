import React, { Component, PropTypes } from "react";
import App from "./App";
import DevTools from "./DevTools";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <App />
        <DevTools />
      </div>
    );
  }
}
