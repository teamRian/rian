import React from 'react';

class TodoLog extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let date = Object.keys(this.props.log)[0];
        let message = this.props.log[date];

        const fontRe = {
            fontSize: "10px"
        }

        return (
            <div style={fontRe}>
                <span>{message}</span>
                <span>{date}</span>
            </div>
        )
    }
}

export default TodoLog;