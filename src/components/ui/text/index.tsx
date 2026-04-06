import { Text } from "@chakra-ui/react";
import type { UiTextProps } from "../../../types/ui-text-props";
import type React from "react";

export const UiText: React.FC<UiTextProps> = ({
  variant = "body",
  sx,
  ...props
}) => {
  const styles = {
    body: {
      fontSize: "md",
      color: "black",
      fontWeight: "normal",
      lineHeight: "moderate",
      // fontFamily: "sans-serif",
    },
    caption: {
      fontSize: "sm",
      lineHeight: "shorter",
      color: "blackAlpha.50",
      // fontFamily: "sans-serif",
    },
    heading: {
      color: "black",
      fontSize: "4xl",
      fontWeight: "medium",
      lineHeight: "shorter",
      // fontFamily: "sans-serif",
    },
    heading2: {
      color: "black",
      fontSize: "2xl",
      lineHeight: "short",
      fontWeight: "medium",
      // fontFamily: "Helvetica",
    },
    subheading: {
      fontSize: "xl",
      color: "black",
      // fontWeight: "semibold",
      // fontFamily: "sans-serif",
    },
  };

  return (
    <Text _dark={{ color: "white" }} {...styles[variant]} {...props} css={sx} />
  );
};
