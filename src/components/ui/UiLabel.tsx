import React from "react";
import { Text } from "@chakra-ui/react";
import type { UiLabelProps } from "@/types/ui-label-props";

const UiLabel: React.FC<UiLabelProps> = ({ textStyle, text, ...rest }) => {
  return (
    <>
      <Text fontSize={textStyle} {...rest}>
        {text}
      </Text>
    </>
  );
};

export default UiLabel;
