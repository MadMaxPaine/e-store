import React from 'react';
import { Button, Container } from 'react-bootstrap';
const Admin = () => {
 return (
  <Container className="d-flex flex-column">
   <Button className="mt-2 p-2">Add Type</Button>
   <Button className="mt-2 p-2">Add Brand</Button>
   <Button className="mt-2 p-2">Add Device</Button>
  </Container>
 );
}
export default Admin;