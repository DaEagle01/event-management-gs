
const EventsListSkeleton = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="h-6 bg-gray-200 rounded w-full"></div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="h-6 bg-gray-200 rounded w-10"></div>
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default EventsListSkeleton