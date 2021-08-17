import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../index';
import { Row } from 'react-bootstrap';
import { DeviceItem } from './DeviceItem';
export const DeviceList = observer(() => {
 const { device } = useContext(ctx);
 return (
  <Row className="d-flex">
   {device.devices.map(device => <DeviceItem key={device.id} device={device} />)}
  </Row>
 )
});
