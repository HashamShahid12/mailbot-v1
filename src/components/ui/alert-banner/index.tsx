import React, { type ReactNode } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { X } from "lucide-react";

type AlertType = "success" | "error" | "warning" | "info";
type Align = "left" | "center" | "right";

interface AlertBannerProps {
  type?: AlertType;
  message: string;
  showClose?: boolean;
  align?: Align;
  onClose?: () => void;
  rightIcon?: ReactNode;
}

const bgColors: Record<AlertType, string> = {
  success: "green.50",
  error: "red.50",
  warning: "blue.400",
  info: "transparent",
};

const textColors: Record<AlertType, string> = {
  success: "green.800",
  error: "red.800",
  warning: "yellow.800",
  info: "gray.700",
};

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = "info",
  message,
  showClose = false,
  align = "left",
  onClose,
  rightIcon
}) => {
  const justify = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  }[align];

  return (
    <Flex
      justify={justify}
      width="100%"
      px={4}
      py={2}
      borderRadius="md"
    >
      <Flex align="center" gap={2} color={textColors[type]} bg={bgColors[type]} p="0.5rem">
        <Text fontSize="sm">{message}</Text>
        {rightIcon && <Box>{rightIcon}</Box>}
        {showClose && (
          <IconButton
            aria-label="Close alert"
            size="xs"
            variant="ghost"
            onClick={onClose}
          >
           <X />
          </IconButton>
        )}
      </Flex>
    </Flex>
  );
};
