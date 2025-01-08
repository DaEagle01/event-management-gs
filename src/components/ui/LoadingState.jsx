import { Loader } from 'lucide-react'

export default function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] ">
            <div className="flex flex-col items-center">
                <Loader className="w-16 h-16 text-blue-500 animate-spin" /> 
                <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading Event Details</h2>
                <p className="mt-2 text-gray-500">Please wait while we fetch the event information.</p>
            </div>
        </div>
    )
}

