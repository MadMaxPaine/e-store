import React, { useState, useContext } from 'react';
import { ctx } from '../index';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const Registration =observer(()=>{
 const { user } = useContext(ctx);
 const history = useHistory();
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const registrate = async() => {
  try {
   await user.registration(email, password);
   history.push(SHOP_ROUTE);
  } catch(error) {
   alert(error);
  }
 };
return(
 <Container
   className="d-flex justify-content-center align-items-center"
   style={{ height: window.innerHeight - 54 }}
  >
   <div>
    <Card style={{ width: 600 }} className="p-5">
     <h2 className="m-auto">Registration</h2>
     <Form className="d-flex flex-column">
      <Form.Control
       className="mt-3"
       placeholder="Enter you're email address..."
       value={email}
       onChange={e => setEmail(e.target.value)}
      />
      <Form.Control
       className="mt-3"
       placeholder="Enter you're password..."
       value={password}
       onChange={e => setPassword(e.target.value)}
       type="password"
      />
      <Row className="d-flex justify-content-between mt-3 pl-3 pr-3" >       
        <div>
         Has account? <NavLink to={LOGIN_ROUTE}>Enter here...</NavLink>
        </div>       
      </Row>
      <Button onClick={registrate} className="align-self-end">Create account</Button>
     </Form>
    </Card>
   </div>
  </Container>
);
});
export default Registration;