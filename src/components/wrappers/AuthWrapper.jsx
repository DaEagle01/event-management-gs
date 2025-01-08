import { useLocation, Navigate } from 'react-router-dom';
import MainLayout from "../../layouts/MainLayout";
import AuthLayout from "../../layouts/AuthLayout";
import { useGetUserQuery } from '../../features/authentication/authApiSlice';
import { useSelector } from 'react-redux';

const AuthWrapper = ({ children }) => {
    const { pathname } = useLocation();
    const accessToken = localStorage.getItem("accessToken");
    const { data: userProfile, isLoading } = useGetUserQuery(undefined, {
        skip: !accessToken
    });
    const { loading, userInfo } = useSelector((state) => state.auth);

    const name = userInfo?.user?.name || "";
    const initialLoad = isLoading || loading;
    // console.log(99, userInfo?.user, { initialLoad });
    if (initialLoad) {
        return <div className='min-h-screen flex justify-center items-center'>Loading...</div>;
    }

    if (name && (pathname === "/login" || pathname === "/sign-up")) {
        return <Navigate to="/" replace />;
    }

    if (name) {
        return <MainLayout>{children}</MainLayout>;
    }

    if (!initialLoad && !name && (pathname !== '/login' && pathname !== '/sign-up')) {
        return <Navigate to="/login" replace />;
    }

    return <AuthLayout>{children}</AuthLayout>;
};

export default AuthWrapper;