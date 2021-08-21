import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
export const CreateBrand = ({ show, onHide }) => {
 return (
  <Modal
   show={show}
   hide={onHide}
   aria-labelledby="contained-modal-title-vcenter"
   centered
  >
   <Modal.Header>
    <Modal.Title id="contained-modal-title-vcenter">
     Adding Brand
    </Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Form>
     <Form.Control
      placeholder={"Enter name of Brand"}
     />
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="outline-danger" onClick={onHide}>Close</Button>
    <Button variant="outline-success" onClick={onHide}>Add</Button>
   </Modal.Footer>
  </Modal>
 )
}
