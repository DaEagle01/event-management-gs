import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ErrorState({ error }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md text-center">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
                <h2 className="mt-4 text-xl font-semibold text-gray-700">Oops! Something went wrong</h2>
                <p className="mt-2 text-gray-500">{error.message || 'An error occurred while fetching event details.'}</p>
                <div className="mt-6">
                    <Link to="/" className="text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out">
                        &larr; Back to Events
                    </Link>
                </div>
            </div>
        </div>
    )
}

