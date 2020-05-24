
let initialState = {
    loggedIn: false,
    currentUser: null
}

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const LOG_IN = 'LOG_IN';

export function logIn(){
    return {
      type: LOG_IN
    }
}

export function logOut(){
    return {
      type: LOG_OUT
    }
}

export function setUser(user) {
    return {
      type: SET_USER,
      payload: user
    };
}


export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return Object.assign({}, state, {
        loggedIn: true,
        currentUser: action.currentUser
      });
    case LOG_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null
      });
    case SET_USER:
        return Object.assign({}, state, {
            currentUser: action.payload
        })
    default:
      return state;
  }
};