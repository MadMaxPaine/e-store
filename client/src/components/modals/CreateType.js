import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';
export const CreateType = ({ show, onHide }) => {
 const [value, setValue] = useState('');
 const addType = () => {
  createType({ name: value }).then(data => setValue(''));
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
     Adding Type
    </Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Form>
     <Form.Control
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={"Enter name of Type"}
     />
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="outline-danger" onClick={onHide}>Close</Button>
    <Button variant="outline-success" onClick={addType}>Add</Button>
   </Modal.Footer>
  </Modal>
 )
}
