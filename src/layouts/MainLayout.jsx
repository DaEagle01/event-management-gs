import { Outlet } from 'react-router-dom';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import Navbar from '../components/ui/navbar';

const MainLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <Navbar />
        <main className="flex-grow p-4 max-w-[1400px] w-full mx-auto px-4 md:px-8 border">
            <Outlet />
        </main>
        <Footer />
    </div>
);

export default MainLayout;
