import request from './request';
import { STORE_URL } from './api_constants';

function getStore(id = null, headers = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
  }
  return request({
    url: STORE_URL, method: 'GET', params, headers,
  });
}



export default {
  getStore
};
