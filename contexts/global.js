import { createContext } from "react";

const flags = {
  login: true,
  requireLogin: false,
  register: true,
  profile: true,
  editProfile: true,
  registerName: true,
  scheduledRides: true,
};

const initialState = {
  biometrics: true,
  flags: {
    ...flags,
  },
  stage: {
    level: "CHOOSING_DESTINATION",
    display: "search",
    locationSearch: {
      text: "Where to?",
    },
  },
  dest: {
    item: null,
    geo: null,
  },
  start: {
    item: null,
    geo: null,
  },
  token: null,
  driver: null,
  tracker: null
};
const initState = () => initialState;
const globalReducer = (state, action) => {
  switch (action.type) {
    case "MODIFY_STAGE":
      return {
        ...state,
        stage: { ...action.payload },
      };
    case "SET_DESTINATION":
      return {
        ...state,
        dest: { ...action.payload },
      };
    case "SET_START":
      return {
        ...state,
        start: { ...action.payload },
      };
      case "SET_DRIVER":
      return {
        ...state,
        driver: action.payload,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_TRACK":
    return {
        ...state, 
        tracker: action.payload,
      }
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };
