import React from 'react';

class FileTag extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const tagText = {
      fontSize: "5px",
      padding: "2px 2px",
      marginRight: "2px",
      border: "1px solid #9E9E9E",
      borderRadius: "2px",
      color: "#9E9E9E"
    }

    const overflowX = {
      overflowX: "scroll",
      height: "30px",
      paddingLeft: "10px"
    }

    if(this.props.name.indexOf('.svg') !== -1 || this.props.name.indexOf('.png') !== -1 || this.props.name.indexOf('.jpg') !== -1 || this.props.name.indexOf('.jpeg') !== -1) {
      tagText.border = "1px solid red"
    } else if(this.props.name.indexOf('.pptx') !== -1 || this.props.name.indexOf('ppt') !== -1) {
      tagText.border = "1px solid green"
    } else if(this.props.name.indexOf('.pdf') !== -1) {
      tagText.border = "1px solid yellow"
    } else if(this.props.name.indexOf('.doc') !== -1 || this.props.name.indexOf('.docx') !== -1 ){
      tagText.border = "1px solid blue"
    } else if(this.props.name.indexOf('.txt') !== -1) {
      tagText.border = "1px solid orange"
    } else if(this.props.name.indeoxOf('.xlsx') !== -1) {
      tagText.border = "1px solid black"
    } else {
      tagText.border = "1px solid gray"
    }

    return (
      <div style={overflowX}>
        {this.props.tags.map((tag,i) => (
          <span style={tagText}>{tag}</span>
        ))} 
      </div>
    )
  }
}

export default FileTag