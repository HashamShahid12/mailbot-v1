import type { UiButtonProps } from "@/types/ui-button-props";
import React from "react";
import {
  Button as ChakraButton,
  Spinner,
  HStack,
  Text,
} from "@chakra-ui/react";

const UiButton: React.FC<UiButtonProps> = ({
  children,
  uiVariant = "plain",
  loading,
  loadingText,
  ...props
}) => {
  const variantStyles = {
    plain: {
      bg: "white",
      color: "black",
      _hover: { bg: "gray.600", textDecoration: "none" },
    },
    solid: {
      bg: "black",
      color: "white",
      _hover: { bg: "whiteAlpha.200", textDecoration: "none" },
    },
    outline: {
      bg: "transparent",
      color: "black",
      border: "sm",
      borderColor: "blackAlpha.100",
      _hover: { bg: "gray.600", textDecoration: "none" },
    },
    danger: {
      bg: "red.100",
      color: "white",
      border: "sm",
      borderColor: "red.100",
      _hover: { bg: "red.50", textDecoration: "none" },
    },
  };

  const style = variantStyles[uiVariant] ?? variantStyles.plain;

  return (
    <ChakraButton
      disabled={loading}
      px="4"
      py="5"
      borderRadius="md"
      fontWeight="medium"
      aria-busy={loading}
      fontSize="md"
      _focus={{ outline: "none" }}
      {...style}
      {...props}
    >
      {loading ? (
        <HStack>
          <Spinner size="sm" />
          {loadingText && <Text>{loadingText}</Text>}
        </HStack>
      ) : (
        children
      )}
    </ChakraButton>
  );
};

export default UiButton;
