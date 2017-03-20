import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

// import Component
import FileUploadProgressBar  from './fileUploadProgressBar.js';

// import CSS
import './fileUpload.css';

class fileUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
              showModal : false,
             showUpload : "Upload File",
                   tags : [],
            numChildren : 0
        };

        // Modal Button Action
        this.open  = this.open.bind(this);
        this.close = this.close.bind(this);

        // Other Function
        this.handleChange = this.handleChange.bind(this);
    }

    // Modal Button Action
    open () { this.setState( { showModal : true  } ); }
    close() { this.setState( { showModal : false } ); }

    // Other Function
    handleChange(e) {
        this.setState({
            showUpload : e.target.files[0].name
        })
    }

    render() {

        return (
            <div>
                <Button bsClass="file-upload-button" onClick={this.open}>FILE UPLOAD</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        File Upload
                    </Modal.Header>
                    <Modal.Body>
                        <div className="file-upload-container">
                            <FileUploadProgressBar {...this.props} key='ex1' url='http://localhost:8000/file/upload'
                                onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
                                onLoad ={ (e, request) => {console.log('load',  e, request);}}
                                onError={ (e, request) => {console.log('error', e, request);}}
                                onAbort={ (e, request) => {console.log('abort', e, request);}}
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default fileUpload;
