import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Navigate, Outlet, Link } from 'react-router-dom';

function RequireAuth({ allowedRoles }) {
    // const user = useSelector(selectCurrentUser);
    const user = localStorage.getItem("user");
    const dispatch = useDispatch();
    const [shouldLogout, setShouldLogout] = useState(false); // Track logout state
    const LSUser = JSON.parse(localStorage.getItem('user'));
    console.log('hhere',LSUser)

    useEffect(() => {
       // if(JSON.parse(localStorage.getItem('accessToken')) !== undefined)
        const LSToken = (localStorage.getItem('user'));
        const checkingToken = () => {
            if (LSUser === null && LSToken !== null) {

                const LSUser = JSON.parse(localStorage.getItem('user'));
                console.log('here 2',LSUser)
            }}
        

        checkingToken();
    }, [dispatch, user]);

    const checkingAuth = () => {
        if ( LSUser ) {
            console.log(user.role, allowedRoles.includes(LSUser.role))
            return allowedRoles.includes(LSUser.role);
        }
        else if (!allowedRoles.includes(LSUser?.role)) {
            console.log('not allowed role.')
            return false;
        }else logout()
    };

    const logout = () => {
        setShouldLogout(true); // Set the logout state to trigger the navigation
    };

    return shouldLogout ? (
        <Navigate to="/" />
    ) : checkingAuth() ? (
        <Outlet />
    ) : (
        <div>
            <h1>.אין לך הרשאה לגשת לדף זה</h1>
            <a href="/">עבור לעמוד הבית</a>
        </div>
    );
}

export default RequireAuth;