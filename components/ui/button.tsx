import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--primary)] text-[var(--text-light)] shadow-[var(--shadow-md)] hover:bg-[var(--primary-light)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)]",
        lime: "bg-[var(--accent)] text-[var(--primary)] font-bold hover:bg-[var(--accent-dark)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(207,255,77,0.3)]",
        outline:
          "border-[1.5px] border-[var(--border-medium)] bg-transparent text-[var(--text-dark)] hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[rgba(13,71,161,0.04)]",
        ghost:
          "bg-transparent text-[var(--text-muted)] hover:text-[var(--text-dark)]",
        link: "text-[var(--primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "px-7 py-3.5 text-[0.95rem] rounded-[var(--radius-md)]",
        sm: "px-4 py-2 text-sm rounded-[var(--radius-sm)]",
        lg: "px-8 py-4 text-base rounded-[var(--radius-md)]",
        icon: "h-10 w-10 rounded-[var(--radius-md)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
