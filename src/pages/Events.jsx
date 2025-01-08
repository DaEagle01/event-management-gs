import { useState } from "react";
import { useGetEventsQuery } from "../features/event-management/eventsApiSlice";
import useEventMutations from "../hooks/useEventMutations";
import useSearchAndFilter from "../hooks/useSearchAndFilter";
import EventSearch from "../features/event-management/EventSearch";
import EventList from "../features/event-management/components/EventList";
import Pagination from "../features/event-management/components/Pagination";
import RSVPModal from "../features/event-management/components/RSVPModal";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const { data, error, isLoading } = useGetEventsQuery({ page: currentPage });

  const { handleRSVP } = useEventMutations();

  const {
    searchTerm,
    dateRange,
    handleSearch,
    handleDateChange,
    filteredEvents,
  } = useSearchAndFilter(data?.events || []);

  const confirmRSVP = () => {
    handleRSVP(selectedEventId);
    setShowRSVPModal(false);
    setSelectedEventId(null);
  };

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-10">
        Error: {error.message || "Failed to load events."}
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-0">
      <h2 className="text-3xl font-bold text-center mb-8">Events</h2>
      <EventSearch
        searchTerm={searchTerm}
        dateRange={dateRange}
        onSearchChange={handleSearch}
        onDateChange={handleDateChange}
      />
      <EventList
        events={filteredEvents}
        onRSVP={(eventId) => {
          setSelectedEventId(eventId);
          setShowRSVPModal(true);
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={data?.total || 0}
        itemsPerPage={data?.limit || 10}
        onPageChange={setCurrentPage}
      />
      {showRSVPModal && (
        <RSVPModal
          onCancel={() => setShowRSVPModal(false)}
          onConfirm={confirmRSVP}
        />
      )}
    </div>
  );
};

export default Home;