import * as React from "react";
import {
  Checkbox as ChakraCheckbox,
  type CheckboxLabelProps,
  type CheckboxControlProps,
  Flex,
} from "@chakra-ui/react";
import type { CheckboxProps } from "@/types/check-box-props";
import { UiText } from "../text";
import { UiBadge } from "../badge";

const Checkbox = React.forwardRef<HTMLLabelElement, CheckboxProps>(
  (
    {
      label,
      subtitle,
      badge,
      labelProps,
      controlProps,
      indeterminate,
      checkbox = true,
      ...rootProps
    },
    ref
  ) => {
    const defaultControlStyles: CheckboxControlProps = {
      border: "sm",
      cursor: "button",
      borderColor: "gray.300",
      bg: "white",
      _hover: {
        borderColor: "blue.700",
      },
      _checked: {
        bg: "blue.200",
        borderColor: "blue.700",
      },
      ...(indeterminate && {
        _indeterminate: {
          bg: "blue.200",
          borderColor: "blue.700",
        },
      }),
    };

    const defaultLabelStyles: CheckboxLabelProps = {
      fontSize: "md",
      fontWeight: "normal",
      _hover: {
        cursor: "button",
      },
    };

    const mergedControlProps = {
      ...defaultControlStyles,
      ...controlProps,
    };

    const mergedLabelProps = {
      ...defaultLabelStyles,
      ...labelProps,
    };

    return (
      <ChakraCheckbox.Root
        ref={ref}
        _focus={{ outline: "none" }}
        checked={rootProps.checked}
        onCheckedChange={rootProps.onCheckedChange}
        {...rootProps}
        style={{ cursor: "button", ...rootProps.style }}
      >
        <ChakraCheckbox.HiddenInput />
        {checkbox && (
          <ChakraCheckbox.Control {...mergedControlProps}>
            <ChakraCheckbox.Indicator />
          </ChakraCheckbox.Control>
        )}
        <Flex justify="space-between" align="center" w="full">
          {(label || subtitle) && (
            <ChakraCheckbox.Label {...mergedLabelProps}>
              <div>
                {label && <div>{label}</div>}
                {subtitle && (
                  <UiText
                    color={rootProps.checked ? "blue.100" : "gray.400"}
                    variant="caption"
                  >
                    {subtitle}
                  </UiText>
                )}
              </div>
            </ChakraCheckbox.Label>
          )}
          {badge && (
            <UiBadge status="pending" icon>
              {badge}
            </UiBadge>
          )}
        </Flex>
      </ChakraCheckbox.Root>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
