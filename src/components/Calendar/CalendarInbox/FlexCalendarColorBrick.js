import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../../../constants/ItemTypes';
import { Button } from 'react-bootstrap';

const brickSource = {

  beginDrag(props) {

    return {
      id: props.id,
      color: props.color,
      text: props.text,
      durationLength: props.durationLength
    };
  },

  endDrag(props, monitor, component) {
  	console.log(arguments, "ENDDRAG!!");
    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    console.log("DROPPED!!!!");
  }
};

/**
 * Specifies the props to inject into your component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  text: PropTypes.string.isRequired,
  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};
	
class Brick extends Component {
  render() {
    const { isDragging, connectDragSource, text } = this.props;
    return connectDragSource(
      <div key={this.props.key} 
           className='colorBrick' 
           style={{ 
              opacity: isDragging ? 0.5 : 1,
              backgroundColor: this.props.color
           }} 
           onDragStart={(e)=>console.log(e)}>
       	{this.props.text}
      </div>
    );
  }
}

Brick.propTypes = propTypes;

// Export the wrapped component:
export default DragSource(ItemTypes.COLOR_BRICK, brickSource, collect)(Brick);