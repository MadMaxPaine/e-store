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
      // Покращено: логи помилок з більш детальною інформацією
      console.error('Login failed:', e.response?.data?.message || e.message);
    }
  }

  async registration(regData) {
    try {
      const res = await registration(regData);
      localStorage.setItem('token', res.data.accessToken);
      this.setIsAuth(true);
      this.setUser(res.data.userDto);
    } catch (e) {
      // Покращено: логи помилок з більш детальною інформацією
      console.error('Registration failed:', e.response?.data?.message || e.message);
    }
  }

  async logout() {
    try {
      await logout();
      localStorage.removeItem('token');
      this.setUser({});
      this.setIsAuth(false);
    } catch (e) {
      // Покращено: логи помилок з більш детальною інформацією
      console.error('Logout failed:', e.response?.data?.message || e.message);
    }
  }

  async checkAuth() {
    if (this._isLoading) return;
    this.setLoading(true);
    try {    
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/refresh`, { withCredentials: true }); 
      // Збереження токенів та інформації користувача
      localStorage.setItem('token', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken); // Зберігаємо refreshToken, якщо потрібно
  
      // Оновлення стану користувача
      this.setIsAuth(true);
      this.setUser(res.data.userDto); 
     
    } catch (e) {
      console.error('Authentication check failed:', e.response?.data?.message || e.message);
    } finally {
      this.setLoading(false);
    }
  }
  
}