import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authentication/authSlice';
import { Button } from './button';

export default function Navbar() {
    const { pathname } = useLocation();
    const { loading, userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const name = userInfo?.user?.name || "";

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    }

    const isActiveLink = (linkPath) => pathname === linkPath;

    return (
        <nav className="max-w-7xl w-full mx-auto relative px-4 md:px-8 py-2 flex justify-between items-center">
            <ul className="flex items-center space-x-1 md:space-x-6">
                <li>
                    <Link
                        to="/"
                        className={`text-sm ${isActiveLink('/') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}
                    >
                        Home
                    </Link>
                </li>
                <li className="text-gray-300">
                    <EllipsisVertical className='w-4 h-4 mt-[2px]' />
                </li>
                <li>
                    <Link
                        to="/create-event"
                        className={`text-sm ${isActiveLink('/create-event') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}
                    >
                        Create Event
                    </Link>
                </li>
                <li className="text-gray-300">
                    <EllipsisVertical className='w-4 h-4 mt-[2px]' />
                </li>
                <li>
                    <Link
                        to="/profile"
                        className={`text-sm ${isActiveLink('/profile') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}
                    >
                        Profile
                    </Link>
                </li>
            </ul>

            {name && (
                <Button
                    onClick={handleLogout}
                    variant='destructive'
                    className="inline-block w-max h-7 md:h-8 md:py-2 md:px-6"
                >
                    Log Out
                </Button>
            )}
        </nav>
    );
}