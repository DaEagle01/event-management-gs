import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetEventByIdQuery, useDeleteEventMutation, useUpdateEventMutation } from '../features/event-management/eventsApiSlice'; 
 import useNotification from '../hooks/useNotification';
import NotFoundState from '../components/ui/NotFound';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { EventForm } from '../features/event-management/components/EventForm';
import { EventInfo } from '../features/event-management/components/EventInfo';
import { DeleteModal } from '../features/event-management/components/DeleteModal';
  
export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotification();

  const { data: eventData, error, isLoading, refetch } = useGetEventByIdQuery(id);
  const event = eventData?.data?.event;

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteEvent, { isLoading: isDeleting }] = useDeleteEventMutation();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await deleteEvent(id).unwrap();
      console.log(res)
      setShowDeleteModal(false);
      navigate('/');
      notify("Event created successfully!", "success");
    } catch (error) {
      console.error('Failed to delete event:', error);
      notify(
        error?.data?.errors?.[0]?.message ||
        error?.data?.message ||
        "Sorry, something went wrong. Please try again.",
        "error"
      );
    }
  };

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  if (!event) return <NotFoundState />

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {isEditing ? (
        <EventForm event={event} setIsEditing={setIsEditing} updateEvent={updateEvent} refetch={refetch} />
      ) : (
        <EventInfo event={event} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {showDeleteModal && (
        <DeleteModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
