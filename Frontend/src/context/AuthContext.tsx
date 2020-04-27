import React, { createContext, useReducer } from 'react';

const initialState = {
    firstname: 'User',
    lastname: 'Lastname',
    email: 'user@gmail.com',
    isLogin: false,
    role: 'customer',
};

export const authReducer = (state: any, action: { type: string; payload: any }) => {
    const { type, payload } = action;

    switch (type) {
        case 'FETCH_AUTH_STATUS':
            return {
                ...state,
                firstname: payload.firstname,
                lastname: payload.lastname,
                email: payload.email,
                isLogin: true,
                role: payload.role,
            };
        case 'SIGN_OUT':
            return {
                ...initialState,
            };
    }
    return initialState;
};

export const AuthContext = createContext<{
    auth: any;
    authDispatch: Function;
}>({
    auth: initialState,
    authDispatch: () => 0,
});

export const AuthContextProvider = ({ children }: any) => {
    const [auth, authDispatch] = useReducer(authReducer, initialState);

    return <AuthContext.Provider value={{ auth, authDispatch }}>{children}</AuthContext.Provider>;
};
export const defaultAuth = initialState;
