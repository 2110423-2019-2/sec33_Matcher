import React, { createContext } from "react";

const initialState = {
  username: "Can",
  isLogin: true
};

export const authReducer = (
  state: any,
  action: { type: string; payload: any }
) => {
  const { type, payload } = action;
  switch (
    type
    // TODO
  ) {
  }
  return initialState;
};

export const AuthContext = createContext<{
  auth: any;
  authDispatcher: Function;
}>({
  auth: initialState,
  authDispatcher: () => 0
});

export const AuthContextProvider = AuthContext.Provider;
export const defaultAuth = initialState;
