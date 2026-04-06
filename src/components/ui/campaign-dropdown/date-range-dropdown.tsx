import {
  Box,
  Flex,
  Text,
  VStack,
  RadioGroup,
  HStack,
  Circle,
  Input,
} from "@chakra-ui/react";
import { Calendar } from "lucide-react";
import { FlexibleDropdown } from "../dropdown";
import { format, parse } from "date-fns";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import React, { useEffect } from "react";
import UiButton from "../button";

interface DateRangeDropdownProps {
  range: DateRange | undefined;
  disabled?: boolean;
  onChange: (range: DateRange | undefined, label: string) => void;
  onApply: (range: DateRange | undefined) => void;
  selectRange: string;
  setSelectRange: (value: string) => void;
}

const presetRanges = [
  { label: "Last 7 days", value: "last7", from: 7 },
  { label: "Last 30 days", value: "last30", from: 30 },
  { label: "Last 90 days", value: "last90", from: 90 },
  {
    label: "Last year",
    value: "lastYear",
    from: new Date(new Date().getFullYear() - 1, 0, 1),
    to: new Date(new Date().getFullYear() - 1, 11, 31, 23, 59, 59, 999),
  },
  { label: "All time", value: "all" },
  // {
  //   label: "Year-to-date",
  //   value: "ytd",
  //   from: new Date(new Date().getFullYear(), 0, 1),
  // },
  // { label: "Custom range", value: "custom" },
];

