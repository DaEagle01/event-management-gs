import profilePic from "../../assets/images/profilePic.png"
import { useSelector } from 'react-redux';

export default function Header() {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <header>
            <nav className="max-w-7xl mx-auto relative px-4 md:px-8 py-1 md:py-2 flex justify-between items-center">
                <img src='/logo.png' className='w-20 md:w-44 h-8 md:h-12' />

                {userInfo?.user?.name && (
                    <div className='flex items-center gap-2'>
                        <p className='font-semibold text-gray-500'>{userInfo?.user?.name}</p>
                        <img src={profilePic} className='w-12 md:w-14 h-12 md:h-14  cursor-pointer rounded-full p-2 hover:shadow' />
                    </div>
                )}
            </nav> 
        </header>
    )
}

