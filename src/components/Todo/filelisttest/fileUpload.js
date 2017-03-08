import React from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import FileUploadProgressBar  from './fileUploadProgressBar.js';
import './fileUpload.css';

class fileUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showUpload: "Upload File",
            tags: [],
            numChildren: 0
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    open() {
        this.setState({
            showModal: true
        })
    }

    close() {
        this.setState({
            showModal: false
        })
    }

    handleChange(e) {
        this.setState({
            showUpload: e.target.files[0].name
        })
    }

   
    render() {

        const uploadContainer = {
            textAlign: "center"
        }

        const fullWidth = {
            width: "100%"
        }


        return (
            <div>
                <Button bsClass="fileUploadButton" onClick={this.open}>FILE UPLOAD</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        File Upload
                    </Modal.Header>
                    <Modal.Body>
                        <div style={uploadContainer}>
                            <FileUploadProgressBar {...this.props} key='ex1' url='http://localhost:8000/file/upload'
                                onProgress={(e, request, progress) => {console.log('progress', e, request, progress);}}
                                onLoad={ (e, request) => {console.log('load', e, request);}}
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
