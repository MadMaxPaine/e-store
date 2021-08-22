import React, { useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TypeBar } from '../components/TypeBar';
import { BrandBar } from '../components/BrandBar';
import { DeviceList } from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { ctx } from '../index';
import { fetchBrands, fetchTypes, fetchDevices } from '../http/deviceAPI';

const Shop = observer(() => {
 const { device } = useContext(ctx);
 useEffect(() => {
  fetchTypes().then(data => device.setTypes(data));
  fetchBrands().then(data => device.setBrands(data));
  fetchDevices().then(data => device.setDevices(data.rows));
 }, [device]);
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
});
export default Shop;