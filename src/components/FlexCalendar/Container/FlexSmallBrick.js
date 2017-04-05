import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ItemTypes from '../../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

const smallBrickTarget = {
  // canDrop(props, monitor){
    
  //   // return props.handleCanDrop(props.timeIndex, props.dayIndex, monitor.getItem().durationLength);
  // },
  drop(props, monitor, component) {
    console.log("Hi, I'm Brick, my timeIndex is ", props.timeIndex, " and my DayIndex is ", props.dayIndex, " if you want details open this ", monitor.getItem())
    const droppedType = monitor.getItemType();
    const droppedItem = monitor.getItem();
    if(droppedType === "COLOR_BRICK"){
      const form = {
        timeIndex : props.timeIndex,
        dayIndex : props.dayIndex,
        durationLength : droppedItem.durationLength,
        color: droppedItem.color,
        type: 'once'
      };
      props.handleOnDrop(form);
    } else if ( droppedType === "FLEX_BRICK"){
      console.log(props, "FLEXBRICK DROPPED")
    }
    
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}


class FlexSmallBrick extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const { hideSourceOnDrag, isOver, isOverCurrent, canDrop, itemType, connectDropTarget } = this.props;
    const isActive = isOver && canDrop;
    const style = {};
    let backgroundColor = null;
    if (isActive) {
      style['backgroundColor'] = 'darkgreen'
      // style['zIndex'] = 100;
    } else if (canDrop) {
      style['backgroundColor'] ='darkkhaki';
      // style['zIndex']= 100;
    }
    return connectDropTarget( 
      <div className='smallBricks' style={style}>
      
      </div>
    );
  }
}

export default DropTarget( [ItemTypes.COLOR_BRICK, ItemTypes.FLEX_BRICK], smallBrickTarget, collect)(FlexSmallBrick);
