import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { NavLink, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
const Auth = () => {
 const location = useLocation();
 const isLogin = location.pathname === LOGIN_ROUTE;

 return (
  <Container
   className="d-flex justify-content-center align-items-center"
   style={{ height: window.innerHeight - 54 }}
  >
   <div>
    <Card style={{ width: 600 }} className="p-5">
     <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
     <Form className="d-flex flex-column">
      <Form.Control
       className="mt-3"
       placeholder="Enter you're email address..."
      />
      <Form.Control
       className="mt-3"
       placeholder="Enter you're password..."
      />
      <Row className="d-flex justify-content-between mt-3 pl-3 pr-3" >
       {isLogin ?
        <div>
         Do not have account yet? <NavLink to={REGISTRATION_ROUTE}>Register here...</NavLink>
        </div>
        :
        <div>
         Has account? <NavLink to={LOGIN_ROUTE}>Enter here...</NavLink>
        </div>
       }      
      </Row>
      <Button className="align-self-end">{isLogin ? 'Enter' : 'Create account'}</Button>
     </Form>
    </Card>
   </div>
  </Container>

 );
}
export default Auth;