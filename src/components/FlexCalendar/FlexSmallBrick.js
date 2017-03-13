import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ItemTypes from '../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';
import '../../styles/FlexCalendar.css';
// import from './Utils/FlexDnD';

const colorBrickBoardTarget = {
  drop(props, monitor, component) {
    console.log(arguments)
    // props.onDrop(monitor.getItem());
  }
};

/**
 * Specifies which props to inject into your component.
 */
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

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
  }

  render() {
    const { isOver, isOverCurrent, canDrop, itemType, connectDropTarget} = this.props;
    const isActive = isOver && canDrop;
    let backgroundColor = null;
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }
    return connectDropTarget( 
      <div className='smallBricks' style={{backgroundColor}}>
        {this.props.children}
      </div>
    );
  }
}

export default DropTarget( ItemTypes.COLOR_BRICK, colorBrickBoardTarget, collect)(FlexSmallBrick);
