import React, { Component, PropTypes } from 'react';
import Resizable from "react-resizable-box";
import FlexDraggable from "./FlexDraggable";


export default class FlexResizable extends Component {
  constructor(props){
    super(props);
    this.state={
      isDragging: false
    }
  }
  startDrag(){
    this.setState({
      isDragging: true
    })
  }
  endDrag(){
    this.setState({
      isDragging: false
    })
  }
  render(){
    const { plan } = this.props;
    const style = {
      position: 'absolute',
      top: `${plan.startingTime/72 * 100}%`,
      height: `${plan.durationLength/72*100}%`,
      backgroundColor: plan.color,
      opacity: this.state.isDragging ? 0.5 : 1
    }
    const extendProps = {forbidDrag: true}
  	return (
	      <Resizable
	        customClass="plan"
	        width={`100%`}
	        height={style.height}
	        minWidth={20}
	        minHeight={20}
	        maxWidth={1000}
	        maxHeight={1000}
	        customStyle={style}
	        grid={[25.4,25.4]}
	        isResizable={{ top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
	        onResizeStart={(direction,b,c,d,e)=>{
	          console.log(direction,b,c,d,e,"RESIZE START", this);
	        }}
	        onResizeStop={(a,b,c,d)=>this.props.onResizeStop(a,d,plan)}
          >
          <FlexDraggable 
           startDrag={()=>this.startDrag.bind(this)()}
           endDrag={()=>this.endDrag.bind(this)()}
          />
        </Resizable>
  	)
  }
}

// const flexResizableSource = {
//   canDrag(props, monitor,c){
//     console.log(props,monitor,c," CAN DRAG? ")
//   },
//   beginDrag(props) {
//     return {
//     };	
//   },
//   endDrag(props, monitor, component) {
//   }
// };

// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }

// // Export the wrapped component: