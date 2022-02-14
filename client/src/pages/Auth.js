import React from 'react';
import Login from './Login';
import Registration from './Registration';
import { useLocation} from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
const Auth = observer(() => {
 const location = useLocation();
 const isLogin = location.pathname === LOGIN_ROUTE;
 return (
  <div>{isLogin?<Login/>:<Registration/>}</div>
 )
});
export default Auth;