'use strict';

import { EventEmitter } from 'events';
import React from 'react';
import ReactDom from 'react-dom';
import objectAssign from 'object-assign';
import moment from 'moment';
import { Table } from 'react-bootstrap';

// import ICON
import fileSvgIcon from './file_svgIcon';

// import CSS
import './fileUploadProgressBar.css';

const styles = {
  progressBar : {
               float : 'left',
               width : '0',
              height : '100%',
            fontSize : '12px',
          lineHeight : '20px',
               color : '#fff',
           textAlign : 'center',
     backgroundColor : 'rgba(216,0,39,0.2)',
              border : '1px solid rgba(216,0,39,1)',
    WebkitTransition : 'width .6s ease',
         Otransition : 'width .6s ease',
          transition : 'width .6s ease',
  }
};

class FileUploadProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.proxy = new EventEmitter();
    this.state = {
          progress : -1,
          hasError : false,
        showUpload : "Upload File",
      clickMessage : "",
          showIcon : false,
          fileSize : "",
         addingTag : "",
              tags : [],
         removeTag : "",
      existWarning : false
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit     = this.onSubmit.bind(this);
    this.handleTags   = this.handleTags.bind(this);
    this.addTags      = this.addTags.bind(this);
    this.removeTags   = this.removeTags.bind(this);
  }

  cancelUpload() {
    this.proxy.emit('abort');
    this.setState({
      progress: -1,
      hasError: false,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const filename    = this.state.showUpload;
    const projectId   = "khseok_CS101";
    const projectName = "CS101";
    const uploader    = "khseok";
    const createdAt   = moment().format("YYYY-MM-DD h:mm a");
    const tag         = this.state.tags;
    const fileSize    = this.state.fileSize;

    if(filename !== "Upload File") {
      this.setState({
        progress: 0,
        hasError: false,
      }, this._doUpload);
      this.props.addFile(filename, projectId, projectName, uploader, createdAt, tag, fileSize);
    } else {
      window.alert('File을 선택하세요!');
    }
    
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
        showUpload: e.target.files[0].name,
        clickMessage: "Upload를 하시려면 위의 ICON을 클릭하세요",
        showIcon: true,
        fileSize: e.target.files[0].size
    })
  }

  handleTags(e) {
    e.preventDefault();
    this.setState({
      addingTag: e.target.value 
    })
  }

  addTags(e) {
    e.preventDefault();
    let prevTag = this.state.tags;
    if(this.state.addingTag.length === 0) {
      this.setState({
        existWarning: "Tag를 입력하여 주십시요."
      })
    } else if(prevTag.indexOf(this.state.addingTag) === -1 && this.state.addingTag.length !== 0) {
      prevTag.push(this.state.addingTag);
      this.setState({
        tags: prevTag,
        addingTag: "",
        existWarning: false
      })
    } else {
      this.setState({
        existWarning: "이미 존재하는 Tag입니다."
      })
    }
  }

  removeTags(e) {
    e.preventDefault();
    let originalTag = this.state.tags;
    let tagIndex    = originalTag.indexOf(e.currentTarget.textContent);
    let fixedTag    = [ ...this.state.tags.slice(0, tagIndex), ...this.state.tags.slice(tagIndex+1) ];
    if(fixedTag.length === 0) {
      this.setState({
        tags: []
      })
    } else {
      this.setState({
        tags: fixedTag
      })
    }
  }

  render() {

    const plusIconStyle = {
      enableBackground: "new 0 0 496.158 496.158",
      margin: "5px 5px"
    }

    const plusIcon = (
      <svg onClick={this.addTags} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 496.158 496.158" style={plusIconStyle} xmlSpace="preserve" width="20px" height="20px">
        <path style={{fill:"#32BEA6"}} d="M0,248.085C0,111.063,111.069,0.003,248.075,0.003c137.013,0,248.083,111.061,248.083,248.082
          c0,137.002-111.07,248.07-248.083,248.07C111.069,496.155,0,385.087,0,248.085z"/>
        <path style={{fill:"#FFFFFF"}} d="M383.546,206.55H289.08v-93.938c0-3.976-3.224-7.199-7.201-7.199H213.75
          c-3.977,0-7.2,3.224-7.2,7.199v93.938h-93.937c-3.977,0-7.2,3.225-7.2,7.2v69.187c0,3.976,3.224,7.199,7.2,7.199h93.937v93.41
          c0,3.976,3.224,7.199,7.2,7.199h68.129c3.978,0,7.201-3.224,7.201-7.199v-93.41h94.466c3.976,0,7.199-3.224,7.199-7.199V213.75
          C390.745,209.774,387.521,206.55,383.546,206.55z"/>
      </svg>
    )

    const fileInfo = (
      <div className="fileInfoStyle">
        <hr />
        <h4>파일 정보</h4>
        <Table>
          <tbody>
            <tr className="fileupload-textCenter">
              <td className="file-upload-progress-file-info-title">작성자</td>
              <td className="file-upload-progress-file-info-content">khseok</td>
              <td className="file-upload-progress-file-info-title">작성일</td>
              <td className="file-upload-progress-file-info-content">{moment().format("YYYY-MM-DD h:mm a")}</td>
            </tr>
            <tr className="fileupload-textCenter">
              <td className="file-upload-progress-file-info-title">파일명</td>
              <td className="file-upload-progress-file-info-content">{this.state.showUpload}</td>
              <td className="file-upload-progress-file-info-title">파일 크기</td>
              <td className="file-upload-progress-file-info-content">{ this.state.fileSize < 99999 ? Math.round(this.state.fileSize / 1024) + "KB" :
                (Math.round(this.state.fileSize * 0.000001)).toFixed(4) + "MB"}</td>
            </tr>
          </tbody>
        </Table>
        <form className="addTagContainer">
          <span className="addTag">Tag 추가</span>
          <input type="text" placeholder="Tag를 입력하세요" className="inputText" onChange={this.handleTags} value={this.state.addingTag}/>
          {plusIcon}
          <span className="file-upload-progress-file-warning-text">* Tag를 클릭하시면 삭제됩니다.</span>
        </form>
        <p className="file-upload-progress-file-warning-text">{this.state.existWarning? this.state.existWarning : ""}</p>
        {this.state.tags.length === 0 ? "" : <ul className="tagBox">{this.state.tags.map((tag,i) => <li key={i} className="tagItem" value={tag} onClick={this.removeTags}>{tag}</li>)}</ul>}
      </div>
    )

    const uploadTriggerButtonStyle = {
      cursor: "pointer"
    }

    const formElement = (
      <div>
        <div style={uploadTriggerButtonStyle} onClick={this.onSubmit}>
          {!this.state.showIcon ? fileSvgIcon.fileIcon : fileSvgIcon.uploadIcon}
          <p className="fontAdjust">{!this.state.showIcon ? "아래의 Upload File을 클릭하세요" : "저장 하시려면 위의 ICON을 클릭하세요"}</p>
        </div>
        <form className="_react_fileupload_form_content" ref="form" method="post">
          <label for="file" className="fileContainer1">
            <span>{this.state.showUpload}</span>
            <input type="file" name="file" onChange={this.handleChange}/>
          </label>
        </form>
        {!this.state.showIcon ? "" : fileInfo}
      </div>
    );

    const progessElement = this.props.progressRenderer(this.state.progress, this.state.hasError, this.cancelUpload.bind(this));

    return (
      <div>
        {formElement}
        {progessElement}
      </div>
    );
  }

  _getFormData() {
    if (this.props.formGetter) {
      return this.props.formGetter();
    }
    return new FormData(ReactDom.findDOMNode(this.refs.form));
  }

  _doUpload() {
    const form = this._getFormData();
    const req = new XMLHttpRequest();
    req.open('POST', this.props.url);

    req.addEventListener('load', (e) => {
      this.proxy.removeAllListeners(['abort']);
      const newState = { progress: 100 };
      if (req.status >= 200 && req.status <= 299) {
        this.setState(newState, () => {
          this.props.onLoad(e, req);
        });
      } else {
        newState.hasError = true;
        this.setState(newState, () => {
          this.props.onError(e, req);
        });
      }
    }, false);

    req.addEventListener('error', (e) => {
      this.setState({
        hasError: true,
      }, () => {
        this.props.onError(e, req);
      });
    }, false);

    req.upload.addEventListener('progress', (e) => {
      let progress = 0;
      if (e.total !== 0) {
        progress = parseInt((e.loaded / e.total) * 100, 10);
      }
      this.setState({
        progress,
      }, () => {
        this.props.onProgress(e, req, progress);
      });
    }, false);

    req.addEventListener('abort', (e) => {
      this.setState({
        progress: -1,
      }, () => {
        this.props.onAbort(e, req);
      });
    }, false);

    this.proxy.once('abort', () => {
      req.abort();
    });

    this.props.beforeSend(req)
              .send(this.props.formCustomizer(form));
  }
}

