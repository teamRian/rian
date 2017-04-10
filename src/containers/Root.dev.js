import React, { Component, PropTypes } from "react";
import Rian from "./Rian";
import DevTools from "./DevTools";

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <div>
        <Rian />
        <DevTools />
      </div>
    );
  }
}
