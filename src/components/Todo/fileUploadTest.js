import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class fileUploadTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showUpload: "Upload File"
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
        console.log('Selected file:', e.target.files[0]);
        this.setState({
            showUpload: e.target.files[0].name
        })
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
                        <div className="uploadTest">
                            <form ref='uploadForm' 
                                id='uploadForm'
                                action='http://localhost:8000/file/upload' 
                                method='post' 
                                encType="multipart/form-data"
                                >
                                    <label for="file" className="fileContainer">
                                        {this.state.showUpload}
                                        <input type="file" name="uploadFile" id="file" className="inputfile" onChange={this.handleChange}/>
                                    </label>
                                    <input type='submit' value='Upload!' />
                            </form>
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

export default fileUploadTest;