import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import EventDetail from '../pages/EventDetail';
import AuthWrapper from '../components/wrappers/AuthWrapper';
import Signup from '../pages/Signup';
import CreateEvent from '../pages/CreateEvent';
import UserProfile from '../pages/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthWrapper />,
        children: [
            { path: '', element: <Home /> },
            { path: 'login', element: <Login /> },
            { path: 'sign-up', element: <Signup /> },
            { path: 'create-event', element: <CreateEvent /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'event/:id', element: <EventDetail /> },
        ],
    },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;