import type { CustomSelectProps, SelectItem } from "@/types/ui-select-props";
import {
  Icon,
  Select,
  Stack,
  Span,
  createListCollection,
  type SelectValueChangeDetails,
  Box,
  Portal, // Added Portal
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import { UiText } from "../text";
import SearchBar from "../search-bar";

export const UiSelect: React.FC<CustomSelectProps> = ({
  items = [],
  size = "sm",
  width = "2xs",
  flex,
  placeholder = "Select an option",
  label = "Select option",
  showLabel = false,
  padding,
  positioning,
  background = "white",
  borderStyle = "normal",
  onChange,
  description,
  bgTrigger = "transparent",
  selectedItem: selectedItemProp,
  onItemChange,
  defaultValue,
  searchBar,
  searchValue,
  onSearchChange,
  children,
  triggerPy,
  triggerPx,
  ...rest
}) => {
  const [open, setOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [internalSelectedItem, setInternalSelectedItem] = useState<
    string | undefined
  >(defaultValue);

  const selectedItem = selectedItemProp ?? internalSelectedItem;

  // 1. FILTER LOGIC
  const filteredItems = useMemo(() => {
    const safeItems = items ?? [];
    if (!searchBar || !localSearch) return safeItems;

    return safeItems.filter((item) => {
      const label = item.label ?? "";
      return label.toLowerCase().includes(localSearch.toLowerCase());
    });
  }, [items, localSearch, searchBar]);

  // 2. COLLECTION LOGIC (Must use filteredItems)
  const collection = useMemo(
    () => createListCollection({ items: filteredItems }),
    [filteredItems],
  );

  const handleValueChange = (details: SelectValueChangeDetails<SelectItem>) => {
    const selectedValue = details.value[0];
    onChange?.(selectedValue);
    if (onItemChange) {
      onItemChange(selectedValue);
    } else {
      setInternalSelectedItem(selectedValue);
    }
  };

  return (
    <Select.Root
      collection={collection}
      onOpenChange={({ open }) => {
        setOpen(open);
        if (!open) setLocalSearch("");
      }}
      positioning={
        positioning ?? { placement: "bottom", gutter: 4, sameWidth: true }
      }
      size={size}
      width={width}
      flex={flex}
      gap="0.5"
      minW="fit"
      outline="none"
      onValueChange={handleValueChange}
      value={selectedItem ? [selectedItem] : []}
      {...rest}
    >
      <Select.HiddenSelect />
      {showLabel && label && (
        <Select.Label>
          <UiText bg="transparent" fontWeight="semibold">
            {label}
          </UiText>
        </Select.Label>
      )}

      <Select.Control>
        <Select.Trigger
          borderColor="blackAlpha.100"
          borderStyle={borderStyle}
          color="gray.800"
          cursor="pointer"
          _hover={{ borderColor: "blue.200" }}
          fontSize="sm"
          bg={bgTrigger}
          fontWeight="semibold"
          py={triggerPy ?? "2"}
          px={triggerPx ?? "2"}
        >
          <Select.ValueText placeholder={placeholder} flexShrink={0} />
        </Select.Trigger>
        <Select.IndicatorGroup px="2">
          <Select.Indicator>
            <Icon
              as={ChevronDown}
              color="black"
              boxSize="6"
              transition="transform 0.2s ease"
              transform={open ? "rotate(180deg)" : "rotate(0deg)"}
            />
          </Select.Indicator>
        </Select.IndicatorGroup>
      </Select.Control>

      <Portal>
        <Select.Positioner zIndex="popover">
          <Select.Content
            bg={background}
            border="sm"
            borderColor="gray.300"
            minW="7xs"
            w="full"
            p={padding}
          >
            {searchBar && (
              <Box p="3" borderBottom="sm" borderColor="gray.100">
                <SearchBar
                  placeholder="Filter"
                  value={searchValue ?? localSearch}
                  onChange={(e: any) => {
                    const val = e.target.value;
                    setLocalSearch(val); // Update internal search
                    onSearchChange?.(val); // Notify parent if they passed a handler
                  }}
                />
              </Box>
            )}
            <Box maxH="240px" overflowY="auto">
              {children}

              {/* FIX: Map over filteredItems, NOT items */}
              {filteredItems.map((item) => {
                const isSelected = selectedItem === item.value;
                return (
                  <Select.Item
                    px="4"
                    py="2"
                    item={item}
                    key={item.value}
                    borderColor="blue.200"
                    color={isSelected ? "blue.100" : "current"}
                    bg={isSelected ? "blue.400" : "transparent"}
                    _hover={{ bg: "gray.200", cursor: "button" }}
                    borderLeft={isSelected ? "lg" : "transparent"}
                  >
                    <Stack gap="0">
                      <Select.ItemText
                        fontWeight={isSelected ? "semibold" : "normal"}
                      >
                        {item.label}
                      </Select.ItemText>
                      {item.description && (
                        <Span color="gray.400" textStyle="xs">
                          {item.description}
                        </Span>
                      )}
                    </Stack>
                  </Select.Item>
                );
              })}

              {/* Empty state for search */}
              {filteredItems.length === 0 && (
                <Box p="4" textAlign="center" color="gray.400" fontSize="xs">
                  No results found
                </Box>
              )}
            </Box>
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
