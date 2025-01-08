
export const Textarea = ({ label, name, value, onChange, error, id, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-500 mb-1">
            {label}
        </label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 ${error ? 'border-red-500 focus:ring-red-500' : 'border-blue-400 focus:ring-blue-500'}`}
            {...props}
        ></textarea>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);
