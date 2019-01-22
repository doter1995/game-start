import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

let store = createStore(counter, applyMiddleware(thunk));

export default store;
