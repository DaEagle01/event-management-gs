import { apiSlice } from "../../app/apiSlice";

export const eventsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createEvent: builder.mutation({
            query: (eventData) => ({
                url: '/events',
                method: 'POST',
                body: eventData,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                await queryFulfilled;
                dispatch(eventsApiSlice.util.invalidateTags(['Events']));
            },
            invalidatesTags: ["Events"]
        }),

        updateEvent: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/events/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [`event_id_${id}`],
        }),

        deleteEvent: builder.mutation({
            query: (id) => ({
                url: `/events/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Events'],
        }),

        getEventById: builder.query({
            query: (id) => `events/${id}`,
            providesTags: (result, error, { id }) => [`event_id_${id}`],
        }),

        searchEvents: builder.query({
            query: ({ title, location, startDate, endDate, page = 1, limit = 10 }) => {
                const params = new URLSearchParams();
                if (title) params.append('title', title);
                if (location) params.append('location', location);
                if (startDate) params.append('startDate', startDate);
                if (endDate) params.append('endDate', endDate);
                params.append('page', page);
                params.append('limit', limit);

                return { url: `/events/search?${params.toString()}` };
            },
            providesTags: ["Events"]
        }),

        rsvpToEvent: builder.mutation({
            query: ({ eventId, userId, status }) => ({
                url: `/events/${eventId}/rsvp`,
                method: 'POST',
                body: { userId, status },
            }),
           /*  async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                await queryFulfilled;
                dispatch(eventsApiSlice.util.invalidateTags(['Events']));
            },
            invalidatesTags: ["Events"] */
        }),
    }),
    overrideExisting: false,
});

export const { useCreateEventMutation, useUpdateEventMutation, useDeleteEventMutation, useGetEventByIdQuery, useSearchEventsQuery, useRsvpToEventMutation } = eventsApiSlice;