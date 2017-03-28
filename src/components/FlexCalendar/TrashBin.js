// import React, { Component, PropTypes } from 'react';
// import { DragSource } from 'react-dnd';
// import ItemTypes from '../../constants/ItemTypes';

// class FlexDraggable extends Component {
//   constructor(props){
//     super(props);
//   }

//   render() {
//   	const { connectDragSource, isDragging } = this.props;
//     return connectDragSource(
//       <div className="draggable" >
//       </div>
//     );
//   }
// }


// const flexResizableSource = {
//   beginDrag(props) {
//   	props.startDrag();
//   	return {};
//   },
//   endDrag(props, monitor, component) {
//   	props.endDrag();
//   }
// };

// function collect(connect, monitor) {
//   return {
//     connectDragSource: connect.dragSource(),
//     isDragging: monitor.isDragging()
//   };
// }


// export default DragSource(ItemTypes.FLEX_BRICK, flexResizableSource, collect)(FlexDraggable);


// import React, { Component, PropTypes } from 'react';
// import Resizable from "react-resizable-box";
// import FlexDraggable from "./FlexDraggable";


// export default class FlexResizable extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       isDragging: false
//     }
//   }
//   startDrag(){
//     this.setState({
//       isDragging: true
//     })
//   }
//   endDrag(){
//     this.setState({
//       isDragging: false
//     })
//   }
//   render(){
//     const { plan } = this.props;
//     const style = {
//       position: 'absolute',
//       top: `${plan.startingTime/72 * 100}%`,
//       height: `${plan.durationLength/72*100}%`,
//       backgroundColor: plan.color,
//       opacity: this.state.isDragging ? 0.5 : 1,
//       pointerEvents: this.state.isDragging ? 'none' : 'visible',
//     }
//     const extendProps = {forbidDrag: true}
//   	return (
// 	      <Resizable
// 	        customClass="plan"
// 	        width={`100%`}
// 	        height={style.height}
// 	        minWidth={20}
// 	        minHeight={20}
// 	        maxWidth={1000}
// 	        maxHeight={1000}
// 	        customStyle={style}
// 	        grid={[25.4,25.4]}
// 	        isResizable={{ top:true, right:false, bottom:true, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
// 	        onResizeStart={(direction,b,c,d,e)=>{
// 	          console.log(direction,b,c,d,e,"RESIZE START", this);
// 	        }}
// 	        onResizeStop={(a,b,c,d)=>this.props.onResizeStop(a,d,plan)}
//           >
//           <FlexDraggable 
//            startDrag={()=>this.startDrag.bind(this)()}
//            endDrag={()=>this.endDrag.bind(this)()}
//           />
//         </Resizable>
//   	)
//   }
// }

// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import ItemTypes from '../../constants/ItemTypes';
// import { DropTarget } from 'react-dnd';
// import '../../styles/FlexCalendar.css';
// // import from './Utils/FlexDnD';

// const smallBrickTarget = {
//   // canDrop(props, monitor){
    
//   //   // return props.handleCanDrop(props.timeIndex, props.dayIndex, monitor.getItem().durationLength);
//   // },
//   drop(props, monitor, component) {
//     console.log("Hi, I'm Brick, my timeIndex is ", props.timeIndex, " and my DayIndex is ", props.dayIndex, " if you want details open this ", monitor.getItem())
//     const droppedType = monitor.getItemType();
//     const droppedItem = monitor.getItem();
//     if(droppedType === "COLOR_BRICK"){
//       const form = {
//         timeIndex : props.timeIndex,
//         dayIndex : props.dayIndex,
//         durationLength : droppedItem.durationLength,
//         color: droppedItem.color,
//         type: 'once'
//       };
//       props.handleOnDrop(form);
//     } else if ( droppedType === "FLEX_BRICK"){
//       console.log(props, "FLEXBRICK DROPPED")
//     }
    
//   }
// };

// function collect(connect, monitor) {
//   return {
//     // Call this function inside render()
//     // to let React DnD handle the drag events:
//     connectDropTarget: connect.dropTarget(),
//     // You can ask the monitor about the current drag state:
//     isOver: monitor.isOver(),
//     isOverCurrent: monitor.isOver({ shallow: true }),
//     canDrop: monitor.canDrop(),
//     itemType: monitor.getItemType()
//   };
// }


// class FlexSmallBrick extends Component {
//   constructor(props){
//     super(props);
//   }
//   render() {
//     const { hideSourceOnDrag, isOver, isOverCurrent, canDrop, itemType, connectDropTarget } = this.props;
//     const isActive = isOver && canDrop;
//     const style = {};
//     let backgroundColor = null;
//     if (isActive) {
//       style['backgroundColor'] = 'darkgreen'
//       // style['zIndex'] = 100;
//     } else if (canDrop) {
//       style['backgroundColor'] ='darkkhaki';
//       // style['zIndex']= 100;
//     }
//     return connectDropTarget( 
//       <div className='smallBricks' style={style}>
      
//       </div>
//     );
//   }
// }

// export default DropTarget( [ItemTypes.COLOR_BRICK, ItemTypes.FLEX_BRICK], smallBrickTarget, collect)(FlexSmallBrick);


