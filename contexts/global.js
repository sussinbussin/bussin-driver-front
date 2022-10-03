import { createContext } from "react";

const flags = {
  login: true,
  requireLogin: false,
  register: true,
};

const initialState = {
  flags: {
    ...flags,
  },
};
const initState = () => initialState;
const globalReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const GlobalContext = createContext(flags);

export { GlobalContext, globalReducer, initialState, initState };
