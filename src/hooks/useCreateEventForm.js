// hooks/useCreateEventForm.js
import { useState, useEffect } from 'react';
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

    console.log(dirtyFields, isDirty);
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

/* import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '../utils/validation';
import useNotification from './useNotification';
import { useCreateEventMutation } from '../features/event-management/eventsApiSlice';
import moment from 'moment';

export const useCreateEventForm = () => {
    const [submitError, setSubmitError] = useState(null);
    const [createEvent, { isLoading }] = useCreateEventMutation();
    const { notify } = useNotification();

    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField
    } = useForm({
        resolver: zodResolver(eventSchema),
    });

    const onSubmit = async (data) => {
        const formattedData = {
            ...data,
            startTime: moment(data.startTime).toISOString(),
            endTime: moment(data.endTime).toISOString(),
        };

        try {
            const res = await createEvent(formattedData).unwrap();
            if (res?.data?.event) {
                resetField("title")
                resetField("description")
                resetField("startTime")
                resetField("endTime")
                resetField("location")
                notify("Event created successfully!", "success");
            }
        } catch (error) {
            console.log(error);
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
        isLoading,
        submitError,
    };
};
 */