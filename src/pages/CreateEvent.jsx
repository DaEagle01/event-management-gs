import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from '../components/ui/textarea';
import { useEventForm } from '../hooks/useCreateEventForm';
import { Loader } from "lucide-react";

export default function CreateEvent() {
  const { register, handleSubmit, errors, isLoading } = useEventForm();

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Create New Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="title"
          placeholder="Enter event title"
          {...register("title")}
          label="Title"
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
        <Input
          type="datetime-local"
          name="startTime"
          {...register("startTime")}
          label="Start Time"
          error={errors.startTime?.message}
        />
        <Input
          type="datetime-local"
          name="endTime"
          {...register("endTime")}
          label="End Time"
          error={errors.endTime?.message}
        />
        <Input
          type="text"
          name="location"
          placeholder="Enter event location"
          {...register("location")}
          label="Location"
          error={errors.location?.message}
        />
        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={isLoading}
        >
          {isLoading && <Loader className="animate-spin mr-2" />}
          {isLoading ? 'Creating event...' : 'Create Event'}
        </Button>
      </form>
    </div>
  );
}
