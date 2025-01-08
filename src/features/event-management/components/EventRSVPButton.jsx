import { useState } from 'react';
import { useRsvpToEventMutation } from '../eventsApiSlice';
import { Check, HelpCircle, X, Loader } from 'lucide-react';
import useNotification from '../../../hooks/useNotification';

const colorClasses = {
    going: {
        active: 'bg-green-500 text-white',
        inactive: 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700',
        focus: 'focus:ring-green-500 focus:text-green-700',
        icon: 'text-green-500',
    },
    maybe: {
        active: 'bg-yellow-500 text-white',
        inactive: 'bg-white text-gray-700 hover:bg-yellow-50 hover:text-yellow-700',
        focus: 'focus:ring-yellow-500 focus:text-yellow-700',
        icon: 'text-yellow-500',
    },
    not_going: {
        active: 'bg-red-500 text-white',
        inactive: 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700',
        focus: 'focus:ring-red-500 focus:text-red-700',
        icon: 'text-red-500',
    },
};

const rsvpOptions = [
    { status: 'going', label: 'Going', icon: Check },
    { status: 'maybe', label: 'Maybe', icon: HelpCircle },
    { status: 'not_going', label: 'Not Going', icon: X },
];

const RSVPButton = ({ event, userId }) => {
    const rsvp = event?.rsvps?.filter(user => user?.userId === userId)?.[0];
    const [rsvpStatus, setRsvpStatus] = useState(rsvp?.status);
    const [loadingStatus, setLoadingStatus] = useState(null);
    const [rsvpToEvent, { isLoading }] = useRsvpToEventMutation();
    const { notify } = useNotification();

    const handleRsvp = async (status) => {
        setLoadingStatus(status);
        try {
            const res = await rsvpToEvent({ eventId: event?.id, userId, status }).unwrap();
            setRsvpStatus(status);
            notify("RSVP updated successfully.", "success");
        } catch (err) {
            console.error('RSVP failed:', err);
            notify(
                err?.data?.errors?.[0]?.message ||
                err?.data?.message ||
                "Sorry, something went wrong. Please try again.",
                "error"
            );
        } finally {
            setLoadingStatus(null);
        }
    };

    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {rsvpOptions.map(({ status, label, icon: Icon }) => {
                const isActive = rsvpStatus === status;
                const classes = colorClasses[status];

                return (
                    <button
                        key={status}
                        onClick={() => handleRsvp(status)}
                        disabled={isLoading || loadingStatus !== null}
                        className={`
                            px-3 py-1 text-xs font-medium border border-gray-200
                            ${status === 'going' ? 'rounded-l-md' : ''}
                            ${status === 'not_going' ? 'rounded-r-md' : ''}
                            ${isActive ? classes.active : classes.inactive}
                            ${classes.focus}
                            focus:z-10 transition-all duration-200 ease-in-out
                        `}
                    >
                        <div className="flex items-center justify-center">
                            {loadingStatus === status ? (
                                <Loader className="animate-spin w-3 h-3 mr-1" />
                            ) : (
                                <Icon className={`w-3 h-3 mr-1 ${isActive ? 'text-white' : classes.icon}`} />
                            )}
                            {label}
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default RSVPButton;
