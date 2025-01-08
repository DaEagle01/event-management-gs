import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import moment from 'moment';
import { Button } from '../../../components/ui/button';

export function EventInfo({ event, onEdit, onDelete, userInfo = {} }) {
    const isOwner = event?.ownerId === userInfo?.user?.id;
    return (
        <>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-8">
                <h2 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{event?.title}</h2>
                <p className="text-lg sm:text-xl opacity-90">{event?.location}</p>
            </div>
            <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0">
                        <div className="flex items-center text-gray-600">
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <span>{moment(event?.startTime).format('MMMM D, YYYY h:mm A')}</span>
                            <span className='px-2'>-</span>
                            <span>{moment(event?.endTime).format('MMMM D, YYYY h:mm A')}</span>
                        </div>
                    </div>
                    {isOwner && (
                        <div className="space-x-2">
                            <Button onClick={onEdit}>
                                Edit Event
                            </Button>
                            <Button onClick={onDelete} variant='destructive'>
                                Delete Event
                            </Button>
                        </div>
                    )}
                </div>
                <div className="bg-gray-50 p-3 sm:p-6 rounded-lg">
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