FileUploadProgressBar.propTypes = {
               url : React.PropTypes.string.isRequired,
        formGetter : React.PropTypes.func,
  progressRenderer : React.PropTypes.func,
    formCustomizer : React.PropTypes.func,
        beforeSend : React.PropTypes.func,
        onProgress : React.PropTypes.func,
            onLoad : React.PropTypes.func,
           onError : React.PropTypes.func,
           onAbort : React.PropTypes.func,
};

FileUploadProgressBar.defaultProps = {
  progressRenderer: (progress, hasError, cancelHandler) => {
    if (hasError || progress > -1) {
      const barStyle = objectAssign({}, styles.progressBar);
      barStyle.width = `${progress}%`;

      let message = (<span>Uploading ...</span>);
      if (hasError) {
        barStyle.backgroundColor = '#d9534f';
        message = (<span style={{ color: '#a94442' }}>Failed to upload ...</span>);
      }
      if (progress === 100) {
        message = (<span >Successfully uploaded</span>);
      }

      return (
        <div className="_react_fileupload_progress_content">
          <div className="progressWrapper">
            <div className="_react_fileupload_progress_bar" style={barStyle}></div>
          </div>
          <button
              className="cancelButton"
              onClick={cancelHandler}>
            <span>&times;</span>
          </button>
          <div style={{ clear: 'left' }}>
            {message}
          </div>
        </div>
      );
    }
    return '';
  },

  formCustomizer: (form) => form,
  beforeSend: (request) => request,
  onProgress: (e, request, progress) => {},
  onLoad: (e, request) => {},
  onError: (e, request) => {},
  onAbort: (e, request) => {}
};

export default FileUploadProgressBar;

