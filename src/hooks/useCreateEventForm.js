import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '../utils/validation';
import useNotification from './useNotification';
import { useCreateEventMutation, useUpdateEventMutation } from '../features/event-management/eventsApiSlice';
import moment from 'moment';

export const useEventForm = (event = null, setIsEditing = () => { }, refetch = () => { }) => {
    const [submitError, setSubmitError] = useState(null);
    const [createEvent, { isLoading: isCreating }] = useCreateEventMutation();
    const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
    const { notify } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields, isDirty },
        resetField
    } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            title: event?.title || "",
            description: event?.description || "",
            startTime: event?.startTime ? moment(event?.startTime).format('YYYY-MM-DDTHH:mm') : "",
            endTime: event?.endTime ? moment(event?.endTime).format('YYYY-MM-DDTHH:mm') : "",
            location: event?.location || "",
        },
    });

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            startTime: moment(data.startTime).toISOString(),
            endTime: moment(data.endTime).toISOString(),
        };

        try {
            if (event) {
                await updateEvent({ id: event.id, ...formattedData }).unwrap();
                notify("Event updated successfully!", "success");
                setIsEditing(false);
                refetch();
            } else {
                const res = await createEvent(formattedData).unwrap();
                if (res?.data?.event) {
                    // resetting fields separately using resetField. using reset() here causes the form show unwanted validation error that appears if user submit a event after already creating one. 
                    resetField("title")
                    resetField("description")
                    resetField("startTime")
                    resetField("endTime")
                    resetField("location")
                    notify("Event created successfully!", "success");
                }
            }
        } catch (error) {
            console.error('Error saving event:', error);
            notify(
                error?.data?.errors?.[0]?.message ||
                error?.data?.message ||
                "Sorry, something went wrong. Please try again.",
                "error"
            );
            setSubmitError(error.data?.message || 'An error occurred');
        }
    };

    return {
        register,
        handleSubmit: handleSubmit(onSubmit),
        errors,
        isLoading: isCreating || isUpdating,
        submitError,
    };
};