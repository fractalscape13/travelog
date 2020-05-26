let initialState = {
    loggedIn: false,
    currentUser: null,
    currentId: null
}

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";

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
    case LOG_OUT:
      return Object.assign({}, state, {
        loggedIn: false,
        currentUser: null,
        currentId: null
      });
    case SET_USER:
        return Object.assign({}, state, {
            loggedIn: action.payload.loggedIn,
            currentUser: action.payload.currentUser,
            currentId: action.payload.currentId
        })
    default:
      return state;
  }
};