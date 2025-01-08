import { Outlet } from 'react-router-dom';

const AuthLayout = () => (
  <main className="flex-grow min-h-screen">
    <Outlet />
  </main>
);

export default AuthLayout;
