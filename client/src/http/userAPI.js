import jwtDecode from 'jwt-decode';
import { $host, $authhost } from './index';

export const registration = async (email, password) => {
 const { data } = await $host.post('api/user/registration', { email, password, role: 'ADMIN' });
 localStorage.setItem('token', data.token);
 return jwtDecode(data.token);
}

export const login = async (email, password) => {
 const { data } = await $host.post('api/user/login', { email, password });
 localStorage.setItem('token', data.token);
 return jwtDecode(data.token);
}

export const check = async () => {
 const { data } = await $authhost.get('api/user/auth');
 localStorage.setItem('token', data.token);
 return jwtDecode(data.token);
}