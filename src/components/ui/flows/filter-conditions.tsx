import React, { useEffect, useState, useMemo } from "react";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { UiSelect } from "@/components/ui/select";
import FormField from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { flowFilterOptions } from "@/constants";
import { getCountries } from "@/api/segments";

const countriesOperators = [
  { label: "Equals", value: "equal" },
  { label: "Does not equal", value: "not_equal" },
];

const tagsOperators = [
  { label: "Contains", value: "contains" },
  { label: "Does not contain", value: "not_contains" },
];

interface FilterConditionsProps {
  conditionType: string;
  filterKey: string;
  value: any;
  operator: string;
  handleChange: (value: any, type: string, index: number) => void;
  segments: any[];
  nodes: any[];
  setNodes: (nodes: any[]) => void;
  currentNode: any;
  index: number;
  isAnd: boolean;
  length: number;
}

const FilterConditions: React.FC<FilterConditionsProps> = ({
  conditionType,
  filterKey,
  value,
  operator,
  handleChange,
  segments,
  nodes,
  setNodes,
  currentNode,
  index,
  isAnd,
}) => {
  const [countries, setCountries] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const resp = await getCountries();
        if (resp.success && resp.data && resp.data.countries) {
          setCountries(
            resp.data.countries.map((c) => ({ label: c, value: c })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch countries", error);
      }
    };
    fetchCountries();
  }, []);

  const handleDelete = () => {
    const updatedNodes = [...nodes];
    const targetNodeIndex = updatedNodes.findIndex(
      (n) => n.id === currentNode.id,
    );
    if (targetNodeIndex !== -1) {
      const node = updatedNodes[targetNodeIndex];
      if (isAnd) {
        node.data.filter.and.splice(index, 1);
      } else {
        node.data.filter.or.splice(index, 1);
      }
      setNodes(updatedNodes);
    }
  };

  const filteredFlowFilterOptions = useMemo(
    () => flowFilterOptions.filter((o) => !o.disabled),
    [],
  );

  const segmentOptions = useMemo(() => {
    return segments.map((s) => ({ label: s.name, value: s.id }));
  }, [segments]);

  return (
    <HStack gap={2} alignItems="flex-end" w="full">
      {/* Main Condition Select */}
      <Box flex={1}>
        <UiSelect
          items={filteredFlowFilterOptions}
          placeholder="Select a condition"
          selectedItem={conditionType === "segment" ? operator : filterKey}
          onChange={(val: any) => {
            const selectedOption = flowFilterOptions.find(
              (o) => o.value === val,
            );
            if (!selectedOption) return;

            const currentType = selectedOption.type; // "segment" or "subscriber"
            handleChange(currentType, "conditionType", index);

            if (currentType !== "segment") {
              handleChange(val, "key", index);
              handleChange("equal", "operator", index); // Default operator
              handleChange("", "value", index);
            } else {
              handleChange("", "key", index);
              handleChange(val, "operator", index);
              handleChange("", "value", index);
            }
          }}
        />
      </Box>

      {/* Logic for Segment */}
      {conditionType === "segment" && (
        <Box flex={2}>
          <UiSelect
            items={segmentOptions}
            placeholder="Select a segment"
            selectedItem={value}
            onChange={(val: any) => handleChange(val, "value", index)}
          />
        </Box>
      )}

      {/* Logic for Subscriber */}
      {conditionType === "subscriber" && (
        <>
          <Box flex={1}>
            <UiSelect
              items={filterKey === "tags" ? tagsOperators : countriesOperators}
              placeholder="Operator"
              selectedItem={operator}
              onChange={(val: any) => handleChange(val, "operator", index)}
            />
          </Box>
          <Box flex={1}>
            {filterKey === "tags" ? (
              <FormField
                placeholder="Add comma separated tags"
                value={Array.isArray(value) ? value.join(",") : value}
                onChange={(_, val) => {
                  if (val === "") handleChange("", "value", index);
                  else handleChange(val.split(","), "value", index);
                }}
              />
            ) : (
              <UiSelect
                items={countries}
                placeholder="Select a country"
                selectedItem={value}
                onChange={(val: any) => handleChange(val, "value", index)}
              />
            )}
          </Box>
        </>
      )}

      <IconButton
        aria-label="Remove condition"
        icon={<Trash2 size={16} />}
        size="sm"
        variant="ghost"
        colorScheme="red"
        onClick={handleDelete}
      />
    </HStack>
  );
};

export default FilterConditions;
