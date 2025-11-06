import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props =
  | {
      type: "p";
      variant?: "body" | "caption" | "subtitle";
      children: React.ReactNode;
      textColor?: "primary" | "secondary" | "tertiary";
      className?: string;
      weight?: "light" | "normal" | "medium" | "semibold" | "bold";
    }
  | {
      type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      children: React.ReactNode;
      variant?: never;
      textColor?: "primary" | "secondary" | "tertiary";
      className?: string;
      weight?: "light" | "normal" | "medium" | "semibold" | "bold";
    };

export function Typography({
  children,
  type,
  variant,
  textColor,
  className,
  weight,
}: Props) {
  const textWeight = useMemo(() => {
    switch (weight) {
      case "light":
        return "font-light";
      case "normal":
        return "font-normal";
      case "medium":
        return "font-medium";
      case "semibold":
        return "font-semibold";
      case "bold":
        return "font-bold";
    }
  }, [weight]);

  const color = useMemo(() => {
    switch (textColor) {
      case "primary":
        return "text-primary";
      case "secondary":
        return "text-secondary";
      case "tertiary":
        return "text-tertiary";
    }
  }, [textColor]);

  const text = useMemo(() => {
    switch (type) {
      case "h1":
        return (
          <h1 className={cn("text-4xl", textWeight, color, className)}>
            {children}
          </h1>
        );
      case "h2":
        return (
          <h2 className={cn("text-3xl", textWeight, color, className)}>
            {children}
          </h2>
        );
      case "h3":
        return (
          <h3 className={cn("text-2xl", textWeight, color, className)}>
            {children}
          </h3>
        );
      case "h4":
        return (
          <h4 className={cn("text-xl", textWeight, color, className)}>
            {children}
          </h4>
        );
      case "h5":
        return (
          <h5 className={cn("text-lg", textWeight, color, className)}>
            {children}
          </h5>
        );
      case "h6":
        return (
          <h6 className={cn("text-base", textWeight, color, className)}>
            {children}
          </h6>
        );
      case "p":
        switch (variant) {
          case "body":
            return (
              <p className={cn("text-base", textWeight, color, className)}>
                {children}
              </p>
            );
          case "caption":
            return (
              <p className={cn("text-xs", textWeight, color, className)}>
                {children}
              </p>
            );
          case "subtitle":
            return (
              <p className={cn("text-sm", textWeight, color, className)}>
                {children}
              </p>
            );
        }
      default:
        return <p className={cn(textWeight, color, className)}>{children}</p>;
    }
  }, [children, className, color, textWeight, type, variant]);

  return text;
}
