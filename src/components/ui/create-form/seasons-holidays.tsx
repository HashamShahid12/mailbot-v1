import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import { FlexibleDropdown } from "../dropdown";
import Checkbox from "../check-box";

const seasonOptions = [
  "Autumn",
  "Black Friday",
  "Cyber Monday",
  "Spring",
  "Summer",
  "Winter",
];

export const SeasonHolidayDropdown = () => {
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    setSelectedSeasons((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const displayLabel =
    selectedSeasons.length === 0
      ? "Seasons & holidays"
      : selectedSeasons.length === 1
      ? selectedSeasons[0]
      : `${selectedSeasons[0]}, +${selectedSeasons.length - 1}`;

  return (
    <FlexibleDropdown
      label={displayLabel}
      menuWidth="180px"
      buttonWidth="180px"
      buttonHeight="30px"
      background="transparent !important"
      border="1px dashed #939495"
    >
      <Flex direction="column" gap={2} p={3}>
        {seasonOptions.map((season) => (
          <Checkbox
            key={season}
            label={season}
            checked={selectedSeasons.includes(season)}
            onChange={() => toggleSelection(season)}
          />
        ))}
      </Flex>
    </FlexibleDropdown>
  );
};
