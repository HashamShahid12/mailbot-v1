import { type BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface PopoverMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end";
  contentProps?: BoxProps;
  rootWidth?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
