import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';


class MyModal extends React.Component {



    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title> Add new Books for your great list </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.props.addNewBookSubmit} >
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label> Book Name </Form.Label>
                                <Form.Control required name="bookName" type="text" placeholder=" Book Name " />
                                
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Status </Form.Label>
                                <Form.Control required name="bookStatus" type="text" placeholder=" Status " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Description </Form.Label>
                                <Form.Control required name="bookDesc" type="text" placeholder=" Description " />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label> Image link </Form.Label>
                                <Form.Control required name="imgUrl" type="text" placeholder=" Image link " />
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

export default MyModal
