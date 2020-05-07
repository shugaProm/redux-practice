import { createStore, applyMiddleware } from "redux";

// loggger middleware logs the state to the console
import logger from "redux-logger";

// thunk middleware
import thunk from "redux-thunk";

const initialState = {
  loading: false,
  loaded: false,
  post: [],
  error: null,
};

const middleware = applyMiddleware(thunk, logger);

/* ReducerUser
 * It takes a state and an action and returns a new state for the store.
 * @param state
 * @param action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING": {
      state = { ...state, loading: true };
      break;
    }
    case "LOADED": {
      state = { ...state, loaded: true, loading: false, posts: action.payload };
      break;
    }
    case "ERROR": {
      state = { ...state, loading: false, error: action.payload };
      break;
    }
  }
  return state;
};

/* Create store using the reducer function added above
 * and pass an initial state.
 */
const store = createStore(reducer, middleware);

/* Action Creator:
 * Lets dispatch an action.
 * Multiple synchronous actions
 * Instead of passing an object containing type and payload as store.dispatch parameter, we can pass a multiple dispatch functions */
const getPostData = dispatch => {
  // first action dispatch
  dispatch({
    type: "LOADING",
  });
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json()) // onFulfilled
    .then(jsonData => {
      // second action dispatch
      dispatch({ type: "LOADED", payload: jsonData });
    })
    .catch(err => {
      // third action dispatch
      dispatch({ type: "ERROR", payload: err });
    });
};

/* Dispatch actions.
 * When the below actions are dispatched store.subscribe will call the method inside of it, for each dispatched action
 */
store.dispatch(getPostData);
