import { cn } from '../lib/utils';

export function Card({ className, children, ...props }) {
  return (
    <div 
      className={cn("bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 transition-colors", className)} 
      {...props}
    >
      {children}
    </div>
  );
}
