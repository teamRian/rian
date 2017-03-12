import React, { Component } from 'react';
import LazyLoad from 'react-lazyload';


class TemplineBox extends Component {
	
	constructor(props) {
		super(props);
		
	}


	componentWillReceiveProps(nextProps) {
		console.log('NextProps', nextProps)
	}



	render(){
		return (
		 <div>
		  <LazyLoad height={200} overflow={true} unmountIfInvisible={true}>
			<div className="timelinebox" style={{height: "150px"}} >
				  <div className="timelineTitle">
				  	{this.props.timeline.create_at}
				  	{this.props.timelinekey}
	 			  </div>						 	
			 	  <div>
			 	    {this.props.timeline.final_modified}
				  </div>
			</div>
		  </LazyLoad>
		 </div>
		)
	}
	
}




export default TemplineBox