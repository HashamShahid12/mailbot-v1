import type { LinkProps } from "@chakra-ui/react";
import type { ReactNode } from "react";

export interface UiLinkProps extends LinkProps {
  children: ReactNode;
  uiVariant?: "primary" | "secondary" | "plain";
  href?: string;
}
