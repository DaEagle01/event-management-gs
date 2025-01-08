import { Loader } from 'lucide-react'

export default function LoadingState({ isEvent = true }) {
    return (
        <div className={`flex flex-col items-center justify-center ${isEvent ? 'min-h-[70vh]' : 'min-h-[100vh]'}`}>
            <div className="flex flex-col items-center">
                <Loader className="w-16 h-16 text-blue-500 animate-spin" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">
                    Loading {isEvent && "Event"} Details
                </h2>
                <p className="mt-2 text-gray-500">Please wait while we fetch the {isEvent && "event"} information.</p>
            </div>
        </div>
    )
}

