import { React, useContext } from 'react';
import { ctx } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';

const NavBar = observer(() => {
 const { user } = useContext(ctx);
 return (
  <Navbar bg="primary" variant="dark">
   <Container>
    <Nav.Link className="text-white" href={SHOP_ROUTE}>E-store</Nav.Link>
    {user._isAuth ?
     <Nav className="al-auto" >
      <Button >Admin Panel</Button>
      <Button style={{ "margin-left": "10px" }}>Exit</Button>
     </Nav> :
     <Nav className="al-auto">
      <Button onClick={() => user.setIsAuth(true)}>Authorization</Button>
     </Nav>
    }
   </Container>
  </Navbar>
 );
});
export default NavBar;