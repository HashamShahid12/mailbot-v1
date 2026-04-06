import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { Star } from "lucide-react";

interface StarToggleButtonProps {
  isActive?: boolean;
  onToggle?: () => void;
}

export const StarToggleButton: React.FC<StarToggleButtonProps> = ({
  isActive,
  onToggle,
}) => {
  return (
    <Button
      onClick={onToggle}
      aria-label="Add to wishlist"
      minW="auto"
      minH="auto"
      size="sm"
      mr="2"
      bg="none"
      _focus={{ outline: "none" }}
    >
      <Box
        as="span"
        color={isActive ? "yellow.400" : "gray.400"}
        _hover={{ color: "yellow.400" }}
        transition="color 0.2s"
      >
        <Star fill={isActive ? "gold" : "none"} />
      </Box>
    </Button>
  );
};
