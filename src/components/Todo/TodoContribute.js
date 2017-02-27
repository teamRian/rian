import React from 'react'
import { ProgressBar } from 'react-bootstrap';

class TodoContribute extends React.Component {
  constructor(props) {
      super(props)
  }

  render() {
    const key = Object.keys(this.props.list)[0];
    const value = Math.round(this.props.list[key] / this.props.total * 100);

    return (
        <div>
          <p>{key}</p>
          <ProgressBar bsStyle="warning" now={value} label={`${value}%`}/>
        </div>
    )
  }
}

export default TodoContribute;