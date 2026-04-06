import React, { useMemo, useState } from "react";
import { Box, Button, HStack, Icon } from "@chakra-ui/react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PopoverMenu from "./popover";
import { UiSelect } from "./select";
import { UiText } from "./text";

export const timeOptions = [
  { label: "12:00 AM", value: "00:00" },
  { label: "12:30 AM", value: "00:30" },
  { label: "01:00 AM", value: "01:00" },
  { label: "01:30 AM", value: "01:30" },
  { label: "02:00 AM", value: "02:00" },
  { label: "02:30 AM", value: "02:30" },
  { label: "03:00 AM", value: "03:00" },
  { label: "03:30 AM", value: "03:30" },
  { label: "04:00 AM", value: "04:00" },
  { label: "04:30 AM", value: "04:30" },
  { label: "05:00 AM", value: "05:00" },
  { label: "05:30 AM", value: "05:30" },
  { label: "06:00 AM", value: "06:00" },
  { label: "06:30 AM", value: "06:30" },
  { label: "07:00 AM", value: "07:00" },
  { label: "07:30 AM", value: "07:30" },
  { label: "08:00 AM", value: "08:00" },
  { label: "08:30 AM", value: "08:30" },
  { label: "09:00 AM", value: "09:00" },
  { label: "09:30 AM", value: "09:30" },
  { label: "10:00 AM", value: "10:00" },
  { label: "10:30 AM", value: "10:30" },
  { label: "11:00 AM", value: "11:00" },
  { label: "11:30 AM", value: "11:30" },
  { label: "12:00 PM", value: "12:00" },
  { label: "12:30 PM", value: "12:30" },
  { label: "01:00 PM", value: "13:00" },
  { label: "01:30 PM", value: "13:30" },
  { label: "02:00 PM", value: "14:00" },
  { label: "02:30 PM", value: "14:30" },
  { label: "03:00 PM", value: "15:00" },
  { label: "03:30 PM", value: "15:30" },
  { label: "04:00 PM", value: "16:00" },
  { label: "04:30 PM", value: "16:30" },
  { label: "05:00 PM", value: "17:00" },
  { label: "05:30 PM", value: "17:30" },
  { label: "06:00 PM", value: "18:00" },
  { label: "06:30 PM", value: "18:30" },
  { label: "07:00 PM", value: "19:00" },
  { label: "07:30 PM", value: "19:30" },
  { label: "08:00 PM", value: "20:00" },
  { label: "08:30 PM", value: "20:30" },
  { label: "09:00 PM", value: "21:00" },
  { label: "09:30 PM", value: "21:30" },
  { label: "10:00 PM", value: "22:00" },
  { label: "10:30 PM", value: "22:30" },
  { label: "11:00 PM", value: "23:00" },
  { label: "11:30 PM", value: "23:30" },
];

interface DateTimeInputProps {
  value: string | null;
  onChange: (value: string) => void;
  dateLabel?: string;
  timeLabel?: string;
}

const DateTimeInput: React.FC<DateTimeInputProps> = ({
  value,
  onChange,
  dateLabel = "Date",
  timeLabel = "Time",
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Convert ISO value to Date object for DayPicker
  const selectedDateObject = useMemo(() => {
    if (!value) return undefined;
    const date = new Date(value);
    return isNaN(date.getTime()) ? undefined : date;
  }, [value]);

  // Format date for display
  const formattedDate = useMemo(() => {
    if (!selectedDateObject) return "Select date";
    return selectedDateObject.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDateObject]);

  // Filter time options based on selected date
  const availableTimeOptions = useMemo(() => {
    const now = new Date();
    const selectedDate = selectedDateObject || new Date();

    // Check if the selected date is today
    const isToday = selectedDate.toDateString() === now.toDateString();

    if (!isToday) return timeOptions;

    // Calculate cutoff time (30 minutes in future)
    const cutoffMinutes = now.getHours() * 60 + now.getMinutes() + 30;

    return timeOptions.filter((t) => {
      const [hours, minutes] = t.value.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
      return totalMinutes >= cutoffMinutes;
    });
  }, [selectedDateObject]);

  // Handle date change from calendar
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const newDateStr = `${yyyy}-${mm}-${dd}`;

    // Preserve existing time or default to first available
    let currentTime = "00:00";
    if (value) {
      const parts = value.split("T");
      if (parts.length > 1) {
        currentTime = parts[1].slice(0, 5);
      }
    }

    onChange(`${newDateStr}T${currentTime}:00`);
    setIsCalendarOpen(false);
  };

  // Handle time change
  const handleTimeChange = (newTime: string) => {
    const datePart =
      value?.split("T")[0] || new Date().toISOString().split("T")[0];
    onChange(`${datePart}T${newTime}:00`);
  };

  // Get current time value for select
  const currentTimeValue = useMemo(() => {
    if (!value) {
      // Default to first available option if no value
      return availableTimeOptions.length > 0
        ? availableTimeOptions[0].value
        : "00:00";
    }
    const parts = value.split("T");
    if (parts.length > 1) {
      const time = parts[1].slice(0, 5);
      // Check if this time is in available options
      const exists = availableTimeOptions.some((o) => o.value === time);
      if (exists) return time;
    }
    // Fallback to first available
    return availableTimeOptions.length > 0
      ? availableTimeOptions[0].value
      : "00:00";
  }, [value, availableTimeOptions]);

  return (
    <HStack gap={4} width="full" align="flex-start">
      <Box flex={1}>
        <UiText mb={2} fontWeight="medium">
          {dateLabel}
        </UiText>
        <PopoverMenu
          isOpen={isCalendarOpen}
          onOpenChange={setIsCalendarOpen}
          trigger={
            <Button
              variant="outline"
              width="full"
              justifyContent="start"
              fontWeight="normal"
              bg="white"
              borderColor="gray.200"
              _hover={{ borderColor: "gray.300" }}
            >
              <Icon as={CalendarIcon} mr={2} boxSize={4} />
              {formattedDate}
            </Button>
          }
        >
          <Box p={2}>
            <DayPicker
              mode="single"
              selected={selectedDateObject}
              onSelect={handleDateChange}
              disabled={{ before: new Date() }}
            />
          </Box>
        </PopoverMenu>
      </Box>
      <Box flex={1}>
        <UiText mb={2} fontWeight="medium">
          {timeLabel}
        </UiText>
        <UiSelect
          items={availableTimeOptions}
          selectedItem={currentTimeValue}
          onChange={handleTimeChange}
          placeholder="Select time"
          width="100%"
        />
      </Box>
    </HStack>
  );
};

export default DateTimeInput;
