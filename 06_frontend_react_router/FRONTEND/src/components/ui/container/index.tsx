import { clsx } from "clsx";
import * as React from "react";

import styles from "./styles.module.css";

export function Container({
  children,
  className,
}: React.PropsWithChildren<React.ComponentPropsWithoutRef<"div">>) {
  return <div className={clsx(styles.container, className)}>{children}</div>;
}
