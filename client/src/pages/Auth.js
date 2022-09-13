import React from 'react';
import Login from './Login';
import Registration from './Registration';
import { useLocation } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
const Auth = () => {
 const location = useLocation();
 const isLogin = location.pathname === LOGIN_ROUTE;
 return (
  <>{isLogin ? <Login /> : <Registration />}</>
 )
};
export default Auth;