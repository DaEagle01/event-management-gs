import { clsx } from 'clsx';

export const Input = ({
	className,
	type,
	label,
	error,
	ref,
	id,
	...props
}) => {
	return (
		<div className='w-full mx-auto'>
			{label && (
				<label htmlFor={id} className='mb-1 block text-sm font-medium text-gray-500'>
					{label}
				</label>
			)}
			<input
				id={id}
				type={type}
				className={clsx(
					'block w-full rounded-lg border bg-transparent py-1 md:py-2 pl-2 md:pl-4 text-zinc-600 focus:ring-1 focus:outline-none dark:text-zinc-400',
					`${error ? 'border-red-500 focus:ring-red-500' : 'border-blue-400 focus:ring-blue-500'}`,
					'',
					className
				)}
				ref={ref}
				{...props}
			/>
			{error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
		</div>
	);
};

Input.displayName = 'Input';