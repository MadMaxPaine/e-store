import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png';
import { useHistory } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';
export const DeviceItem = ({ device }) => {
 const history = useHistory();
 return (
  <Col className="mt-2 d-flex" md={3} onClick={() => history.push(`${DEVICE_ROUTE}/${device.id}`)}>
   <Card style={{ width: 150, cursor: 'pointer' }} border={"light"}>
    <Image style={{ 'padding': 5 }} width={150} height={150} src={device.img}></Image>
    <div className="d-flex justify-content-between align-items-center text-black-50 mt-1">
     <div>Some item...</div>
     <div className="d-flex justify-content-center align-items-center">
      <div>{device.rating}</div>
      <Image width={20} height={20} src={star}></Image>
     </div>
    </div>
    <div>{device.name}</div>
   </Card>
  </Col>
 )
}
