import { cn } from '../lib/utils';

const variantStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  active: "bg-green-100 text-green-800",
  completed: "bg-green-100 text-green-800", // Using same as active for now based on image, or maybe different? Image shows light green for completed too.
  suspended: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800"
};

export function Badge({ variant = "default", className, children }) {
  const styles = variantStyles[variant.toLowerCase()] || variantStyles.default;
  
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", styles, className)}>
      {children}
    </span>
  );
}
