import { useState, useMemo } from "react";
import moment from "moment";

const useSearchAndFilter = (events) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const filteredEvents = useMemo(() => {
        return events.filter((event) =>
            (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (!dateRange.start || moment(event.startTime).isSameOrAfter(dateRange.start)) &&
            (!dateRange.end || moment(event.endTime).isSameOrBefore(dateRange.end))
        );
    }, [events, searchTerm, dateRange]);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleDateChange = (e) => setDateRange({ ...dateRange, [e.target.name]: e.target.value });

    return { searchTerm, dateRange, handleSearch, handleDateChange, filteredEvents };
};

export default useSearchAndFilter;