import type { BoxProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export interface UiBoxProps extends BoxProps {
  heading?: string;
  icon?: IconType;
  description?: ReactNode;
  link?: string;
  linklabel?: string | ReactNode;
  onClick?: () => void;
  showLayout?: boolean;
  uiVariant?: "primary" | "secondary";
  children?: ReactNode;
  actions?: ReactNode;
}
