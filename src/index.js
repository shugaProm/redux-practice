import { createStore, combineReducers } from "redux";

const reducerUser = (state = {}, action) => {
  switch (action.type) {
    case "USER_NAME": {
      state = { ...state, name: action.payload };
      break;
    }
    case "USER_AGE": {
      state = { ...state, age: action.payload };
      break;
    }
    default:
      state = { ...state };
  }
  return state;
};

const reducerJobProfile = (state = {}, action) => {
  switch (action.type) {
    case "JOB_DETAIL": {
      state = { ...state, job: action.payload };
      break;
    }
    default:
      state = { ...state };
  }
  return state;
};

const reducers = combineReducers({
  userDetails: reducerUser,
  jobDetails: reducerJobProfile,
});

const store = createStore(reducers);

store.subscribe(() => {
  console.log("My store has Changed: ", store.getState());
});

function getUserName() {
  return {
    type: "USER_NAME",
    payload: Promise,
  };
}

function getUserAge() {
  return {
    type: "USER_AGE",
    payload: 25,
  };
}

function getJobDetail() {
  return {
    type: "JOB_DETAIL",
    payload: "Web Developer",
  };
}

store.dispatch(getUserName());
store.dispatch(getUserAge());
store.dispatch(getJobDetail());
