import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { UiText } from "@/components/ui/text";
import { Flex } from "@chakra-ui/react";
import React from "react";

interface AudianceFormShowWebsiteProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const AudianceFormShowWebsite: React.FC<AudianceFormShowWebsiteProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <Flex>
      <Flex direction="column" maxW="xl" m="auto" mt="12">
        <UiText mb="3" variant="heading2">
          Select how the form shows up on your website
        </UiText>
        <UiText mb="3" color="gray.400">
          You can customize the sign-up form’s content, image, and style later.
        </UiText>

        <SelectableCardGroup
          value={selectedOption}
          onChange={setSelectedOption}
          options={[
            {
              value: "popup",
              label: "Popup",
              description: "The form pops up on the center of the page.",
              badge: "Highest conversion",
            },
            {
              value: "fullpage",
              label: "Full page",
              description: "The form appears over an entire page.",
            },
            {
              value: "flyout",
              label: "Flyout",
              description: "The form slides from the edge of a page.",
            },
            {
              value: "embedded",
              label: "Embedded",
              description:
                "The form is part of the page. Embedded forms require adding a small piece of code to your website.",
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default AudianceFormShowWebsite;
