import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import moment from 'moment';

export function EventInfo({ event, onEdit, onDelete }) {
    console.log(event);
    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8">
                <h2 className="text-4xl font-bold mb-2">{event?.title}</h2>
                <p className="text-xl opacity-90">{event?.location}</p>
            </div>
            <div className="p-8 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                        <div className="flex items-center text-gray-600">
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <span>{moment(event?.startTime).format('MMMM D, YYYY h:mm A')}</span>
                            <span className='px-2'>-</span>
                            <span>{moment(event?.endTime).format('MMMM D, YYYY h:mm A')}</span>
                        </div>
                    </div>
                    <div className="space-x-2">
                        <button
                            onClick={onEdit}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        >
                            Edit Event
                        </button>
                        <button
                            onClick={onDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                        >
                            Delete Event
                        </button>
                    </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                    <p className="text-gray-700 leading-relaxed">{event?.description}</p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Location</h3>
                    <div className="flex items-center text-gray-600">
                        <MapPinIcon className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                        <span>{event?.location}</span>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-4">Attendees</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                        <UsersIcon className="h-6 w-6 mr-2" />
                        <span>{event?.rsvps?.length} people attending</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {event?.rsvps?.map((attendee, index) => (
                            <div key={index} className="bg-gray-100 rounded-full px-4 py-2 text-center text-sm">
                                {attendee?.user?.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
