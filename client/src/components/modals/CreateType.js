import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { createType } from '../../http/deviceAPI';
import { Grid } from '@mui/material';
const style = {
 position: 'absolute',
 top: '50%',
 left: '50%',
 transform: 'translate(-50%, -50%)',
 bgcolor: 'background.paper',
 boxShadow: 24,
 p: 2,
 maxWidth: "100%"
};
export const CreateType = ({ show, onHide }) => {
 const [value, setValue] = useState('');
 const addType = () => {
  createType({ name: value }).then(data => setValue(''));
  onHide();
 }
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
      Adding Type
     </Typography>
     <Divider orientation="horizontal"></Divider>
     <TextField
      sx={{ mt: 2 }}
      size="small"
      helperText="Please enter type name"
      id="typeAdd"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder={"Enter name of Type"}
      label="Type"
     />
     <Divider orientation="horizontal" ></Divider>
     <Grid
      container
      sx={{ mt: 2, display: "flex", alignItems: "center", justifyContent: "center" }}
     >
      <Button variant="contained" sx={{ mr: 1 }} onClick={onHide}>Close</Button>
      <Button variant="contained" sx={{ mr: 1 }} onClick={addType} disabled={!value}>Add</Button>
     </Grid>
    </Box>
   </Fade>
  </Modal>
 )
}
