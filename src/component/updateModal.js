import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


class UpdateModal extends React.Component {
    render() {
        return (
            <div>
                <Modal show={this.props.showUpdate} onHide={this.props.hideBookUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title> Update the book Info </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.updateFunc} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label> Book Name </Form.Label>
                                <Form.Control required name="bookNameUpdate" type="text" placeholder=" Book Name " />
                                
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Status </Form.Label>
                                <Form.Control required name="bookStatusUpdate" type="text" placeholder=" Status " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Description </Form.Label>
                                <Form.Control required name="bookDescUpdate" type="text" placeholder=" Description " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Image link </Form.Label>
                                <Form.Control required name="imgUrlUpdate" type="text" placeholder=" Image link " />
                            </Form.Group>
                            
                            <Modal.Footer>
                        <Button variant="primary" type="submit">
                                Submit
                            </Button>
                    </Modal.Footer>
                            
                        </Form>
                    </Modal.Body>
                    
                </Modal>
            </div>
        )
    }
}

export default UpdateModal
