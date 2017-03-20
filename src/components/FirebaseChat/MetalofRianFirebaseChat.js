import React, { Component, PropTypes } from 'react';
import Infinite from 'react-infinite';

class MetalofRianFirebaseChat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: "",
			message: [],
		}
		
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.renderMessage = this.renderMessage.bind(this)


		this.firebaseRef = firebase.database().ref('chat/' + this.props.chatRoomId + '/message')
		this.firebaseOffsetTime = ""

	


	
		




	}
		

	componentDidMount() {
		//child added는 한번 바뀔때마다 한번씩 콜되는 걸까?
		this.firebaseRef.orderByChild('timestamp').endAt("0").limitToLast(5).on('child_added', (data)=>{
				
		 		var temp = data.val()
		 		console.log('temp', temp)

		 		var renderOne = <div key={temp.timestamp}>{"Name: " + temp.userid} {temp.content}</div>
		 		this.setState((prevState, props)=>({
		 			message: prevState.message.concat(renderOne)
		 		}))


		 		
		})
		
	}


	handleSubmit(e){
		e.preventDefault();
		console.log('만약에 그게 사실이라면 그것은 정말 큰 문제일 것이다.')
		this.sendMessage()
	}

	handleChange(e){
		var temp = e.target.value
		this.setState((prevState, props)=>(
			{
				value: temp
			}
		))
	}





	sendMessage(newMessage){
		this.firebaseRef.push({
			content: this.state.value,
			userid: this.props.userid,
			timestamp: firebase.database.ServerValue.TIMESTAMP
		})
		this.setState((prevState, props)=>(
			{
				value: ""
			}
		))
	}

	renderMessage(){

	}




	render(){

		return (
			<div>
			 <form onSubmit={this.handleSubmit}>
       		  <div>
       		  	{this.state.message}
       		  </div>
          		<textarea value={this.state.value} onChange={(e)=>this.handleChange(e)} />
       	 	  <input type="submit" value="Submit" />
      		</form>
			</div>
		)
	}
}

export default MetalofRianFirebaseChat