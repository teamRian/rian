import React, { Component } from 'react';
import QRCode from 'qrcode.react'

class QrofRian extends Component {
	constructor(props) {
		super(props);
		this.state = {
			inputvalue: ""
		}
		this.changeinput = this.changeinput.bind(this)
	}
	
	changeinput(value){
		this.setState({
			inputvalue: value
		})
	}


	render(){
		return (
		  <div>
			<input type="text" ref="writeqr" onChange={(e)=>this.changeinput(e.target.value)}/>
			<br/>
			<QRCode value={this.state.inputvalue} />
		  </div>
		 )		


	}


}



export default QrofRian