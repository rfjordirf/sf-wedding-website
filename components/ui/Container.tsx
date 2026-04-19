import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: Props) {
  return (
    <div className={`mx-auto w-full max-w-[min(100%,900px)] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}
