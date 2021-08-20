import React from 'react';
import { Row, Image, Col, Container, Card, Button } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png';
const DevicePage = () => {
 const device = { id: 1, name: "Galaxy x", price: 25000, rating: 5, img: 'https://content2.rozetka.com.ua/goods/images/big/165919739.jpg' };
 const description = [
  { id: 1, title: 'Ram', description: '10gb' },
  { id: 2, title: 'Camera', description: '24mpx' },
  { id: 3, title: 'CPU', description: 'Amd Rysen 5000' },
  { id: 4, title: 'Cores', description: '8 cores' },
  { id: 5, title: 'Battery', description: '4000 mAp' },
 ];
 return (

  <Container className="mt-3">
   <Row><Col md={4}>
    <Image width={300} height={300} src={device.img} />
   </Col>
    <Col md={4}>
     <Row className="d-flex flex-column align-items-center">
      <h2>{device.name}</h2>
      <div
       className="d-flex justify-content-center align-items-center"
       style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
      >
       {device.rating}
      </div>
     </Row>
    </Col>
    <Col md={4}>
     <Card
      className="d-flex flex-column align-items-center justify-content-around"
      style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightblue' }}
     >
      <h3>{device.price}</h3>
      <Button>Add to basket</Button>
     </Card>
    </Col>
   </Row>
   <Row className="d-flex flex-column m-2">
    <h2>Description</h2>
    {description.map((info, index) =>
     <Row
      key={info.id}
      style={{ background: index % 2 === 0 ? 'lightblue' : 'transparent', padding: 10 }}
     >{info.title}:{info.description}</Row>
    )}
   </Row>
  </Container>
 );
}
export default DevicePage;