import { useState, useCallback } from "react";
import { useSearchEventsQuery } from "../features/event-management/eventsApiSlice";
import EventSearch from "../features/event-management/components/EventSearch";
import EventList from "../features/event-management/components/EventList";
import Pagination from "../features/event-management/components/Pagination";
import { useDebounce } from "../hooks/useDebounce";
import { useSelector } from "react-redux";
import moment from "moment";

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
  });

  const debouncedTitle = useDebounce(searchParams.title, 500);
  const debouncedLocation = useDebounce(searchParams.location, 500);

  const { userInfo } = useSelector((state) => state.auth);

  const queryParams = {
    title: debouncedTitle,
    location: debouncedLocation,
    startDate: searchParams.startDate ? moment(searchParams.startDate).toISOString() : "",
    endDate: searchParams.endDate ? moment(searchParams.endDate).toISOString() : "",
    page: searchParams.page,
    limit: searchParams.limit,
  };

  const { data, error, isLoading, isFetching } = useSearchEventsQuery(queryParams);

  let events = [];
  let pagination = {};

  if (data && data.data) {
    events = data.data.events || [];
    pagination = data.data.pagination || {};
  }

  const handleSearch = useCallback((searchTerm) => {
    setSearchParams((prev) => ({ ...prev, title: searchTerm, page: 1 }));
  }, []);

  const handleLocationChange = useCallback((location) => {
    setSearchParams((prev) => ({ ...prev, location, page: 1 }));
  }, []);

  const handleDateChange = useCallback((startDate, endDate) => {
    setSearchParams((prev) => ({ ...prev, startDate, endDate, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page) => {
    setSearchParams((prev) => ({ ...prev, page }));
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-500">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        <p>Error: {error.message || "Failed to load events."}</p>
        <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  const { total, page, totalPages } = pagination || {};

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6 sm:px-6 lg:px-0 pb-12">
      <h2 className="text-xl sm:text-3xl font-bold text-center text-gray-600 sm:mb-8">List of Events</h2>
      <EventSearch
        searchParams={searchParams}
        onSearch={handleSearch}
        onLocationChange={handleLocationChange}
        onDateChange={handleDateChange}
      />

      {events.length === 0 ? (
        <div className="text-center py-10 bg-gray-100 rounded-md shadow-md">
          <p className="text-lg text-gray-500">
            No events found. Please try adjusting your search criteria.
          </p>
        </div>
      ) : (
        <EventList events={events} isFetching={isFetching} userInfo={userInfo} />
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={Number(page)}
          totalItems={total}
          itemsPerPage={searchParams.limit}
          onPageChange={(newPage) => {
            handlePageChange(newPage);
          }}
        />
      )}
    </div>
  );
};

export default Home;