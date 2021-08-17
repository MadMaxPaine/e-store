import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TypeBar } from '../components/TypeBar';
import { BrandBar } from '../components/BrandBar';
import { DeviceList } from '../components/DeviceList';

const Shop = () => {
 return (
  <Container>
   <Row>
    <Col md={3}>
     <TypeBar></TypeBar>
    </Col>
    <Col md={9}>
     <BrandBar />
     <DeviceList />
    </Col>
   </Row>
  </Container>
 );
}
export default Shop;