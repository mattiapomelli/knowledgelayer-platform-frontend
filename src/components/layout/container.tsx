import cx from "classnames";
import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cx("mx-auto max-w-6xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
};
