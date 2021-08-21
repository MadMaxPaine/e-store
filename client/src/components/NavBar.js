import React, { useContext } from 'react';
import { ctx } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';

const NavBar = observer(() => {
  const { user } = useContext(ctx);
  const history = useHistory();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  }
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Nav.Link className="text-white" href={SHOP_ROUTE}>E-store</Nav.Link>
        {
          user.isAuth ?
            <Nav className="al-auto" >
              <Button onClick={() => history.push(ADMIN_ROUTE)}>Admin</Button>
              <Button onClick={() => logOut()} style={{ "marginLeft": "10px" }}>Exit</Button>
            </Nav> :
            <Nav className="al-auto">
              <Button onClick={() => history.push(LOGIN_ROUTE)}>Authorization</Button>
            </Nav>
        }
      </Container>
    </Navbar>
  );
});
export default NavBar;