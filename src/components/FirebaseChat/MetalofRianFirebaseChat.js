import React, { Component, PropTypes } from 'react';
import Infinite from 'react-infinite';

class MetalofRianFirebaseChat extends Component {

	constructor(props) {
		super(props);

		this.state = {
			value: "",
			focus: true,
			message: [],
			isInfiniteLoading: false,
			nowTimestamp: null,
			pastTimestamp: null
		}
		this.startcount = 0
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.renderMessage = this.renderMessage.bind(this)
		this.loadPage = this.loadPage.bind(this)
		this.loadPastPage = this.loadPastPage.bind(this)
		this.changeFocusOn = this.changeFocusOn.bind(this)
		this.changeFocusOff = this.changeFocusOff.bind(this)

		
		this.firebaseRef = firebase.database().ref('chat/' + this.props.chatRoomId + '/message')
	}



	componentDidMount() {
		//child added는 한번 바뀔때마다 한번씩 콜되는 걸까?
		this.firebaseRef.orderByChild('timestamp').endAt("0").limitToLast(10).on('child_added', (data)=>{
		 		var temp = data.val()
		 		
		 		var style = {}
		 		if (temp.userid === this.props.userid) {
		 			style = { color: "blue" }
		 		} else {
		 			style = { color: "black" }
		 		}
		 		var renderOne = <div key={temp.timestamp} style={style}>{"Name: " + temp.userid} {temp.content}</div>
		 		
		 		//만약에 내 커서가 포커스 되있으면 읽은 걸로 갱신
		 		console.log("time", temp.timestamp)
		 		if (this.state.focus && temp.userid !== this.props.userid) {
		 			var updateReadpoint = {}
		 			updateReadpoint[this.props.userid] = temp.timestamp
		 			firebase.database().ref('chat/' + this.props.chatRoomId + '/readpoint/').update(updateReadpoint)
		 		}
		 		
		 		this.setState((prevState, props)=>({
		 			message: [...prevState.message, renderOne],
		 			nowTimestamp: temp.timestamp,
		 			pastTimestamp: !prevState.pastTimestamp ? temp.timestamp : prevState.pastTimestamp
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
		// this.firebaseRef.push({
		// 	content: this.state.value,
		// 	userid: this.props.userid,
		// 	timestamp: firebase.database.ServerValue.TIMESTAMP
		// })
		// this.setState((prevState, props)=>(
		// 	{
		// 		value: ""
		// 	}
		// ))
		var postkey = firebase.database().ref().child('chat/' + this.props.chatRoomId + '/message').push().key
		var updates = {}
		var offsetRef = firebase.database().ref(".info/serverTimeOffset");
		var timestamp
		offsetRef.on("value", function(snap) {
		  var offset = snap.val();
		  timestamp = new Date().getTime() + offset;
		  
		});

		updates['/chat/' + this.props.chatRoomId + '/message/' + postkey] = {
			content: this.state.value,
			userid: this.props.userid,
			timestamp: timestamp
		}
		updates['/chat/' + this.props.chatRoomId + '/readpoint/' + this.props.userid] = { timestamp: timestamp }
		updates['/chat/' + this.props.chatRoomId + '/finalTimestamp/'] = { timestamp: timestamp }

		//메시지와 어디까지 읽었는지를 갱신한다.
		firebase.database().ref().update(updates)
		
		
		this.setState((prevState, props)=>(
			{
				value: ""
			}
		))
	}

	renderMessage(){

	}

	loadPage(){
		this.setState((prevState, props)=>({
            isInfiniteLoading: true
        }));
		// console.log("Load PAGE")
		this.setState((prevState, props)=>({
            isInfiniteLoading: false
        }));
	}

	loadPastPage(){
		// console.log('Load Past Page')
		var that = this
		this.setState({
			isInfiniteLoading: true 
		})
		this.firebaseRef.orderByChild('timestamp').endAt(that.state.pastTimestamp).limitToLast(10).once('value', (data)=>{
		 		var temp = data.val()
		 		var renderSet = []
		 		for (var key in temp) {
		 			renderSet.push(temp[key])
		 		}

		 		renderSet.sort(function(a, b){
		 			if (a.timestamp > b.timestamp) {
		 				return 1
		 			} 
		 			if (a.timestamp < b.timestamp) {
		 				return -1
		 			}
		 			return 1
		 		})

		 		renderSet.pop()
		 		var newPasttTimestamp = renderSet[0].timestamp

		 		renderSet = renderSet.map((a, index)=>{
		 			var style = {}
			 		if (a.userid === that.props.userid) {
			 			style = { color: "blue", overflow: "scroll" }
			 		} else {	
			 			style = { color: "black", overflow: "scroll" }
			 		}
			 		var renderOne = <div key={a.timestamp} style={style}>{"Name: " + a.userid} {a.content}</div>
		 			return renderOne
		 		})

		 		setTimeout(()=>{this.setState((prevState, props)=>({
			 			message: [...renderSet, ...prevState.message],
			 			pastTimestamp: newPasttTimestamp,
			 			isInfiniteLoading: false
			 		}))
		 		}, 2000)
		})
	}


	changeFocusOn(){
		this.setState((prevState, props)=>{
			focus: true
		})
	}

	changeFocusOff(){
		this.setState((prevState, props)=>{
			focus: false
		})
	}



	render(){

		return (
			<div>
			 <form onSubmit={this.handleSubmit}>
       		    <Infinite 
       				containerHeight={100} 
        			elementHeight={10} 
 							infiniteLoadBeginEdgeOffset={10}
        			onInfiniteLoad={this.loadPastPage}
        			isInfiniteLoading={this.state.isInfiniteLoading}
        			displayBottomUpwards     			
        			>
       		  		{this.state.message}
       		  	</Infinite>
          		<input type='text' value={this.state.value} onFocus={(e)=>this.changeFocusOn(e)} onBlur={(e)=>this.changeFocusOff(e)} onChange={(e)=>this.handleChange(e)} />
       	 	  <input type="submit" value="Submit" />
      		</form>
			</div>
		)
	}
}

export default MetalofRianFirebaseChat