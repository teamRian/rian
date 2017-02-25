import React from 'react';
import { Link } from 'react-router';

class Navigation extends React.Component {

    render() {
        const contain = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "white",
            borderBottom: "1px solid rgba(236,236,236,1)",
            height: "3em",
            fontSize: "14px"
        }

        const homeColor = {
            color: "rgba(184,184,184,1)"
        }

        const chatColor = {
            color: "rgba(117,192,253,1)"
        }

        const calColor = {
            color: "rgba(115,202,116,1)"
        }

        const tpColor = {
            color: "rgba(153,165,166,1)"
        }

        return (
            <div>
                <div style={contain}><span style={homeColor}><Link to='/'>홈</Link></span></div>
                <div style={contain}><span style={chatColor}><Link to='/calendar'>캘린더</Link></span></div>
                <div style={contain}><span style={chatColor}><Link to='/todolist'>투두</Link></span></div>
                <div style={contain}><span style={calColor}><Link to='/editor'>에디터</Link></span></div>
                <div style={contain}><span style={tpColor}><Link to='/chat'>채팅</Link></span></div>
            </div>
        )
    }
}

export default Navigation;