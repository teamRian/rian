import React, { Component } from 'react';
import Firepad from 'firepad';
import firebase from 'firebase';
import { setFirepad } from './util/setFirepad.js'
import './css/RockofRianStyle.css';
import './css/firepad.css';
import moment from 'moment'




class RockofRianEditor extends Component {

	constructor(props) {
		super(props);
		
	}
		
	
	componentDidMount() {

		this.firePadrender.bind(this)()
	}

	componentWillReceiveProps(nextProps) {
		
		this.firePadrender.bind(this)()
	}



	firePadrender(){

        var that = this
        if ( !that.props.nowRenderedNote ) { 
 
    
          var firepadCount = firebase.database().ref('users/' + that.props.user + '/notes/count')

          firepadCount.once('value').then(function(snapshot){
          	var newCount = snapshot.val() + 1
          	var firepadCount = firebase.database().ref('users/' + that.props.user + '/notes/count')
          		.set(newCount).then(function(){

		          	var NowMoment = moment().format('MMMM Do YYYY h:mm:ss a')
		          	var addnewTimeline = {
		          		create_at: NowMoment,
		          		finalmodified_at: NowMoment,
		          		id: newCount
		          	}

		          	var firepadRefTimeline = firebase.database().ref('users/' + that.props.user + '/timeline/' + newCount)
		          	firepadRefTimeline.set(addnewTimeline).then(function(){
		  
		          	  	setFirepad.bind(that)(newCount, that.props.user)
		          	})

          		})
          
         
          })

        } else {
        	console.log("Change note")
          setFirepad.bind(that)(that.props.nowRenderedNote, that.props.user)
        }
        


	}

	render(){

		return (
			<div ref='firepadContainer' id='firepad-container'>
			</div>
		)

	}

}

export default RockofRianEditor




