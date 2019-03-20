import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';


const cartItemsSelector = state => state.cartReducer.cart || [];

function* cartItemsAdd(action) {
  try {
    const { payload } = action
    const currentCart = yield select(cartItemsSelector);
    const duplicateItemIndex = currentCart.findIndex(item => item.id === payload.data.id)
    if (duplicateItemIndex !== -1) {
      currentCart[duplicateItemIndex].quantity += payload.data.quantity

    } else {
      const attributes = [...payload.data.attributes]
      attributes.map(attr => {
        attr.options = attr.options.filter(item => item.isChecked)
        return attr
      })
      currentCart.push({ ...payload.data, attributes: attributes })
    }
    yield put({ type: 'SAVE_NEW_CART', payload: currentCart });
  } catch (e) {
    console.log(e);
  }
}

function* getCart(action) {
  try {
    const currentCart = yield select(cartItemsSelector);
    yield put({ type: 'SAVE_NEW_CART', payload: currentCart });
  } catch (e) {
    console.log(e);
  }
}
function* deleteCartItem(action) {
  try {
    const { payload } = action
    let currentCart = yield select(cartItemsSelector);
    const newCart = currentCart.filter(item => item.id !== payload.id)
    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}
function* cartItemsClean(action) {
  try {
    const newCart = [];
    yield put({ type: 'SAVE_NEW_CART', payload: newCart });
  } catch (e) {
    console.log(e);
  }
}

function* cartSaga() {
  yield takeLatest('UPDATE_CART_ITEMS', cartItemsAdd);
  yield takeLatest('DELETE_CART_ITEM', deleteCartItem);
  yield takeLatest('FETCH_CART_ITEMS', getCart);
  yield takeLatest('CLEAN_CART_ITEMS', cartItemsClean);
}
export default cartSaga