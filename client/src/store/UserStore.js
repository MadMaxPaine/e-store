import { makeAutoObservable } from 'mobx';


export default class UserStore {
 constructor() {
  this._isAuth = false;
  this._user = {};
  makeAutoObservable(this);
 }

 setIsAuth(boolVal) {
  this._isAuth = boolVal;
 }
 setUser(objUser) {
  this._user = objUser;
 }

 get IsAuth() {
  return this._isAuth;
 }
 get User() {
  return this._user;
 }
}