import request from './request';
import { FOOD_URL } from './api_constants';
function getFood(id = null, headers = null) {
    let params = {};
    if (id != null) {
        params = {
            id,
        };
        return {
            status: 200,
            id: 2,
            data: {
                quantity: 1,
                name: 'Banh Trang tron',
                price: 13,
                imgURL: require('../Assets/resA.jpg'),
                description: 'No Ice Added! Includes Strawberry, Blueberry, Banana, Pineapple (comes with Basil Seed Pudding and Flaxseed as topping).',
                extraOptions: [
                    {
                        isCompulsory: true,
                        categoryName: 'Size',
                        items: [
                            {
                                name: 'Small',
                                price: 1.95,
                                isChecked: false,
                            },
                            {
                                name: 'Medium',
                                price: 1.95,
                                isChecked: false,
                            }
                        ]
                    },
                    {
                        categoryName: 'Toppings',
                        isCompulsory: false,
                        items: [
                            {
                                name: 'Topping 1',
                                price: 3,
                                isChecked: false,
                            },
                            {
                                name: 'Topping 2',
                                price: 4,
                                isChecked: false,
                            }
                        ]
                    }

                ]
            }
        }
    }
    // return request({
    //   url: RESTAURANT_URL, method: 'GET', params, headers,
    // });
}

function getStoreFood(id = null, headers = null) {
    let params = {};
    if (id != null) {
        params = {
            id,
        };
    }
    return request({
        url: FOOD_URL, method: 'GET', params, headers,
    });
}

export default {
    getFood,
    getStoreFood
};
