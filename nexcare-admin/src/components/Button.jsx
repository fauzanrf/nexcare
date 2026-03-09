import { forwardRef } from 'react';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

const Button = forwardRef(({ className, variant = "primary", size = "default", isLoading, children, ...props }, ref) => {
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg",
    secondary: "bg-purple-100 text-purple-900 hover:bg-purple-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    link: "text-purple-600 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 disabled:pointer-events-none disabled:opacity-50 transition-all duration-200",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button };
