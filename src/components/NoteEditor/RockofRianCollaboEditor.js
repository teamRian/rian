import React, { Component } from 'react';
import Firepad from 'firepad';
import firebase from 'firebase';
import { makeNewNote } from './util/makeNewNote'
import { LoadNote } from './util/LoadNote'
//import './css/RockofRianStyle.css';
//import './css/firepad.css';

class RockofRianEditor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			renderCheck: true
		}
		this.firepad
		this.codeMirror 
		this.firePadrender = this.firePadrender.bind(this)
	}	
		
	
	componentDidMount() {
		this.firePadrender()
	}

	componentWillUnmount() {
		console.log("Got rid of firepad")

		if (this.firepad) {
			this.firepad.dispose()
			console.log("Dispose firepad")
		}
		
	}

	shouldComponentUpdate(nextProps){
		if (this.props.notelocation !== nextProps.notelocation) {
			//이전 파이어패드 종
			this.firepad.dispose()
			//코드미러 초기화
			this.codeMirror.setValue("");
			this.codeMirror.clearHistory()
			this.codeMirror.toTextArea()	
			console.log("Change Render Note")
			return true
		} else {
			console.log("Did not change Render Note")
			return false
		}
	}

	componentDidUpdate(prevProps, prevState) {
	   //Component 업데이트 후 파이어패드 재설정	
	   this.firePadrender()
	}

	

	firePadrender(){
		
		const { user, notelocation, indexlocation, inforlocation } = this.props
        const userAddress = 'notes/' + user

        if ( !this.props.notelocation ) {     	
    	   makeNewNote(user, userAddress, firebase, Firepad)
        } else {
           LoadNote(userAddress, Firepad, notelocation, indexlocation, inforlocation)	
        }
   
	}

	renderContainer(){
		return (
				<textarea ref='firepadContainer' id='firepad-container'>
				</textarea>
		)
	}
	
	render(){
		return (
			this.renderContainer()
		)
	}

}

export default RockofRianEditor




