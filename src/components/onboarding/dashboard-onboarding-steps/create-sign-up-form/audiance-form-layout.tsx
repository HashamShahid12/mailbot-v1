import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { UiText } from "@/components/ui/text";
import { Flex } from "@chakra-ui/react";
import type React from "react";

export interface AudianceFormLayoutProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}
const AudianceFormLayout: React.FC<AudianceFormLayoutProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <>
      <Flex direction="column" maxW="xl" m="auto" mt="12">
        <UiText mb="8" variant="heading2">
          Almost done. Select a layout.
        </UiText>
        <SelectableCardGroup
          value={selectedOption}
          onChange={setSelectedOption}
          options={[
            {
              value: "left",
              label: "Left Side Image",
            },
            {
              value: "right",
              label: "Right Side Image",
            },
            {
              value: "background",
              label: "Background Image",
            },
            {
              value: "no",
              label: "No Image",
            },
          ]}
        />
      </Flex>
    </>
  );
};

export default AudianceFormLayout;
