import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { ctx } from '../../index';
export const CreateDevice = ({ show, onHide }) => {
 const { device } = useContext(ctx);
 const [info, setInfo] = useState([]);
 const addInfo = () => {
  setInfo([...info, { title: '', description: '', number: Date.now() }]);
 }
 const removeInfo = (number) => {
  setInfo(info.filter(i => i.number !== number));
 }
 return (
  <Modal
   show={show}
   hide={onHide}
   aria-labelledby="contained-modal-title-vcenter"
   centered
  >
   <Modal.Header>
    <Modal.Title id="contained-modal-title-vcenter">
     Adding Device
    </Modal.Title>
   </Modal.Header>
   <Modal.Body>
    <Form>
     <Dropdown className="mt-2">
      <Dropdown.Toggle>
       Select type
      </Dropdown.Toggle>
      <Dropdown.Menu>
       {device.types.map(type =>
        <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
       )}
      </Dropdown.Menu>
     </Dropdown>

     <Dropdown className="mt-2">
      <Dropdown.Toggle>
       Select brand
      </Dropdown.Toggle>
      <Dropdown.Menu>
       {device.brands.map(brand =>
        <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
       )}
      </Dropdown.Menu>
     </Dropdown>
     <Form.Control
      className="mt-2"
      placeholder={"Enter name of the device"}
     />
     <Form.Control
      className="mt-2"
      type="number"
      placeholder={"Enter cost of the device"}
     />
     <Form.Control
      className="mt-2"
      type="file"
      placeholder={"Upload image of the device"}
     />
     <hr />
     <Button className="mt-2" onClick={addInfo} > Add new property</Button>
     {
      info.map(i =>
       <Row className="mt-2" key={i.number}>
        <Col md={4}>
         <Form.Control
          placeholder={"name"}
         />
        </Col>
        <Col md={4}>
         <Form.Control
          placeholder={"property"}
         />
        </Col>
        <Col md={4}>
         <Button onClick={()=>removeInfo(i.number)}>Remove</Button>
        </Col>
       </Row>
      )
     }
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="outline-danger" onClick={onHide}>Close</Button>
    <Button variant="outline-success" onClick={onHide}>Add</Button>
   </Modal.Footer>
  </Modal>
 )
}
