import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Calendar, MapPin, Loader } from 'lucide-react';
import RSVPButton from "./EventRSVPButton";

const EventList = ({ events, isFetching, userInfo }) => {
  const navigate = useNavigate();

  if (events.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg shadow-sm">
        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-xl font-semibold text-gray-700 mb-2">No events available</p>
        <p className="text-base text-gray-500">
          Check back later for upcoming events!
        </p>
      </div>
    );
  }

  return (
    <div className={`${isFetching ? 'bg-gray-200 opacity-30' : 'bg-white'} relative sm:shadow-lg rounded-lg`}>
      {isFetching && <Loader className="animate-spin w-12 h-12 absolute inset-x-1/2 top-40 text-black opacity-100" />}

      {/* Responsive container */}
      <div className="hidden sm:block overflow-x-auto">
        {/* Table for larger devices */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-gray-500" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{event.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {moment.utc(event.startTime).local().format('MMM D, YYYY')} - {moment.utc(event.startTime).local().format('h:mm A')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {moment.utc(event.endTime).local().format('MMM D, YYYY')} - {moment.utc(event.endTime).local().format('h:mm A')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{event.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    <RSVPButton event={event} userId={userInfo?.user?.id || ""} />
                    <Link to={`event/${event?.id}`} className="text-blue-600 hover:text-blue-900 transition duration-150 ease-in-out">
                      <Eye className="h-5 w-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile */}
      <div className="block sm:hidden space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg shadow-sm p-4"
            onClick={() => navigate(`event/${event?.id}`)}
          >
            <div className="flex items-center space-x-4">
              <Calendar className="h-8 w-8 text-gray-500" />
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {moment.utc(event.startTime).local().format('MMM D, YYYY')} - {moment.utc(event.startTime).local().format('h:mm A')}
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm flex items-center text-gray-600">
                <MapPin className="inline-block h-4 w-4 mr-1 text-gray-500" />
                {event.location}
              </p>
            </div>
            <div className="w-full mt-3">
              <RSVPButton event={event} userId={userInfo?.user?.id || ""} /> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
