
const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center items-center mt-6 space-x-2">
      <button
        className={`px-3 py-1 rounded-md transition ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md transition ${currentPage === page ? 'bg-blue-500 text-white border-2 border-blue-700' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          {page}
        </button>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <span className="px-3 py-1 text-gray-500">...</span>
      )}

      <button
        className={`px-3 py-1 rounded-md transition ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'bg-gray-200 hover:bg-gray-300'}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
