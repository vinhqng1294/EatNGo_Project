import request from './request';
import { LOGIN_URL, REGISTER_URL } from './api_constants';

function doLogin(phoneNumber, facebookId) {
  const data = {
    phoneNumber,
    facebookId,
  };
  return request({ url: LOGIN_URL, method: 'POST', data });
}

function doRegister(phoneNumber, email, name, facebookId) {
  const data = {
    phoneNumber,
    email,
    name,
    facebookId
  };
  return request({ url: REGISTER_URL, method: 'POST', data });
}

export default {
  doLogin,
  doRegister,
};
