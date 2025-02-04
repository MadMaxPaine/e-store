import React, { useState } from 'react';
import { CreateBrand } from '../components/modals/CreateBrand';
import { CreateDevice } from '../components/modals/CreateDevice';
import { CreateType } from '../components/modals/CreateType';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { DeleteBrand } from '../components/modals/DeleteBrand';
import { DeleteType } from '../components/modals/DeleteType';
import { DeleteDevice } from '../components/modals/DeleteDevice';

const Admin = () => {
 const [brandVisible, setBrandVisible] = useState(false);
 const [typeVisible, setTypeVisible] = useState(false);
 const [deviceVisible, setDeviceVisible] = useState(false);
 const [brandDeleteVisible, setBrandDeleteVisible] = useState(false);
 const [typeDeleteVisible, setTypeDeleteVisible] = useState(false);
 const [deviceDeleteVisible, setDeviceDeleteVisible] = useState(false);
 return (
  <Stack spacing={2} direction="column" sx={{ display: "flex", alignItems: "center", justifyContent: "center", maxWidth: "100%", mt: 1 }}>
    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
   <Button variant="contained" onClick={() => setTypeVisible(true)}>Add Type</Button>
   <Button variant="contained" onClick={() => setTypeDeleteVisible(true)}>Delete Type</Button>
   </Stack>
   <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
   <Button variant="contained" onClick={() => setBrandVisible(true)}>Add Brand</Button>
   <Button variant="contained" onClick={() => setBrandDeleteVisible(true)}>Delete Brand</Button>
   </Stack>
   <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
   <Button variant="contained" onClick={() => setDeviceVisible(true)}>Add Device</Button>   
   <Button variant="contained" onClick={() => setDeviceDeleteVisible(true)}>Delete Device</Button>
   </Stack>
   <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
   <DeleteBrand show={brandDeleteVisible} onHide={() => setBrandDeleteVisible(false)} />
   <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
   <DeleteType show={typeDeleteVisible} onHide={() => setTypeDeleteVisible(false)} />
   <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
   <DeleteDevice show={deviceDeleteVisible} onHide={() => setDeviceDeleteVisible(false)} />
  </Stack>
 );
}
export default Admin;