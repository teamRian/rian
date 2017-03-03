import React from 'react';
var Dropzone = require('react-dropzone');
import { Button, Modal } from 'react-bootstrap';

class fileUploadTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onDrop = this.onDrop.bind(this);
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

    onDrop(files) {
        console.log('Received files: ', files);
    }

    render() {
        return (
            <div>
                <Button bsStyle="warning" onClick={this.open}>FILE UPLOAD TEST</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        File Upload
                    </Modal.Header>
                    <Modal.Body>
                        <Dropzone onDrop={this.onDrop}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default fileUploadTest;
/*
import React from 'react';
import { Dropzone } from 'react-dropzone';
import { Button, Modal } from 'react-bootstrap';

class fileUploadTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    open() {
        this.setState({
            showModal: true
        })
    }

    close() {
        this.setState({
            showModal: true
        })
    }

    onDrop(files) {
        console.log('Received files: ', files);
    }

    render() {
        return (
            <div>
                <Button bsStyle="warning">FILE UPLOAD TEST</Button>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header>
                        File Upload
                    </Modal.Header>
                    <Modal.Body>
                        <Dropzone onDrop={this.onDrop}>
                            <div>Try dropping some files here, or click to select files to upload.</div>
                        </Dropzone>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default fileUploadTest;*/