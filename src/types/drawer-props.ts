import type { ReactNode } from "react";

export interface DrawerWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string | ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  placement?: "start" | "end" | "bottom" | "top";
  height?: string | number;
}
