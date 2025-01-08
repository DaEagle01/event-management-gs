import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import { useEventForm } from '../../../hooks/useCreateEventForm';
import { Loader } from 'lucide-react';

export function EventForm({ event, setIsEditing, refetch }) {
    const { register, handleSubmit, errors, isLoading } = useEventForm(event, setIsEditing, refetch);

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <h2 className="text-3xl font-bold mb-6">{event ? 'Edit Event' : 'Create Event'}</h2>
            <Input
                label="Title"
                type="text"
                name="title"
                placeholder="Enter event title"
                {...register("title")}
                error={errors.title?.message}
            />
            <Textarea
                label="Description"
                name="description"
                placeholder="Enter full event description"
                {...register("description")}
                error={errors.description?.message}
                rows="3"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Start Time"
                    type="datetime-local"
                    name="startTime"
                    {...register("startTime")}
                    error={errors.startTime?.message}
                />
                <Input
                    label="End Time"
                    type="datetime-local"
                    name="endTime"
                    {...register("endTime")}
                    error={errors.endTime?.message}
                />
            </div>
            <Input
                label="Location"
                type="text"
                name="location"
                placeholder="Enter event location"
                {...register("location")}
                error={errors.location?.message}
            />
            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader className="animate-spin mr-2" />}
                    {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </form>
    );
}