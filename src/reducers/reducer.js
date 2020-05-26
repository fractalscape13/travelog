let initialState = {
    loggedIn: false,
    currentUser: null,
    currentId: null,
    fileNamePathCover: 'tulum.png',
    fileNamePathProfile: 'scroll.png'
}

const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const FILE_NAME_PATH_COVER = "FILE_NAME_PATH_COVER"
const FILE_NAME_PATH_PROFILE = "FILE_NAME_PATH_PROFILE"

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
export function filePathCover(filePath) {
    return {
      type: FILE_NAME_PATH_COVER,
      payload: filePath
    };
}
export function filePathProfile(filePath) {
    return {
      type: FILE_NAME_PATH_PROFILE,
      payload: filePath
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
            currentId: action.payload.currentId,
            fileNamePathCover: action.payload.fileNamePathCover,
            fileNamePathProfile: action.payload.fileNamePathProfile
        })
    case FILE_NAME_PATH_COVER:
        return Object.assign({}, state, {
            fileNamePathCover: action.payload
        })
    case FILE_NAME_PATH_PROFILE:
        return Object.assign({}, state, {
            fileNamePathProfile: action.payload
        })
    default:
      return state;
  }
};