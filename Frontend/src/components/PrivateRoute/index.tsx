import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, roles, ...rest }: any) => {
    const { auth } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={props =>
                auth.isLogin ? (
                    roles.includes(auth.role) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/signin" />
                    )
                ) : (
                    <Redirect to="/signin" />
                )
            }
        />
    );
};
