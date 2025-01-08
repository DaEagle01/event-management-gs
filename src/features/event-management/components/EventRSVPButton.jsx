import { useState } from 'react';
import { useRsvpToEventMutation } from '../eventsApiSlice';
import { Check, HelpCircle, X, Loader } from 'lucide-react';
import useNotification from '../../../hooks/useNotification';

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
            console.log('RSVP failed:', err);
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

    const rsvpOptions = [
        { status: 'going', label: 'Going', icon: Check, color: 'green' },
        { status: 'maybe', label: 'Maybe', icon: HelpCircle, color: 'yellow' },
        { status: 'not_going', label: 'Not Going', icon: X, color: 'red' }
    ];

    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            {rsvpOptions.map(({ status, label, icon: Icon, color }) => (
                <button
                    key={status}
                    onClick={() => handleRsvp(status)}
                    disabled={isLoading || loadingStatus !== null}
                    className={`
                        px-3 py-1 text-xs font-medium
                        ${status === 'going' ? 'rounded-l-md' : ''}
                        ${status === 'not_going' ? 'rounded-r-md' : ''}
                        ${rsvpStatus === status
                            ? `bg-${color}-500 text-white`
                            : `bg-white text-gray-700 hover:bg-${color}-50 hover:text-${color}-700`
                        }
                        border border-gray-200
                        focus:z-10 focus:ring-2 focus:ring-${color}-500 focus:text-${color}-700
                        transition-all duration-200 ease-in-out
                    `}
                >
                    <div className="flex items-center justify-center">
                        {loadingStatus === status ? (
                            <Loader className="animate-spin w-3 h-3 mr-1" />
                        ) : (
                            <Icon className={`w-3 h-3 mr-1 ${rsvpStatus === status ? 'text-white' : `text-${color}-500`}`} />
                        )}
                        {label}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default RSVPButton;

