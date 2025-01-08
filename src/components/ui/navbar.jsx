import { Link, useLocation, useNavigate } from 'react-router-dom';
import { EllipsisVertical } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authentication/authSlice';

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

    // Function to determine if the link is active
    const isActiveLink = (linkPath) => pathname === linkPath;

    return (
        <nav className="max-w-7xl w-full mx-auto relative px-4 md:px-8 py-2 flex justify-between items-center">
            <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
                <li>
                    <Link
                        to="/"
                        className={`text-sm ${isActiveLink('/') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}
                    >
                        Home
                    </Link>
                </li>
                <li className="text-gray-300">
                    <EllipsisVertical className='w-4 h-4' />
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
                    <EllipsisVertical className='w-4 h-4' />
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

            {name ? (
                <button
                    onClick={handleLogout}
                    className="hidden lg:inline-block lg:ml-auto py-2 px-6 bg-red-400 hover:bg-red-500 text-sm text-gray-100 font-bold rounded-xl transition duration-200"
                >
                    Log Out
                </button>
            ) : (
                <div className='flex items-center gap-2'>
                    <Link
                        to='login'
                        className="hidden lg:inline-block lg:ml-auto py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="sign-up"
                        className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                    >
                        Sign up
                    </Link>
                </div>
            )}
        </nav>
    );
}