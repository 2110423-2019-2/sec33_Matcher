import React, { createContext, useReducer } from "react";

const initialState = {
  firstname: "User",
  isLogin: false,
  role: "customer"
};

export const authReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_AUTH_STATUS": return { 
      ...state, 
      firstname: payload.firstname,
      isLogin: true,
      role: payload.role
    }
  }
  return initialState;
};

export const AuthContext = createContext<{
  auth: any;
  authDispatch: Function;
}>({
  auth: initialState,
  authDispatch: () => 0
});

export const AuthContextProvider = ({ children }: any) => {
  const [ auth, authDispatch ] = useReducer(authReducer, initialState)

  return <AuthContext.Provider value={{ auth, authDispatch }}>
    { children }
  </AuthContext.Provider>
};
export const defaultAuth = initialState;
