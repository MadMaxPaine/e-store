import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { CreateBrand } from '../components/modals/CreateBrand';
import { CreateDevice } from '../components/modals/CreateDevice';
import { CreateType } from '../components/modals/CreateType';
const Admin = () => {
 const [brandVisible, setBrandVisible] = useState(false);
 const [typeVisible, setTypeVisible] = useState(false);
 const [deviceVisible, setDeviceVisible] = useState(false);
 return (
  <Container className="d-flex flex-column">
   <Button onClick={() => setTypeVisible(true)} className="mt-2 p-2">Add Type</Button>
   <Button onClick={() => setBrandVisible(true)} className="mt-2 p-2">Add Brand</Button>
   <Button onClick={() => setDeviceVisible(true)} className="mt-2 p-2">Add Device</Button>
   <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
   <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
   <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
  </Container>
 );
}
export default Admin;