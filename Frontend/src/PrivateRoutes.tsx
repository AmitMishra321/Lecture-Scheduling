import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { JSX, useEffect, useState } from 'react';
import { RootState } from './store';
import { logout } from './store/slices/authSlice';
import { toast } from 'sonner';



const PrivateRoute = ({ roles, children }: { roles: string[], children: JSX.Element }) => {
    const dispatch = useDispatch();
    const { token, role: userRole } = useSelector((state: RootState) => state.auth);
    const [unauthorized, setUnauthorized] = useState(false);

    useEffect(() => {
        if (token && (!userRole || !roles.includes(userRole))) {
            dispatch(logout());
            toast.error('Access Denied or Invalid Credentials');
            setUnauthorized(true);
        }
    }, [token, userRole, roles, dispatch]);
    if (!token || unauthorized) return <Navigate to="/" />;
    return children;
};

export default PrivateRoute;
