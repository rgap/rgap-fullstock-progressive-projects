import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import * as React from "react";

import styles from "./styles.module.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?:
    | "default"
    | "sm"
    | "lg"
    | "xl"
    | "sm-icon"
    | "icon"
    | "lg-icon"
    | "xl-icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={clsx(
          styles.button,
          styles[`button--${variant}`],
          styles[`button--${size}`],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
