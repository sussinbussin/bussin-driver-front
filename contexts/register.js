import { createContext } from "react";

const initialState = {};

const initState = () => initialState;

const RegisterContext = createContext(initialState);

export { RegisterContext, initState, initialState };
