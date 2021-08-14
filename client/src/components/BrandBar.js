import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../index';
import { Row, Card, Col } from 'react-bootstrap';
export const BrandBar = observer(() => {
 const { device } = useContext(ctx);
 return (
  <Row className="d-flex mt-2" >
   {
    device.brands.map(brand =><Col md="auto"> <Card
     style={{ cursor: 'pointer' }}
     key={brand.id}
     onClick={() => device.setSelectedBrand(brand)}
     border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
    >
     {brand.name}
    </Card></Col>)
   }
  </Row>
 )
});
