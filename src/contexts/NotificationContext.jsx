import { createContext } from 'react';
import { toast } from 'sonner';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const notify = (message, type = 'info') => {
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast.info(message);
                break;
            default:
                toast(message);
        }
    };

    return (
        <NotificationContext value={{ notify }}>
            {children}
        </NotificationContext>
    );
};

export default NotificationProvider;