import { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Checkbox from "../check-box";
import SearchBar from "../search-bar";
import { FlexibleDropdown } from "../dropdown";
import { useSegmentStore } from "@/store/segment-store";
import { getSegments } from "@/api/segments";

interface AudienceDropdownProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export const AudienceDropdown = ({
  selected,
  onChange,
}: AudienceDropdownProps) => {
  const { segments, hasSegments, setSegments } = useSegmentStore();
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchSegments = async () => {
      if (!hasSegments) {
        try {
          const res = await getSegments();
          if (res.success) {
            setSegments(res.data);
          }
        } catch (error) {
          console.error("Failed to fetch segments", error);
        }
      }
    };
    fetchSegments();
  }, [hasSegments, setSegments]);

  useEffect(() => {
    if (segments) {
      const allSegments = [
        ...(segments.shopify_segments || []),
        ...(segments.defaults_custom_segments || []),
      ].map((s) => ({
        label: s.name,
        value: s.name, // Using name as value for filtering since campaign table uses names
      }));
      setOptions(allSegments);
    }
  }, [segments]);

  const handleToggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value],
    );
  };

  const selectedLabels = options
    .filter((opt) => selected.includes(opt.value))
    .map((opt) => opt.label);

  const displayLabel =
    selected.length === 0
      ? "Audience"
      : selected.length === 1
        ? selectedLabels[0]
        : `${selectedLabels[0]}, +${selected.length - 1}`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      selectedValues={selected}
      onChange={onChange}
      buttonWidth="143px"
      buttonHeight="30px"
      background="transparent !important"
      border="2px dotted !important"
      borderColor="#939495 !important"
      menuPadding="10px"
    >
      <SearchBar />
      <Flex direction="column" gap={2} p={3} maxH="300px" overflowY="auto">
        {options.length > 0 ? (
          options.map((status) => (
            <Checkbox
              key={status.value}
              label={status.label}
              value={status.value}
              checked={selected.includes(status.value)}
              onChange={() => handleToggle(status.value)}
            />
          ))
        ) : (
          <Flex p="2" color="gray.500" fontSize="sm">
            No segments found
          </Flex>
        )}
      </Flex>
    </FlexibleDropdown>
  );
};
