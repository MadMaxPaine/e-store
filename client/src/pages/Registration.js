import React, { useState, useContext } from 'react';
import { ctx } from '../index';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
 const [avatar, setAvatar] = useState(null);
 const [gender, setGender] = useState('');
 const [step, setStep] = useState(1);
 function goNextStep() {
  setStep((step) => (+step < 5) ? step + 1 : 1);
 }
 function goPrevStep() {
  setStep((step) => (+step > 1) ? step - 1 : 1);
 }
 const registrate = () => {
  try {
   let regData = new FormData()
   regData.append('email', email);
   regData.append('password', password);
   regData.append('firstName', firstName);
   regData.append('lastName', lastName);
   regData.append('phone', phone);
   regData.append('gender', gender);
   regData.append('avatar', avatar)
   user.registration(regData).then(regData => {
    console.log(regData);
    history.push(SHOP_ROUTE);
   });   
  } catch (error) {
 alert(error);
}
 };
const selectAvatar = (e) => {
 setAvatar(e.target.files[0]);
}
return (
 <div>
  <Container
   className="d-flex justify-content-center align-items-center "
   style={{ height: window.innerHeight - 54 }}  >
   <Card style={{ width: 600 }} className="p-5">
    <h2 className="m-auto">Registration</h2>
    <Form className="d-flex flex-column">
     <div>
      {step === 1 && <>
       <div className="d-flex flex-row">
        <div className="d-flex flex-column">
         <Form.Label className="mt-3">Name:</Form.Label>
         <Form.Control
          style={{ marginRight: "5px" }}
          placeholder="Enter you're Name..."
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
         />
        </div>
        <div className="d-flex flex-column">
         <Form.Label style={{ marginLeft: "5px" }} className="mt-3">Surname:</Form.Label>
         <Form.Control
          style={{ marginLeft: "5px" }}
          placeholder="Enter you're Last name..."
          value={lastName}
          onChange={e => setLastName(e.target.value)}
         />
        </div>
       </div>
       <Form.Label className="mt-3">E-mail:</Form.Label>
       <Form.Control
        placeholder="Enter you're email address..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
       />
      </>
      }
      {step === 2 && <>
       <Form.Label className="mt-3">Password:</Form.Label>
       <Form.Control
        placeholder="Enter you're password..."
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password" />
       <Form.Control
        className="mt-3"
        placeholder="Confirm you're password..."
        value={passwordConfirm}
        onChange={e => setPasswordConfirm(e.target.value)}
        type="password"
       />
      </>
      }
      {step === 3 && <>
       <Form.Label className="mt-3">Gender:</Form.Label>
       <Form.Control
        className="mt-0"
        placeholder="Enter you're gender..."
        value={gender}
        onChange={e => setGender(e.target.value)}
        type="password" />
       <Form.Label className="mt-3">Phone:</Form.Label>
       <Form.Control
        className="mt-0"
        placeholder="Enter youre phone number..."
        value={phone}
        onChange={e => setPhone(e.target.value)}
        type="password"
       />
      </>
      }
      {step !== 4 && <>
       <Button className="mt-1" style={{ marginLeft: "5px" }} onClick={goPrevStep}>Prev</Button>
       <Button className="mt-1" style={{ marginLeft: "5px" }} onClick={goNextStep}>Next</Button>
      </>}
      {step === 4 && <>
       <div className="d-flex flex-column">
        <Form.Label className="mt-3">Avatar:</Form.Label>
        <Form.Control
         type="file"
         onChange={selectAvatar}
        />
        <Button onClick={registrate} className="align-self-end">Create account</Button>
       </div>
      </>}
     </div>
    </Form>
   </Card>
  </Container>
 </div>

);
});
export default Registration;