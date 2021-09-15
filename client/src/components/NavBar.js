import React, { useContext } from 'react';
import { ctx } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
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
    <Navbar bg="primary" variant="primary" >
      <Container>
        <Nav.Link className="text-white" onClick={() => history.push(SHOP_ROUTE)}>E-store</Nav.Link>
        {
          user.isAuth ?
            <Dropdown align="end" className="al-auto border rounded" style={{ padding: "1px" }}>
              <Button size="sm" variant="primary" onClick={() => logOut()} style={{ borderRight: "1px solid white" }}>Log out</Button>
              <Dropdown.Toggle size="sm" variant="primary" style={{ marginLeft: "1px" }}/>
              <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => history.push(SHOP_ROUTE)}>Store</Dropdown.Item>
                <Dropdown.Item onClick={() => history.push(ADMIN_ROUTE)}>Admin panel</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> :
            <Button size="sm" variant="primary" className="al-auto border rounded" onClick={() => history.push(LOGIN_ROUTE)} >Sing in</Button>
        }
      </Container>
    </Navbar>
  );
});
export default NavBar;