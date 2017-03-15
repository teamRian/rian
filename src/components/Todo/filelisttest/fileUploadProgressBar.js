'use strict';

import { EventEmitter } from 'events';
import React from 'react';
import ReactDom from 'react-dom';
import objectAssign from 'object-assign';
import moment from 'moment';
import { Table } from 'react-bootstrap';

import './fileUploadProgressBar.css';

const styles = {
  progressBar: {
    float: 'left',
    width: '0',
    height: '100%',
    fontSize: '12px',
    lineHeight: '20px',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(216,0,39,0.2)',
    border: '1px solid rgba(216,0,39,1)',
    WebkitTransition: 'width .6s ease',
    Otransition: 'width .6s ease',
    transition: 'width .6s ease',
  }
};

class FileUploadProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.proxy = new EventEmitter();
    this.state = {
      progress: -1,
      hasError: false,
      showUpload: "Upload File",
      clickMessage: "",
      showIcon: false,
      fileSize: "",
      addingTag: "",
      tags: [],
      removeTag:"",
      existWarning: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.addTags = this.addTags.bind(this);
    this.removeTags= this.removeTags.bind(this);
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
    this.setState({
      progress: 0,
      hasError: false,
    }, this._doUpload);

    const filename = this.state.showUpload;
    const projectId = "khseok_CS101";
    const projectName = "CS101";
    const uploader = "khseok"
    const createdAt = moment().format("YYYY-MM-DD h:mm a");
    const tag = this.state.tags;
    const fileSize = this.state.fileSize;

    this.props.addFile(filename, projectId, projectName, uploader, createdAt, tag, fileSize)
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
    let tagIndex = originalTag.indexOf(e.currentTarget.textContent);
    let fixedTag = [ ...this.state.tags.slice(0, tagIndex), ...this.state.tags.slice(tagIndex+1)];
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

    const fileInfoTitle = {
      border: "0px",
      color: "#757575",
      backgroundColor: "rgba(0,150,136,0.2)",
      border: "1px solid rgba(0,150,136,1)",
      padding: "4px 4px"
    }

    const fileInfoContent = {
      border: "0px",
      color: "#757575",
      overflowX: "hidden",
      padding: "4px 4px"
    }

    const warningText = {
      fontSize: "10px",
      color: "#C62828"
    }

    const fileInfo = (
      <div className="fileInfoStyle">
        <hr />
        <h4>파일 정보</h4>
        <Table>
          <tbody>
            <tr className="fileupload-textCenter">
              <td className="quaterWidth" style={fileInfoTitle}>작성자</td>
              <td className="quaterWidth" style={fileInfoContent}>khseok</td>
              <td className="quaterWidth" style={fileInfoTitle}>작성일</td>
              <td className="quaterWidth" style={fileInfoContent}>{moment().format("YYYY-MM-DD h:mm a")}</td>
            </tr>
            <tr className="fileupload-textCenter">
              <td className="quaterWidth" style={fileInfoTitle}>파일명</td>
              <td className="quaterWidth" style={fileInfoContent}>{this.state.showUpload}</td>
              <td className="quaterWidth" style={fileInfoTitle}>파일 크기</td>
              <td className="quaterWidth" style={fileInfoContent}>{ this.state.fileSize < 99999 ? Math.round(this.state.fileSize / 1024) + "KB" :
                (Math.round(this.state.fileSize * 0.000001)).toFixed(4) + "MB"}</td>
            </tr>
          </tbody>
        </Table>
        <form className="addTagContainer">
          <span className="addTag">Tag 추가</span>
          <input type="text" placeholder="Tag를 입력하세요" className="inputText" onChange={this.handleTags} value={this.state.addingTag}/>
          {plusIcon}
          <span style={warningText}>* Tag를 클릭하시면 삭제됩니다.</span>
        </form>
        <p style={warningText}>{this.state.existWarning? this.state.existWarning : ""}</p>
        {this.state.tags.length === 0 ? "" : <ul className="tagBox">{this.state.tags.map((tag,i) => <li key={i} className="tagItem" value={tag} onClick={this.removeTags}>{tag}</li>)}</ul>}
      </div>
    )

    const uploadTriggerButtonStyle = {
      cursor: "pointer"
    }

    const formElement = (
      <div>
        <div style={uploadTriggerButtonStyle} onClick={this.onSubmit}>
          {!this.state.showIcon ? fileIcon : uploadIcon}
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

const fileIcon = (
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512 512" style={{enableBackground:"new 0 0 512 512"}} xmlSpace="preserve" width="100px" height="100px">
    <path style={{fill:"#E4EAF6"}} d="M127.534,75.967l-12.776,25.55h97.103l-12.776-25.55c-2.99-5.982-9.103-9.76-15.791-9.76h-39.97
      C136.638,66.207,130.525,69.985,127.534,75.967z"/>
    <path style={{fill:"#EFF2FA"}} d="M397.241,225.103H114.759c-4.875,0-8.828-3.953-8.828-8.828V92.69c0-4.875,3.953-8.828,8.828-8.828
      h282.483c4.875,0,8.828,3.953,8.828,8.828v123.586C406.069,221.151,402.116,225.103,397.241,225.103z"/>
    <path style={{fill:"#E4EAF6"}} d="M414.897,242.759H97.103c-4.875,0-8.828-3.953-8.828-8.828V110.345c0-4.875,3.953-8.828,8.828-8.828
      h317.793c4.875,0,8.828,3.953,8.828,8.828v123.586C423.724,238.806,419.772,242.759,414.897,242.759z"/>
    <path style={{fill:"#E1C3A0"}} d="M509.778,256.415l-39.393-70.909c-1.557-2.803-4.511-4.541-7.716-4.541H49.332
      c-3.206,0-6.159,1.738-7.716,4.541L2.222,256.415C0.765,259.038,0,261.988,0,264.989v39.563h512v-39.563
      C512,261.988,511.235,259.038,509.778,256.415z"/>
    <path style={{fill:"#C7CFE2"}} d="M109.879,111.277l-12.776,25.55h108.015l-12.776-25.55c-2.99-5.982-9.105-9.76-15.791-9.76h-50.881
      C118.983,101.517,112.87,105.295,109.879,111.277z"/>
    <path style={{fill:"#EFF2FA"}} d="M414.897,260.414H97.103c-4.875,0-8.828-3.953-8.828-8.828V128c0-4.875,3.953-8.828,8.828-8.828
      h317.793c4.875,0,8.828,3.953,8.828,8.828v123.586C423.724,256.461,419.772,260.414,414.897,260.414z"/>
    <path style={{fill:"#C7CFE2"}} d="M432.552,278.069H79.448c-4.875,0-8.828-3.953-8.828-8.828V145.655c0-4.875,3.953-8.828,8.828-8.828
      h353.103c4.875,0,8.828,3.953,8.828,8.828v123.586C441.379,274.116,437.427,278.069,432.552,278.069z"/>
    <path style={{fill:"#9FA7BF"}} d="M92.224,146.588l-12.776,25.55h132.414l-12.776-25.55c-2.99-5.982-9.103-9.76-15.791-9.76h-75.279
      C101.327,136.828,95.214,140.606,92.224,146.588z"/>
    <path style={{fill:"#EFF2FA"}} d="M432.552,295.724H79.448c-4.875,0-8.828-3.953-8.828-8.828V163.31c0-4.875,3.953-8.828,8.828-8.828
      h353.103c4.875,0,8.828,3.953,8.828,8.828v123.586C441.379,291.772,437.427,295.724,432.552,295.724z"/>
    <path style={{fill:"#8F96AC"}} d="M450.207,313.379H61.793c-4.875,0-8.828-3.953-8.828-8.828V180.966c0-4.875,3.953-8.828,8.828-8.828
      h388.414c4.875,0,8.828,3.953,8.828,8.828v123.586C459.034,309.427,455.082,313.379,450.207,313.379z"/>
    <path style={{fill:"#EBD2AF"}} d="M503.172,260.414H358.559c-3.343,0-6.4,1.889-7.895,4.879l-10.335,20.671
      c-2.99,5.982-9.105,9.76-15.791,9.76H187.464c-6.687,0-12.801-3.778-15.791-9.76l-10.335-20.671
      c-1.495-2.99-4.552-4.879-7.895-4.879H8.828c-4.875,0-8.828,3.953-8.828,8.828v167.724c0,4.875,3.953,8.828,8.828,8.828h494.345
      c4.875,0,8.828-3.953,8.828-8.828V269.241C512,264.366,508.047,260.414,503.172,260.414z"/>
    <path style={{fill:"#EFF2FA"}} d="M326.621,242.759h105.931c4.875,0,8.828-3.953,8.828-8.828v-35.31c0-4.875-3.953-8.828-8.828-8.828
      H326.621c-4.875,0-8.828,3.953-8.828,8.828v35.31C317.793,238.806,321.746,242.759,326.621,242.759z"/>
    <path style={{fill:"#707487"}} d="M379.586,207.448h-35.31c-4.875,0-8.828,3.953-8.828,8.828l0,0c0,4.875,3.953,8.828,8.828,8.828
      h35.31c4.875,0,8.828-3.953,8.828-8.828l0,0C388.414,211.4,384.461,207.448,379.586,207.448z"/>
    <path style={{fill:"#8F96AC"}} d="M414.897,207.448h-8.828c-4.875,0-8.828,3.953-8.828,8.828l0,0c0,4.875,3.953,8.828,8.828,8.828
      h8.828c4.875,0,8.828-3.953,8.828-8.828l0,0C423.724,211.401,419.772,207.448,414.897,207.448z"/>
  </svg>
)

const uploadIcon = (
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 286.036 286.036" style={{enableBackground:"new 0 0 286.036 286.036"}} xmlSpace="preserve" width="100px" height="100px">
        <g>
            <path fill="#39B29D" d="M231.641,113.009c-3.915-40.789-37.875-72.792-79.684-72.792c-32.351,0-60.053,19.201-72.819,46.752
                c-3.844-1.225-7.849-2.056-12.095-2.056c-22.214,0-40.226,18.021-40.226,40.226c0,4.416,0.885,8.591,2.199,12.551
                C11.737,147.765,0,166.26,0,187.696c0,32.092,26.013,58.105,58.105,58.105v0.018h160.896v-0.018
                c37.044,0,67.035-30.009,67.035-67.044C286.036,146.075,262.615,118.927,231.641,113.009z M176.808,164.472h-15.912v35.864
                c0,4.943-3.987,8.957-8.939,8.957h-17.878c-4.934,0-8.939-4.014-8.939-8.957v-35.864h-15.921c-9.708,0-13.668-6.481-8.823-14.383
                l33.799-33.316c6.624-6.615,10.816-6.838,17.646,0l33.799,33.316C190.503,158,186.516,164.472,176.808,164.472z"/>
        </g>
    </svg>
)


FileUploadProgressBar.propTypes = {
  url: React.PropTypes.string.isRequired,
  formGetter: React.PropTypes.func,
  progressRenderer: React.PropTypes.func,
  formCustomizer: React.PropTypes.func,
  beforeSend: React.PropTypes.func,
  onProgress: React.PropTypes.func,
  onLoad: React.PropTypes.func,
  onError: React.PropTypes.func,
  onAbort: React.PropTypes.func,
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

