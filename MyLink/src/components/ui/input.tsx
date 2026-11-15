import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isError, ...props }, ref) => {
    return (
      <input
        type={type}
        aria-invalid={isError ? "true" : props["aria-invalid"]}
        className={cn(
          "flex h-12 w-full rounded-xl bg-muted px-4 py-2 text-sm font-medium text-foreground",
          "placeholder:text-muted-foreground transition-all duration-120",
          "border border-transparent focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          isError &&
            "border-destructive bg-red-50/40 text-foreground focus:border-destructive focus:ring-destructive/20",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
