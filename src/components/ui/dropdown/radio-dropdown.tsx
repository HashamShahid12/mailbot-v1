import { useEffect, useMemo, useState } from "react";
import { Box, RadioGroup } from "@chakra-ui/react";
import { FlexibleDropdown } from ".";
import type { TagMultiSelectDropdownProps } from "@/types/tag-multiselect-dropdown-props";
import { getFlowTable } from "@/api/dashboard-api";

export const RadioDropdown: React.FC<TagMultiSelectDropdownProps> = ({
  selected,
  onChange,
  placeHolder = "tags",
  options = [],
  buttonWidth = "fit",
  menuWidth,
  defaultValue,
  bg = "gray.200",
}) => {
  const [backendTags, setBackendTags] = useState<string[] | null>(null);
  const selectedValue = selected[0] ?? defaultValue ?? "";

  useEffect(() => {
    getFlowTable().then((data) => {
      const tagSet = new Set<string>();
      data.forEach((item: any) => {
        if (Array.isArray(item.tag)) {
          item.tag.forEach((t: string) => {
            if (t && typeof t === "string") {
              tagSet.add(t);
            }
          });
        }
      });
      const tagsFromBackend = Array.from(tagSet);
      setBackendTags(tagsFromBackend.length > 0 ? tagsFromBackend : null);
    });
  }, []);

  const tagOptions = useMemo(() => {
    const sourceTags =
      options && options.length > 0 ? options : backendTags ?? [];
    return sourceTags.map((tag) =>
      typeof tag === "string" ? { label: tag, value: tag } : tag
    );
  }, [backendTags, options]);

  const handleChange = ({ value }: { value: string | null }) => {
    if (value !== null) {
      onChange([value]);
    }
  };

  const selectedLabel =
    tagOptions.find((opt) => opt.value === selectedValue)?.label ?? placeHolder;

  return (
    <FlexibleDropdown
      label={selectedLabel}
      buttonWidth={buttonWidth}
      border="md"
      menuWidth={menuWidth}
      borderColor="blackAlpha.100"
      boxShadow="none"
    >
      <Box
        border="sm"
        borderRadius="sm"
        overflow="hidden"
        borderColor="gray.300"
        minW="fit"
        maxH="2xs"
        overflowY="auto"
        bg={bg}
      >
        <RadioGroup.Root
          value={selectedValue}
          onValueChange={handleChange}
          defaultValue={defaultValue}
        >
          {tagOptions.map((tag) => (
            <RadioGroup.Item
              key={tag.value}
              value={tag.value}
              px="3"
              w="full"
              py="2"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.100" }}
            >
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator
                //   boxSize="4"
                border="sm"
                borderColor="gray.300"
                bg="white"
                _checked={{
                  bg: "blue.500",
                  borderColor: "blue.700",
                }}
              />
              <RadioGroup.ItemText>{tag.label}</RadioGroup.ItemText>
            </RadioGroup.Item>
          ))}
        </RadioGroup.Root>
      </Box>
    </FlexibleDropdown>
  );
};
