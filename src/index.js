import { createStore } from "redux";

/*/**
 * Create a reducer function.
 * the reducer checks the type of action and based on it, it creates and returns the state to the store
 * It takes a state and an action and returns a new state for the store.
 * @param state
 * @param action
 */

const reducer = (state = " Ezeike", action) => {
  if (action.type === "USER_NAME") {
    return action.payload + state;
  }
  if (action.type === "USER_AGE") {
    return action.payload + state;
  }
  return state;
};

/** createStore takes 3 parameters(reducer, initialState/preLoadedState, applyMiddleware/enhancers) */
const store = createStore(reducer);

/**
 * Listen to the store using subscribe
 * When Anything changes to the store, the function inside of it will be called.
 * store.getState() return the current state value.
 */
store.subscribe(() => {
  console.log("My Store has changed: ", store.getState());
});

/* dispatch actions to the reducer which checks what type it is and responds accordingly to update
 *  the state and upldates the store with the new state; hence the view*/

// an action creator function that creates and return an action: needed when u need to dispatch action multiple times
function getUsername() {
  return {
    type: "USER_NAME",
    payload: "Promise",
  };
}
// dispatch an action, When the below action is dispatched store.subscribe will call the method inside of it.
store.dispatch(getUsername());

// dispatch an action without an action creator
store.dispatch({
  type: "USER_AGE",
  payload: "25",
});