export const DateRangeDropdown = ({
  range,
  onChange,
  onApply,
  selectRange,
  setSelectRange,
  disabled,
}: DateRangeDropdownProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [customFrom, setCustomFrom] = React.useState("");
  const [customTo, setCustomTo] = React.useState("");

  const today = new Date();

  const getRangeLabel = (item: (typeof presetRanges)[0]) => {
    if (typeof item.from === "number") {
      const from = new Date(Date.now() - item.from * 86400000);
      return `${format(from, "MMM d, yyyy")} – ${format(today, "MMM d, yyyy")}`;
    }
    if (item.from && item.to) {
      return `${format(item.from, "MMM d, yyyy")} – ${format(
        item.to,
        "MMM d, yyyy",
      )}`;
    }
    if (item.value === "ytd") {
      return `${format(item.from as Date, "MMM d")} – ${format(
        today,
        "MMM d, yyyy",
      )}`;
    }
    return null;
  };

  const handleApply = () => {
    const selected = presetRanges.find((item) => item.value === selectRange);
    if (selectRange === "custom") {
      try {
        const fromDate = parse(customFrom, "yyyy-MM-dd", new Date());
        const toDate = parse(customTo, "yyyy-MM-dd", new Date());
        if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
          onChange({ from: fromDate, to: toDate }, "Custom range");
          setIsDropdownOpen(false);
          return;
        }
      } catch (e) {
        console.warn("Invalid custom range input.", e);
        return;
      }
    } else if (selected) {
      let from: Date | undefined;
      let to: Date | undefined = new Date();

      if (typeof selected.from === "number") {
        from = new Date(Date.now() - selected.from * 86400000);
      } else if (selected.from && selected.to) {
        from = selected.from;
        to = selected.to;
      } else if (selected.value === "ytd") {
        from = selected.from as Date;
      } else if (selected.value === "all") {
        from = new Date(2000, 0, 1);
        to = new Date();
      }

      if (from && to) {
        // onChange({ from, to }, selected.label);
        setIsDropdownOpen(false);
        onApply({ from, to });
      }
    }
  };
  const handleCancel = () => {
    setIsDropdownOpen(false);
  };

  const getLastNDaysRange = (days: number) => {
    const today = new Date();

    // End = yesterday at 00:00:00
    const end = new Date(today);
    end.setDate(today.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    // Start = N days before end
    const start = new Date(end);
    start.setDate(end.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    return { from: start, to: end };
  };

  console.log(range, "selectRange");
  const updateDayPickerFromSelect = (value: string) => {
    const selected = presetRanges.find((item) => item.value === value);
    if (!selected) return;

    let from: Date | undefined;
    let to: Date | undefined = new Date();

    if (value === "all") {
      onChange(undefined, "All time");
      return;
    }

    if (typeof selected.from === "number") {
      const range = getLastNDaysRange(selected.from);
      from = range.from;
      to = range.to;
    } else if (selected.from && selected.to) {
      from = selected.from;
      to = selected.to;
    } else if (selected.value === "ytd") {
      from = selected.from as Date;
    }

    if (from && to) {
      onChange({ from, to }, selected.label);
    }
  };

  useEffect(() => {
    updateDayPickerFromSelect(selectRange);
  }, [selectRange]);

  return (
    <FlexibleDropdown
      label={
        selectRange === "custom"
          ? "Custom range"
          : presetRanges.find((r) => r.value === selectRange)?.label ||
            "All time"
      }
      icon={<Calendar />}
      buttonWidth="fit"
      borderColor="blackAlpha.100"
      boxShadow="none"
      menuWidth="auto"
      isOpen={isDropdownOpen}
      onOpen={() => setIsDropdownOpen(true)}
      onClose={() => setIsDropdownOpen(false)}
    >
      <Box border="sm" borderRadius="sm" borderColor="gray.300">
        <Flex minW="600px" borderBottom="1px solid #e4e4e7">
          <Box flex="1">
            <RadioGroup.Root
              value={selectRange}
              onValueChange={({ value }) => setSelectRange(value || "last30")}
            >
              <VStack align="start" gap="0">
                {presetRanges.map((item) => (
                  <RadioGroup.Item
                    key={item.value}
                    value={item.value}
                    width="full"
                    p="2"
                    cursor="button"
                    _hover={{ bg: "gray.100" }}
                  >
                    <RadioGroup.ItemHiddenInput />
                    <HStack align="flex-start" gap="2" width="100%">
                      <RadioGroup.ItemIndicator
                        cursor="button"
                        border="1px solid rgb(172, 172, 172)"
                      >
                        <Circle
                          size="16px"
                          border="2px solid"
                          borderColor="gray.400"
                          bg={selectRange === item.value ? "blue.500" : "white"}
                        />
                      </RadioGroup.ItemIndicator>
                      <RadioGroup.ItemText width="100%">
                        <Text fontWeight="medium">{item.label}</Text>
                        {getRangeLabel(item) && (
                          <Text fontSize="xs" color="gray.700">
                            {getRangeLabel(item)}
                          </Text>
                        )}
                      </RadioGroup.ItemText>
                    </HStack>
                  </RadioGroup.Item>
                ))}
                {selectRange === "custom" && (
                  <Box w="100%" p="2">
                    <HStack mt={2}>
                      <Input
                        type="date"
                        placeholder="Start Date"
                        value={customFrom}
                        onChange={(e) => setCustomFrom(e.target.value)}
                        border="1px solid rgb(172, 172, 172)"
                        p={1}
                      />
                      <Text>–</Text>
                      <Input
                        type="date"
                        placeholder="End Date"
                        value={customTo}
                        onChange={(e) => setCustomTo(e.target.value)}
                        border="1px solid rgb(172, 172, 172)"
                        p={1}
                      />
                    </HStack>
                  </Box>
                )}
              </VStack>
            </RadioGroup.Root>
          </Box>

          <Box flex="1" borderLeft="sm" borderColor="gray.200" pl="4">
            <DayPicker
              disabled={disabled}
              mode="range"
              selected={range}
              onSelect={(selectedRange) => {
                const selected = presetRanges.find(
                  (r) => r.value === selectRange,
                );
                onChange(selectedRange, selected?.label || "All time");
              }}
              numberOfMonths={1}
              showOutsideDays
              className="rdp"
            />
          </Box>
        </Flex>
        <Flex justify="flex-end" gap="2" p="2">
          <UiButton uiVariant="outline" onClick={handleCancel}>
            Cancel
          </UiButton>
          <UiButton uiVariant="solid" onClick={handleApply}>
            Apply
          </UiButton>
        </Flex>
      </Box>
    </FlexibleDropdown>
  );
};
