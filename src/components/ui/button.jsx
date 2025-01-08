import { clsx } from 'clsx';
 
export const Button = ({
	className,
	variant = 'default',
	size = 'md',
	children,
	disabled,
	...props
}) => {
	const variants = {
		default: 'bg-blue-400 text-white hover:bg-blue-500',
		outline:
			'border border-input bg-background hover:bg-muted/50 hover:text-primary',
		ghost: 'hover:bg-muted/50 hover:text-primary',
		destructive: 'bg-red-500 text-white hover:bg-red-600'
	};

	const sizes = {
		sm: 'h-8 px-3 text-xs',
		md: 'h-10 px-4 text-sm',
		lg: 'h-12 px-6 text-base',
	};

	return (
		<button
			className={clsx(
				'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
				variants[variant],
				sizes[size],
				{
					'opacity-50 cursor-not-allowed': disabled,
				},
				className
			)}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};

/* Button.displayName = 'Button';
 */