import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../index';
import ListGroup from 'react-bootstrap/ListGroup';


export const TypeBar = observer(() => {
 const { device } = useContext(ctx);
 return (
  <ListGroup className="mt-2">
   {device.types.map(type => <ListGroup.Item
    key={type.id}
    style={{ cursor: 'pointer' }}
    active={type.id === device.selectedType.id}

    onClick={() => device.setSelectedType(type)}
   >{type.name}
   </ListGroup.Item>)}
  </ListGroup>
 )
});
