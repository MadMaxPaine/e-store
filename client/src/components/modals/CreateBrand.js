import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';
export const CreateBrand = ({ show, onHide }) => {
 const [value, setValue] = useState('');
 const addBrand = () => {
  createBrand({ name: value }).then(data => setValue(''));
  onHide();
 }
 return (
  <Modal
   show={show}
   onHide={onHide}
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
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={"Enter name of Brand"}
     />
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="outline-danger" onClick={onHide}>Close</Button>
    <Button variant="outline-success" onClick={addBrand}>Add</Button>
   </Modal.Footer>
  </Modal>
 )
}
