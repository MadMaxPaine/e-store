import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
const DevicePage = observer(() => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id)
      .then(data => setDevice(data))
  }, [id]);
  return (
    <Container className="mt-3 ">
      <Row><Col md={4}>
        {device.img && <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />}
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
        {device.info.map((info, index) =>
          <Row
            key={info.id}
            style={{ background: index % 2 === 0 ? 'lightblue' : 'transparent', padding: 10 }}
          >{info.title}:{info.description}</Row>
        )}
      </Row>
    </Container>
  );
});
export default DevicePage;