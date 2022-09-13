import React, { useState, useContext } from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "../styles/cropper-avatar-shaper.css";
import { ctx } from '../index';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const Registration = observer(() => {
 const { user } = useContext(ctx);
 const history = useHistory();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [passwordConfirm, setPasswordConfirm] = useState('');
 const [firstName, setFirstName] = useState('');
 const [lastName, setLastName] = useState('');
 const [phone, setPhone] = useState('');
 const [gender, setGender] = useState('');
 const [step, setStep] = useState(1);
 const [open, setOpen] = React.useState(false);
 const [cropData, setCropData] = useState(null);
 const [cropper, setCropper] = useState(null);
 const onChange = (e) => {
  e.preventDefault();
  let files;
  if (e.dataTransfer) {
   files = e.dataTransfer.files;
  } else if (e.target) {
   files = e.target.files;
  }
  const reader = new FileReader();
  reader.onload = () => {
   setCropData(reader.result);
  };
  reader.readAsDataURL(files[0]);
 };
 const getCropData = () => {
  if (typeof cropper !== "undefined") {
   setCropData(cropper.getCroppedCanvas({ width: 150, height: 150 }).toDataURL("image/png"));
  }
  setOpen(false);
 };
 const handleOpen = () => {
  setOpen(true);
 };

 const handleClose = () => {
  setCropData(null);
  setOpen(false);
 };
 function goNextStep() {
  setStep((step) => (+step < 4) ? step + 1 : 1);
 }
 function goPrevStep() {
  setStep((step) => (+step > 1) ? step - 1 : 1);
 }
 const registrate = () => {
  try {
   let regData = new FormData();
   regData.append('email', email);
   regData.append('password', password);
   regData.append('firstName', firstName);
   regData.append('lastName', lastName);
   regData.append('phone', phone);
   regData.append('gender', gender);
   regData.append('avatar', cropData);
   user.registration(regData).then(regData => {
    history.push(SHOP_ROUTE);
   });
  } catch (error) {
   alert(error);
  }
 };
 const steps = [
  'Personal information',
  'Security data',
  'Create an account',
 ];
 return (
  <Box
   container
   sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: window.innerHeight - 54, maxWidth: "100%" }}
  >
   <Card sx={{ p: 2 }}>
    <CardContent>
     <Typography variant="h4" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }} component="h2" gutterBottom>
      Registration
     </Typography>
     <Divider orientation="horizontal" sx={{ mt: 1 }} ></Divider>
     {step === 1 && <>
      <Stack direction="column" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
       <Box item >
        <TextField
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're name"
         id="userName"
         value={firstName}
         onChange={e => setFirstName(e.target.value)}
         placeholder={"Name"}
         label="Name"
        />
        <TextField
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're lastname"
         id="userLastName"
         value={lastName}
         onChange={e => setLastName(e.target.value)}
         placeholder={"Lastname"}
         label="Lastname"
        />
       </Box>
       <Box item >
        <TextField
         fullWidth
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're e-mail"
         id="deviceName"
         value={email}
         onChange={e => setEmail(e.target.value)}
         placeholder={"Enter you're email address..."}
         label="E-mail"
        />
       </Box>
       <Box item >
        <TextField
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're gender"
         id="gender"
         value={gender}
         onChange={e => setGender(e.target.value)}
         placeholder={"Gender"}
         label="Gender"
        />
       </Box>
       <Box item >
        <TextField
         fullWidth
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're phone number"
         id="phone"
         value={phone}
         onChange={e => setPhone(e.target.value)}
         placeholder={"Enter you're phone number..."}
         label="Phone"
        />
       </Box>
      </Stack>
     </>}
     {step === 2 && <>
      <Stack direction="column" sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
       <Box item >
        <TextField
         fullWidth
         sx={{ mt: 1 }}
         size="small"
         helperText="Please enter you're password"
         id="password"
         value={password}
         onChange={e => setPassword(e.target.value)}
         type={"password"}
         label="Password"
         placeholder={"Enter you're password..."}
        />
       </Box>
       <Box item >
        <TextField
         fullWidth
         sx={{ mt: 1 }}
         size="small"
         helperText="Please confirm you're password"
         id="confirmPassword"
         value={passwordConfirm}
         onChange={e => setPasswordConfirm(e.target.value)}
         type={"password"}
         label="Confirm password"
         placeholder={"Enter you're password again..."}
        />
       </Box>
      </Stack>
     </>
     }
     {step === 3 && <>
      <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}>
       <InputLabel id="file-simple-select">Select you're avatar-image:</InputLabel>
      </Box>
      <Box item sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", m: 1 }}>
       <Button variant="contained" component="label" onClick={handleOpen}>
        Select
       </Button>
      </Box>
      {cropData !== null && open === false &&
       <Box
        item
        sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", m: 1 }}
       ><Avatar alt="cropped" src={cropData} sx={{ width: 150, height: 150 }} />
       </Box>
      }
      <Dialog
       fullWidth
       open={open}
       onClose={handleClose}
       aria-labelledby="alert-dialog-title"
       aria-describedby="alert-dialog-description"
      >
       <DialogTitle id="alert-dialog-title">
        {"Please edit you're future look:"}
       </DialogTitle>
       <DialogContent>
        <Grid
         container
         direction="column"
         alignItems="center"
         sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", mt: 1 }}
        >
         <Box
          item
         >
          <Button variant="contained" component="label">
           Upload<input hidden accept="image/*" multiple type="file" onChange={onChange} />
          </Button>
         </Box>
         <Box
          item
          sx={{ mt: 1 }}
         >
          <Cropper
           zoomable={true}
           scalable={true}
           aspectRatio={1}
           initialAspectRatio={1}
           preview=""
           src={cropData}
           viewMode={1}
           minCropBoxHeight={"100"}
           minCropBoxWidth={"100"}
           background={false}
           responsive={false}
           autoCropArea={0}
           dragMode="crop"
           checkOrientation={false}
           onInitialized={(instance) => {
            setCropper(instance);
           }}
           guides={true}
          />
         </Box>
        </Grid>
       </DialogContent>
       <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={getCropData} autoFocus>
         Accept
        </Button>
       </DialogActions>
      </Dialog>
     </>}
     <Divider orientation="horizontal" ></Divider>
     <Box sx={{ display: "flex", itemsAlign: "center", justifyContent: "center", width: '100%', mt: 1 }}>
      <Stepper activeStep={step - 1} alternativeLabel>
       {steps.map((label) => (
        <Step key={label}>
         <StepLabel>{label}</StepLabel>
        </Step>
       ))}
      </Stepper>
     </Box>
    </CardContent>
    <CardActions sx={{ justifyContent: "flex-end" }}>
     {step !== 3 && <>
      {step !== 1 && <>
       <Button variant="contained" sx={{ justifyContent: "flex-end" }} onClick={goPrevStep}>Prev</Button>
      </>
      }
      <Button variant="contained" sx={{ justifyContent: "flex-end" }} onClick={goNextStep}>Next</Button>
     </>}
     {step === 3 && <>
      <Button variant="contained" sx={{ justifyContent: "flex-end" }} onClick={goPrevStep}>Prev</Button>
      <Button variant="contained" sx={{ itemsAlign: "center", justifyContent: "center" }} onClick={registrate}>Create account</Button>
     </>}
    </CardActions>
   </Card>
  </Box>
 );
});
export default Registration;