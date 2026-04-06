import type { TabsComponentProps } from "@/types/ui-tab-props";
import { Box, Flex, Link, Tabs } from "@chakra-ui/react";
import type React from "react";

export const UiTab: React.FC<TabsComponentProps> = ({
  tabs,
  defaultValue,
  variant = "plain",
  onChange,
  tabContent,
  noMarginLeft,
  noTriggerBorders,
  triggerBorderRadius,
  columnBorderRightRadius,
  triggerColor,
  triggerFontWeight,
  selectedColor,
  selectedFontWeight,
}) => {
  const isMinimal = variant === "minimal";
  const isColumn = variant === "column";

  const renderTabTriggers = () =>
    tabs.map((tab) => {
      const triggerContent = (
        <>
          {tab.icon}
          {tab.label}
        </>
      );

      const commonProps = {
        value: tab.value,
        outline: "none",
        asChild: isMinimal || isColumn,
        color: triggerColor ?? "black",
        borderRadius: triggerBorderRadius ?? "none",
        borderRightRadius: isColumn
          ? (columnBorderRightRadius ?? triggerBorderRadius ?? "md")
          : "none",
        display: "flex",
        alignItems: "center",
        px: "2",
        ml: noMarginLeft ? "none" : (isMinimal || isColumn ? "3" : "none"),
        fontWeight: triggerFontWeight,
        fontSize: isMinimal || isColumn ? "16px" : undefined,
        _hover:
          isMinimal || isColumn
            ? {
                borderBottom: noTriggerBorders ? undefined : (isMinimal ? "md" : undefined),
                borderColor: noTriggerBorders ? undefined : "gray.300",
                bg: isColumn ? "gray.100" : undefined,
              }
            : { bg: "gray.100" },

        _selected:
          isMinimal || isColumn
            ? {
                fontWeight: selectedFontWeight ?? "semibold",
                color: selectedColor,
                borderBottom: noTriggerBorders ? undefined : (isMinimal ? "md" : undefined),
                borderLeft: noTriggerBorders ? undefined : (isColumn ? "sm" : undefined),
                bg: isColumn ? "gray.100" : undefined,
                _hover: noTriggerBorders ? undefined : { borderColor: "black" },
              }
            : {
                bg: "white",
                fontWeight: selectedFontWeight ?? "semibold",
                color: selectedColor,
                border: noTriggerBorders ? undefined : "sm",
                borderRadius: "sm",
                borderColor: noTriggerBorders ? undefined : "gray.300",
                _hover: { bg: "white" },    
              },
      };

      return tab.href ? (
        <Tabs.Trigger key={tab.value} {...commonProps} asChild>
          <Link
            href={tab.href}
            textDecoration="none"
            outline="none"
            display="flex"
            border={isMinimal || isColumn ? "none" : "sm"}
            alignItems="center"
            gap="1"
            px="8"
            py={isMinimal || isColumn ? "7" : undefined}
            fontSize={isMinimal || isColumn ? "16px" : undefined}
          >
            {triggerContent}
          </Link>
        </Tabs.Trigger>
      ) : (
        <Tabs.Trigger key={tab.value} {...commonProps}>
          {isMinimal || isColumn ? (
            <Link unstyled>{triggerContent}</Link>
          ) : (
            <>{triggerContent}</>
          )}
        </Tabs.Trigger>
      );
    });

  return (
    <Tabs.Root
      defaultValue={defaultValue}
      onValueChange={(details) => {
        if (onChange && typeof details?.value === "string") {
          onChange(details.value);
        }
      }}
      variant={isMinimal || isColumn ? "plain" : variant}
    >
      {isColumn ? (
        <Flex>
          <Tabs.List
            flexDirection="column"
            bg="transparent"
            w="4xs"
            gap="1"
            p="2"
            mt="5"
          >
            {renderTabTriggers()}
          </Tabs.List>

          <Box flex="1" mt="5" ml="2" p="2">
            {tabs.map((tab) => (
              <Tabs.Content key={tab.value} value={tab.value}>
                {tabContent?.[tab.value]}
              </Tabs.Content>
            ))}
          </Box>
        </Flex>
      ) : (
        <>
          <Tabs.List
            display="flex"
            flexDirection="row"
            bg={isMinimal ? "white" : isColumn ? undefined : "gray.200"}
            border={isMinimal ? "none" : "sm"}
            borderBottom={isMinimal ? "sm" : undefined}
            borderColor={isMinimal ? "gray.100" : "gray.300"}
            overflow="hidden"
            rounded="l3"
            w={isMinimal ? "full" : "fit"}
          >
            {renderTabTriggers()}
          </Tabs.List>

          {tabs.map((tab) => (
            <Tabs.Content key={tab.value} value={tab.value}>
              {tabContent?.[tab.value]}
            </Tabs.Content>
          ))}
        </>
      )}
    </Tabs.Root>
  );
};
