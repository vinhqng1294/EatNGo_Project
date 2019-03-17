import request from './request';
import { LOGIN_URL, REGISTER_URL } from './api_constants';

function doLogin(phone, authId) {
  const data = {
    phone,
    id: authId,
  };
  return request({ url: LOGIN_URL, method: 'POST', data });
}

function doRegister(phoneNumber, authId, email, name) {
  const data = {
    phoneNumber,
    email,
    name,
    authId
  };
  return request({ url: REGISTER_URL, method: 'POST', data });
}

export default {
  doLogin,
  doRegister,
};
