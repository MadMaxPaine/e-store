import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { ctx } from '../index';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';


export const TypeBar = observer(() => {
 const { device } = useContext(ctx);
 return (
  <Box sx={{ mt: 1, overflow: "hidden", textOverflow: "ellipsis", bgcolor: 'background.paper', maxWidth: "100%", }}>
   <List
    component="nav"
    aria-label="Kinds of products">
    {device.types.map(type =>
     <ListItemButton
      key={type.id}
      style={{ cursor: 'pointer', width: "100vw" }}
      selected={type.id === device.selectedType.id}
      onClick={() => device.setSelectedType(type)}
     ><ListItemText primary={type.name} />
     </ListItemButton>
    )}
   </List>
  </Box>
 )
});
