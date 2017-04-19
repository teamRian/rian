import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../../../constants/ItemTypes';

class FlexDraggable extends Component {
  constructor(props){
    super(props);
  }

  render() {
  	const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="draggable" >
      </div>
    );
  }
}


const flexResizableSource = {
  beginDrag(props) {
  	props.startDrag();
  	return {};
  },
  endDrag(props, monitor, component) {
  	props.endDrag();
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}


export default DragSource(ItemTypes.FLEX_BRICK, flexResizableSource, collect)(FlexDraggable);
