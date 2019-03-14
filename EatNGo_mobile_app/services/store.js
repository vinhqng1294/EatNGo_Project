import request from './request';
import { RESTAURANT_FILTER_URL, RESTAURANT_URL } from './api_constants';

function getStore(id = null, headers = null) {
  let params = {};
  if (id != null) {
    params = {
      id,
    };
    return {
      status : 200,
      id: 2,
      data : [
        {
            type: 'Main Food',
            foods: [
                {
                    name: 'Banh Trang Tron',
                    img: '',
                    price: 13
                },
                {
                    name: 'Bun Bo Hue',
                    img: '',
                    price: 14,
                }
            ]
        },
        {
            type: 'Drinks',
            foods: [
                {
                    name: 'Banh Trang Tron',
                    img: '',
                    price: 33
                },
                {
                    name: 'Bun Bo Hue',
                    img: '',
                    price: 22,
                }
            ]
        }
    ]
    }
  }
  return {
    status: 200,
    id: null,
    data: [
      {
        name: 'Test',
        address: '13 Quang Trung St'
      },
      {
        name: 'Test 2',
        address: '14 Quang Trung St'
      }
    ]
  }
  // return request({
  //   url: RESTAURANT_URL, method: 'GET', params, headers,
  // });
}

function getRestaurantByType(type, headers = null) {
  return request({
    url: `${RESTAURANT_FILTER_URL}?type=${type}`, method: 'GET', headers,
  });
}

export default {
  getStore,
  getRestaurantByType,
};
