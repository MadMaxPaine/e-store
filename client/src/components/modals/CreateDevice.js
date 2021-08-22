import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Dropdown, Row, Col } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { ctx } from '../../index';
import { observer } from 'mobx-react-lite';


export const CreateDevice = observer(({ show, onHide }) => {

 const { device } = useContext(ctx);
 const [name, setName] = useState('');
 const [price, setPrice] = useState(0);
 const [file, setFile] = useState(null);
 const [info, setInfo] = useState([]);

 useEffect(() => {
  fetchTypes().then(data => device.setTypes(data));
  fetchBrands().then(data => device.setBrands(data));
 }, [device]);

 const addInfo = () => {
  setInfo([...info, { title: '', description: '', number: Date.now() }]);
 }
 const changeInfo = (key, value, number) => {
  setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
 }
 const removeInfo = (number) => {
  setInfo(info.filter(i => i.number !== number));
 }

 const selectFile = (e) => {
  setFile(e.target.files[0]);
 }

 const addDevice = () => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', `${price}`);
  formData.append('image', file);
  formData.append('brandId', device.selectedBrand.id);
  formData.append('typeId', device.selectedType.id);
  formData.append('info', JSON.stringify(info));
  createDevice(formData).then(data => onHide());
 }
 return (
  <Modal
   show={show}
   onHide={() => onHide()}
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
       {device.selectedType.name || "Type"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
       {device.types.map(type =>
        <Dropdown.Item
         onClick={() => device.setSelectedType(type)}
         key={type.id}
        >
         {type.name}
        </Dropdown.Item>
       )}
      </Dropdown.Menu>
     </Dropdown>
     <Dropdown className="mt-2">
      <Dropdown.Toggle>
       {device.selectedBrand.name || "Brand"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
       {device.brands.map(brand =>
        <Dropdown.Item
         onClick={() => device.setSelectedBrand(brand)}
         key={brand.id}
        >
         {brand.name}
        </Dropdown.Item>
       )}
      </Dropdown.Menu>
     </Dropdown>
     <Form.Control
      className="mt-2"
      placeholder={"Enter name of the device"}
      value={name}
      onChange={(e) => setName(e.target.value)}
     />
     <Form.Control
      className="mt-2"
      type="number"
      placeholder={"Enter cost of the device"}
      value={price}
      onChange={(e) => setPrice(Number(e.target.value))}
     />
     <Form.Control
      className="mt-2"
      type="file"
      onChange={selectFile}
     />
     <hr />
     <Button className="mt-2" onClick={addInfo} > Add new property</Button>
     {
      info.map(i =>
       <Row className="mt-2" key={i.number}>
        <Col md={4}>
         <Form.Control
          value={i.title}
          placeholder={"name"}
          onChange={(e) => changeInfo('title', e.target.value, i.number)}
         />
        </Col>
        <Col md={4}>
         <Form.Control
          value={i.description}
          placeholder={"property"}
          onChange={(e) => changeInfo('description', e.target.value, i.number)}
         />
        </Col>
        <Col md={4}>
         <Button onClick={() => removeInfo(i.number)}>Remove</Button>
        </Col>
       </Row>
      )
     }
    </Form>
   </Modal.Body>
   <Modal.Footer>
    <Button variant="outline-danger" onClick={onHide}>Close</Button>
    <Button variant="outline-success" onClick={addDevice}>Add</Button>
   </Modal.Footer>
  </Modal>
 )
})
