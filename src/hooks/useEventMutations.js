import { useCallback } from "react";
import { useDispatch } from "react-redux"; 
import { useCreateEventMutation, useDeleteEventMutation, useUpdateEventMutation } from "../features/event-management/eventsApiSlice";

const useEventMutations = () => {
    const dispatch = useDispatch();

    const [createEvent] = useCreateEventMutation();
    const [updateEvent] = useUpdateEventMutation();
    const [deleteEvent] = useDeleteEventMutation();

    const handleRSVP = useCallback((eventId) => {
        console.log(`RSVP confirmed for event ${eventId}`);
        // Add RSVP API call logic here
    }, []);

    return { createEvent, updateEvent, deleteEvent, handleRSVP };
};

export default useEventMutations;