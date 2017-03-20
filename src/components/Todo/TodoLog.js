import React from 'react';
import './TodoLog.css';

class TodoLog extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let logData = this.props.log;
        let date    = Object.keys(logData)[0];

        if(this.props.index%2 === 0) {
            return (
                <tr className="fontRe">
                    <td className="tdWidthLeft">
                        <div>
                            <div className="tdWidthLeftBox">
                                <p className="tdWidthAuthoText">{logData[date].author}</p>
                                <p>{logData[date].message}</p>
                                <p className="tdWidthDateText">{date}</p>
                            </div>
                        </div>
                    </td>
                    <td className="tdWidth"></td>
                </tr>
            )
        } else {
            return (
                <tr className="fontRe">
                    <td className="tdWidth"></td>                
                    <td className="tdWidthRight">
                        <div>
                            <div className="tdWidthRightBox">
                                <p className="tdWidthAuthoText">{logData[date].author}</p>
                                <p>{logData[date].message}</p>
                                <p className="tdWidthDateText">{date}</p>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }
    }
}

export default TodoLog;
