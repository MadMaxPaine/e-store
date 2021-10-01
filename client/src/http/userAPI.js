import { $host, $authhost } from './index';

export const login = async function (email, password) {
 return $authhost.post('api/user/login', { email, password });

}
export const registration = async function (email, password) {
 return $host.post('api/user/registration', { email, password });
}

export const logout = async function () {
 return $authhost.post('api/user/logout');

}
