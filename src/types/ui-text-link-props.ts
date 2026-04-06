import type { LinkProps } from "@chakra-ui/react";

export interface UiTextLinkProps extends LinkProps {
  value: string;
  href?: string;
  icon?: boolean | React.ReactElement;
  uiVariant?: "primary" | "secondary";
}
