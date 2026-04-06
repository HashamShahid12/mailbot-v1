import { Badge, Flex } from "@chakra-ui/react";
import type { BadgeProps } from "@chakra-ui/react";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { MdInfo } from "react-icons/md";
import type { UiBadgeProps } from "@/types/ui-badge-props";
import type { ReactNode } from "react";
import {
  BsCheckCircleFill,
  BsCircleFill,
  BsPauseCircleFill,
} from "react-icons/bs";
const statusStyles: Record<NonNullable<UiBadgeProps["status"]>, BadgeProps> = {
  alert: {
    bg: "alert.200",
    color: "alert.300",
  },
  pending: { bg: "gray.200", color: "gray.400" },
  success: { bg: "success.100", color: "success.200" },
  error: { bg: "error.100", color: "error.700" },
  info: { bg: "info.100", color: "info.700" },
  plain: { bg: "transparent", color: "black" },
  achievement: { bg: "achievement.100", color: "achievement.200" },
  new: { bg: "blue.400", color: "blue.450" },
};
const defaultIcons: Partial<
  Record<NonNullable<UiBadgeProps["status"]>, ReactNode>
> = {
  alert: <TbAlertTriangleFilled />,
  info: <MdInfo />,
  pending: <BsPauseCircleFill />,
  success: <BsCheckCircleFill />,
  error: <BsCircleFill />,
};
export const UiBadge = ({
  icon,
  iconPosition = "left",
  children,
  showIcon,
  status,
  ...rest
}: UiBadgeProps) => {
  const statusProps = status ? statusStyles[status] : {};

  const displayIcon =
    showIcon === false ? null : icon ?? (status ? defaultIcons[status] : null);

  return (
    <Badge
      variant="solid"
      fontSize="sm"
      px="2"
      py="1"
      borderRadius="full"
      {...statusProps}
      {...rest}
    >
      <Flex align="center" gap="1">
        {displayIcon && iconPosition === "left" && displayIcon}
        {children}
        {displayIcon && iconPosition === "right" && displayIcon}
      </Flex>
    </Badge>
  );
};
