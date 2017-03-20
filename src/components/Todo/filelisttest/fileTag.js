import React from 'react';

class FileTag extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const tagText = {
             fontSize : "5px",
              padding : "2px 2px",
          marginRight : "2px",
               border : "1px solid #9E9E9E",
         borderRadius : "2px",
                color : "#212121",
      backgroundColor : "white"
    }

    const overflowX = {
        overflowX : "scroll",
           height : "30px",
      paddingLeft : "10px"
    }

    if(this.props.name.indexOf('.svg') !== -1 || this.props.name.indexOf('.png') !== -1 || this.props.name.indexOf('.jpg') !== -1 || this.props.name.indexOf('.jpeg') !== -1) {
      tagText.border = "1px solid rgba(186,50,199,1)";
      tagText.color  = "rgba(186,50,199,1)";
    } else if(this.props.name.indexOf('.pptx') !== -1 || this.props.name.indexOf('ppt') !== -1) {
      tagText.border = "1px solid rgba(217,155,0,1)";
      tagText.color  = "rgba(217,155,0,1)"
    } else if(this.props.name.indexOf('.pdf') !== -1) {
      tagText.border = "1px solid rgba(216,0,39,1)";
      tagText.color  = "rgba(216,0,39,1)"
    } else if(this.props.name.indexOf('.doc') !== -1 || this.props.name.indexOf('.docx') !== -1 ){
      tagText.border = "1px solid rgba(0,107,234,1)";
      tagText.color  = "rgba(0,107,234,1)"
    } else if(this.props.name.indexOf('.txt') !== -1) {
      tagText.border = "1px solid rgba(143,143,143,1)";
      tagText.color  = "rgba(143,143,143,1)"
    } else if(this.props.name.indeoxOf('.xlsx') !== -1) {
      tagText.border = "1px solid rgba(95,142,65,1)";
      tagText.color  = "rgba(95,142,65,1)";
    } else {
      tagText.border = "1px solid gray"
      tagText.color  = "gray"
    }

    return (
      <div style={overflowX}>
        {this.props.tags.map((tag,i) => (
          <span key={tag} style={tagText}>{tag}</span>
        ))} 
      </div>
    )
  }
}

export default FileTag;
