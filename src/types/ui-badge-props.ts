import type { BadgeProps } from "@chakra-ui/react";
import type { ReactNode } from "react";
export interface UiBadgeProps extends Omit<BadgeProps, "colorScheme"> {
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  children: ReactNode;
  showIcon?: boolean;
  status?:
    | "pending"
    | "success"
    | "error"
    | "info"
    | "alert"
    | "plain"
    | "achievement"
    | "new";
}
