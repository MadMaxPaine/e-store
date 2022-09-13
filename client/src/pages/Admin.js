import React, { useState } from 'react';
import { CreateBrand } from '../components/modals/CreateBrand';
import { CreateDevice } from '../components/modals/CreateDevice';
import { CreateType } from '../components/modals/CreateType';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const Admin = () => {
 const [brandVisible, setBrandVisible] = useState(false);
 const [typeVisible, setTypeVisible] = useState(false);
 const [deviceVisible, setDeviceVisible] = useState(false);
 return (
  <Stack spacing={2} direction="column" sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "100%", mt: 1 }}>
   <Button variant="contained" onClick={() => setTypeVisible(true)}>Add Type</Button>
   <Button variant="contained" onClick={() => setBrandVisible(true)}>Add Brand</Button>
   <Button variant="contained" onClick={() => setDeviceVisible(true)}>Add Device</Button>
   <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
   <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
   <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
  </Stack>
 );
}
export default Admin;