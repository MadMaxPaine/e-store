import { makeAutoObservable } from 'mobx';
import axios from 'axios';
const { login, registration, logout } = require('../http/userAPI');

export default class UserStore {
 constructor() {
  this._isAuth = false;
  this._user = {};
  makeAutoObservable(this);
 }

 setIsAuth(bool) {
  this._isAuth = bool;
 }
 setUser(objUser) {
  this._user = objUser;
 }

 get isAuth() {
  return this._isAuth;
 }
 get User() {
  return this._user;
 }

 async login(email, password) {
  try {
   const res = await login(email, password);
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.user);
   console.log(res);
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }

 async registration(email, password) {
  try {
   const res = await registration(email, password);
   console.log(res);
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.user);
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }

 async logout() {
  try {
   await logout();
   localStorage.removeItem('token');
   this.setIsAuth(false);
   this.setUser({});
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }

 async checkAuth() {
  try {
   const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, { withCredentials: true });
   console.log(res);
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.user);
  } catch (e) {
   console.log(e);
  }
 }
}