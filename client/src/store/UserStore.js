import { makeAutoObservable } from 'mobx';
import axios from 'axios';
const { login, registration, logout } = require('../http/userAPI');
export default class UserStore {
 constructor() {
  this._isAuth = false;
  this._user = {};
  this._isLoading = false;
  makeAutoObservable(this);
 }
 setIsAuth(bool) {
  this._isAuth = bool;
 }
 setUser(objUser) {
  this._user = objUser;
 }
 setLoading(bool) {
  this._isLoading = bool;
 }
 get isAuth() {
  return this._isAuth;
 }
 get User() {
  return this._user;
 }
 get isLoading() {
  return this._isLoading;
 }
 async login(email, password) {
  try {
   const res = await login(email, password);
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.userDto);
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }

 async registration(regData) {
  try {
   const res = await registration(regData);
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.userDto);
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }
 async logout() {
  try {
   await logout();
   localStorage.removeItem('token');
   this.setUser({});
   this.setIsAuth(false);
  } catch (e) {
   console.log(e.response?.data?.message);
  }
 }
 async checkAuth() {
  this.setLoading(true);
  try {
   const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, { withCredentials: true });
   localStorage.setItem('token', res.data.accessToken);
   this.setIsAuth(true);
   this.setUser(res.data.userDto);
  } catch (e) {
   console.log(e);
  }
  finally {
   this.setLoading(false);
  }
 }
}