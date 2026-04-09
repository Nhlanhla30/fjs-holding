import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
  external = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold font-heading rounded-lg transition-all duration-200 focus-ring group";

  const variants = {
    primary: "bg-accent-500 hover:bg-accent-600 text-white shadow-soft hover:shadow-medium",
    secondary:
      "bg-surface-dark-secondary hover:bg-primary-800 text-text-inverse border border-border-dark",
    outline:
      "border-2 border-accent-500 text-accent-500 hover:bg-accent-500 hover:text-white",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-primary-50",
  };

  const sizes = {
    sm: "px-4 py-2 text-body-sm gap-1.5",
    md: "px-6 py-3 text-body-md gap-2",
    lg: "px-8 py-4 text-body-lg gap-2.5",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          className="transition-transform group-hover:translate-x-1"
        />
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
