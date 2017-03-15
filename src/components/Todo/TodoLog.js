import React from 'react';
import './TodoLog.css'

class TodoLog extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let logData = this.props.log;
        let date = Object.keys(logData)[0];

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

const timeLineCircle = (
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="40px" height="40px">
    <circle style={{fill:"#FFC61B"}} cx="80" cy="80" r="80"/>
  </svg>
);

export default TodoLog;
