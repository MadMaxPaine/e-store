import React, { useContext, useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { ctx } from '../../index';
import { observer } from 'mobx-react-lite';


export const CreateDevice = observer(({ show, onHide }) => {
 const { device } = useContext(ctx);
 const [brand, setBrand] = React.useState('');
 const [type, setType] = React.useState('');
 const [name, setName] = useState('');
 const [price, setPrice] = useState(0);
 const [file, setFile] = useState(null);
 const [info, setInfo] = useState([]);

 useEffect(() => {
  fetchTypes().then(data => device.setTypes(data));
  fetchBrands().then(data => device.setBrands(data));
 }, [device]);

 const addInfo = () => {
  setInfo([...info, { title: '', description: '', number: Date.now() }]);
 }
 const changeInfo = (key, value, number) => {
  setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i));
 }
 const removeInfo = (number) => {
  setInfo(info.filter(i => i.number !== number));
 }

 const selectFile = (e) => {
  setFile(e.target.files[0]);
 }

 const addDevice = () => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', `${price}`);
  formData.append('image', file);
  formData.append('brandId', device.selectedBrand.id);
  formData.append('typeId', device.selectedType.id);
  formData.append('info', JSON.stringify(info));
  createDevice(formData).then(data => onHide());
 }

 const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  maxWidth: "100%",
  p: 2,
 };

 return (
  <Modal
   aria-labelledby="transition-modal-title"
   aria-describedby="transition-modal-description"
   open={show}
   onClose={onHide}
   closeAfterTransition
   BackdropComponent={Backdrop}
   BackdropProps={{
    timeout: 500,
   }}
  >
   <Fade in={show}>
    <Box sx={style} component="form" >
     <Typography id="transition-modal-title" variant="h6" component="h2">
      Adding Device
     </Typography>
     <Divider orientation="horizontal"></Divider>
     <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
      <InputLabel id="file-simple-select">Select device type and brand</InputLabel>
     </Box>
     <Stack direction="column" sx={{ display: "flex", mt: 1, itemsAlign: "center", justifyContent: "center" }}>
      <Box item >
       <InputLabel id="brand-simple-select" align="center">Brand</InputLabel>
       <Select
        fullWidth
        labelId="brand-simple-select"
        id="brand-simple-select"
        variant="standard"
        label="Brands"
        value={brand}
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        onChange={(e) => setBrand(e.target.value)}
       >
        {
         device.brands.map(brand => <MenuItem value={brand.name} key={brand.id} onClick={() => device.setSelectedBrand(brand)}>
          {brand.name}
         </MenuItem>)
        }
       </Select>
      </Box>
      <Box item>
       <InputLabel id="type-simple-select" align="center">Type</InputLabel>
       <Select
        fullWidth
        labelId="type-simple-select"
        id="type-simple-select"
        variant="standard"
        label="Types"
        value={type}
        sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
        onChange={(e) => setType(e.target.value)}
       >
        {
         device.types.map(type => <MenuItem value={type.name} key={type.id} onClick={() => device.setSelectedType(type)}>
          {type.name}
         </MenuItem>)
        }
       </Select>
      </Box>
     </Stack>
     <Divider orientation="horizontal" sx={{ mt: 1 }} ></Divider>
     <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
      <InputLabel id="file-simple-select">Enter device name and price</InputLabel>
     </Box>
     <Box item direction="column" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center" }}>
      <TextField
       sx={{ mt: 1 }}
       size="small"
       helperText="Please enter device name"
       id="deviceName"
       value={name}
       onChange={(e) => setName(e.target.value)}
       placeholder={""}
       label="Device name"
      />
      <TextField
       sx={{ mt: 1 }}
       size="small"
       helperText="Please enter device price"
       id="devicePrice"
       value={price}
       onChange={(e) => setPrice(e.target.value)}
       label="Device price"
      />
     </Box>
     <Divider orientation="horizontal" ></Divider>
     <Stack direction="column" sx={{ display: "flex", m: 1, itemsAlign: "center", justifyContent: "center" }}>
      <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center" }}>
       <InputLabel id="file-simple-select">Select product image</InputLabel>
      </Box>
      <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center" }}>
       <Button variant="contained" component="label">
        Upload<input hidden accept="image/*" multiple type="file" onChange={selectFile} />
       </Button>
      </Box>
     </Stack>
     <Divider orientation="horizontal" ></Divider>
     <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
      <InputLabel id="file-simple-select">Add device qualities</InputLabel>
     </Box>
     <Box container>
      <Button variant="contained" sx={{ m: 1 }} onClick={addInfo}>Add info</Button>
      {
       info.map(i =>
        <Box
         container
         direction="row"
         sx={{ display: "flex", itemsAlign: "center", justifyContent: "center" }}
         key={i.number}
         md={12}
        >
         <Box sx={{ display: "inline-flex", m: 1, spaicing: 1 }}>
          <Box item direction="column" md={4} p={1}>
           <TextField
            variant="standard"
            size="small"
            id="title"
            value={i.title}
            onChange={(e) => changeInfo('title', e.target.value, i.number)}
            placeholder={"name"}
           />
          </Box>
          <Box item direction="column" md={4} p={1}>
           <TextField
            variant="standard"
            size="small"
            id="description"
            value={i.description}
            onChange={(e) => changeInfo('description', e.target.value, i.number)}
            placeholder={"property"}
           />
          </Box>
          <Box item direction="column" md={4} p={1}>
           <Button variant="contained" onClick={() => removeInfo(i.number)}>Remove</Button>
          </Box>
         </Box>
        </Box>
       )
      }
     </Box>
     <Box
      container
      sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button variant="contained" sx={{ mr: 1 }} onClick={onHide}>Close</Button>
      <Button variant="contained" sx={{ mr: 1 }} onClick={addDevice}>Add</Button>
     </Box>
    </Box>
   </Fade>
  </Modal>
 )
})
