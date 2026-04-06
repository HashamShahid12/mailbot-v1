import React from "react";
import { Box, Flex, Icon } from "@chakra-ui/react";
import { UiText } from "../text";
import UiLink from "../link";
import type { UiBoxProps } from "@/types/ui-box";

const UiBox: React.FC<UiBoxProps> = ({
  icon,
  link,
  description,
  uiVariant = "primary",
  heading,
  linklabel,
  showLayout = false,
  children,
  onClick,
  actions,
  ...props
}) => {
  const variantStyles = {
    primary: {
      borderColor: "gray.200",
      boxShadow: "sm",
    },
    secondary: {
      borderColor: "blackAlpha.100",
    },
  };
  const style = variantStyles[uiVariant] ?? variantStyles["primary"];
  return (
    <Box
      bg="white"
      rounded="lg"
      p="6"
      border="sm"
      _dark={{ bg: "gray.900" }}
      {...style}
      {...props}
    >
      {/* show layput is used for audiance<Growth Tool Content> page  */}
      {showLayout && (
        <Flex justify="space-between" mb={children ? "4" : "0"}>
          <Flex>
            <Box paddingBlock="2">
              {icon && (
                <Icon
                  as={icon}
                  bg="gray.600"
                  borderRadius="3xl"
                  p="1"
                  boxSize="9"
                  color="blackAlpha.200"
                  mr="5"
                />
              )}
            </Box>
            <Box>
              {heading && <UiText variant="subheading">{heading}</UiText>}
              {description && (
                <UiText variant="body" color="gray.400">
                  {description}
                </UiText>
              )}
            </Box>
          </Flex>
          <Box>
            {actions}
            {typeof linklabel === "string" ? (
              <UiLink onClick={onClick} href={link || "#"}>
                {linklabel}
              </UiLink>
            ) : (
              linklabel
            )}

            {}
          </Box>
        </Flex>
      )}

      {children}
    </Box>
  );
};

export default UiBox;
