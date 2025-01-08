import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react'
import profilePic from "../../assets/images/profilePic.png"
import { useSelector } from 'react-redux';

export default function Header() {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { userInfo } = useSelector((state) => state.auth);

    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
    };
    const isActiveLink = (linkPath) => pathname === linkPath;

    return (
        <header>
            <nav className="max-w-7xl mx-auto relative px-4 md:px-8 py-2 flex justify-between items-center">
                <img src='/logo.png' className='w-20 md:w-44 h-12' />

                {userInfo?.user?.name && (
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-gray-500'>{userInfo?.user?.name}</p>
                        <img src={profilePic} className='w-14 h-14  cursor-pointer rounded-full p-2 hover:shadow' onClick={toggleMenu} />
                    </div>
                )}
            </nav>
            {isMenuOpen && (
                <div className="z-50 fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                    <div className="flex items-center mb-8">
                        <a className="mr-auto text-3xl font-bold leading-none" href="#">
                            <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
                                <path xmlns="http://www.w3.org/2000/svg" d="M8284 9162 c-2 -207 -55 -427 -161 -667..." />
                            </svg>
                        </a>
                        <button className="navbar-close" onClick={toggleMenu}>
                            <X className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" />
                        </button>
                    </div>
                    <ul className="space-y-6">
                        <li><Link to="/" className={`text-sm ${isActiveLink('/') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}  >Home</Link></li>
                        <li><Link to="create-event" className={`text-sm ${isActiveLink('/create-event') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`}>Create Event</Link></li>
                        <li><Link to="profile" className={`text-sm ${isActiveLink('/profile') ? 'font-semibold text-blue-500' : 'text-gray-600 hover:text-gray-700'}`} >Profile</Link></li>
                    </ul>
                </div>
            )}
        </header>
    )
}

