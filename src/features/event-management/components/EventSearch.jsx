import { Input } from "../../../components/ui/input";

const EventSearch = ({ searchParams, onSearch, onLocationChange, onDateChange }) => (
    <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-6">
        <Input
            type="text"
            placeholder="Search by title"
            label="Title"
            value={searchParams.title}
            onChange={(e) => onSearch(e.target.value)}
        />
        <Input
            type="text"
            placeholder="Search by location"
            label="Location"
            value={searchParams.location}
            onChange={(e) => onLocationChange(e.target.value)}
        />
        <div className="flex flex-col sm:flex-row gap-2">
            <Input
                type="datetime-local"
                name="start"
                label="Start date"
                value={searchParams.startDate}
                onChange={(e) => onDateChange(e.target.value, searchParams.endDate)}
            />
            <Input
                type="datetime-local"
                name="end"
                label="End date"
                value={searchParams.endDate}
                onChange={(e) => onDateChange(searchParams.startDate, e.target.value)}
            />
        </div>
    </div>
);

export default EventSearch;