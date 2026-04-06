import { useEffect, useMemo, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from ".";
import Checkbox from "../check-box";
import SearchBar from "../search-bar";
import { getFlowTable } from "@/api/dashboard-api";
import type { TagMultiSelectDropdownProps } from "@/types/tag-multiselect-dropdown-props";
import { UiText } from "../text";

export const TagMultiSelectDropdown: React.FC<TagMultiSelectDropdownProps> = ({
  selected,
  onChange,
  placeHolder = "tags",
  options = [],
  buttonWidth = "fit",
  searchBar = true,
  checkbox = true,
  label,
  menuWidth,
  bg = "gray.200",
}) => {
  const [backendTags, setBackendTags] = useState<string[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

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
      options && options.length > 0 ? options : (backendTags ?? []);

    return sourceTags.map((tag) =>
      typeof tag === "string"
        ? { label: tag, value: tag, subtitle: undefined, badge: undefined }
        : tag,
    );
  }, [backendTags, options]);

  const handleToggle = (value: string) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange(updated);
  };

  const selectedLabels = tagOptions
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayLabel =
    selected.length === 0
      ? placeHolder
      : selected.length === 1
        ? selectedLabels[0]
        : `${selectedLabels[0]}, +${selected.length - 1}`;

  const filteredTags = tagOptions.filter((tag) =>
    tag.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <FlexibleDropdown
      label={displayLabel}
      buttonWidth={buttonWidth}
      border="md"
      menuWidth={menuWidth}
      borderColor="blackAlpha.100"
      boxShadow="none"
      borderStyle="dashed"
    >
      <Box
        border="sm"
        borderRadius="sm"
        overflow="hidden"
        borderColor="gray.300"
      >
        {searchBar && (
          <Box p="3">
            <SearchBar
              placeholder="Select tags"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>
        )}
        {label && (
          <Box p="3">
            <UiText variant="caption">{label}</UiText>
          </Box>
        )}
        <Flex
          direction="column"
          bg={bg}
          borderTop={searchBar ? "sm" : "none"}
          borderColor="gray.300"
          minW="fit"
          maxH="2xs"
          overflowY="auto"
        >
          {filteredTags.map((tag) => (
            <Checkbox
              key={tag.value}
              outline="none"
              p="3"
              _checked={{ bg: "blue.400", color: "blue.100" }}
              _hover={{
                bg: "gray.100",
                _checked: { bg: "blue.400", color: "blue.100" },
              }}
              checkbox={checkbox}
              cursor="pointer"
              badge={tag.badge}
              subtitle={tag.subtitle}
              label={tag.label}
              value={tag.value}
              checked={selected.includes(tag.value)}
              onCheckedChange={() => handleToggle(tag.value)}
            />
          ))}
        </Flex>
      </Box>
    </FlexibleDropdown>
  );
};
