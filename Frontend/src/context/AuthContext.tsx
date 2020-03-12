import { createContext, useReducer } from "react";

const initialState = {
  username: "User",
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
      username: payload.username,
      isLogin: payload.isLogin,
      role: payload.role
    }
  }
  return initialState;
};
// const [state, dispatch] = useReducer(authReducer, initialState);

export const AuthContext = createContext<{
  auth: any;
  authDispatcher: Function;
}>({
  auth: initialState,
  authDispatcher: () => 0 //(action: { type: string , payload: any }) => dispatch(action)
});

export const AuthContextProvider = AuthContext.Provider;
export const defaultAuth = initialState;
