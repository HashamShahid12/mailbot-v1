import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { UiText } from "@/components/ui/text";
import UiTextLink from "@/components/ui/text-link";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { IoOpenOutline } from "react-icons/io5";

export interface AudianceFormTeaserProps {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const AudianceFormTeaser: React.FC<AudianceFormTeaserProps> = ({
  selectedOption,
  setSelectedOption,
}) => {
  return (
    <Flex direction="column" maxW="xl" m="auto" mt="12">
      <UiText mb="3" variant="heading2">
        Now, add a teaser to your form
      </UiText>
      <UiText mb="3" color="gray.400">
        A teaser shows a preview of the form's message on your website and opens
        the form when selected.{" "}
        <UiTextLink
          value="Learn more about teasers"
          href="#"
          icon={<IoOpenOutline />}
        />
      </UiText>
      <SelectableCardGroup
        value={selectedOption}
        onChange={setSelectedOption}
        options={[
          {
            value: "includeteaser",
            label: "Include a teaser",
            description:
              "The teaser shows up after the form is closed. You can change this behavior later.",
            badge: "Higher conversion",
          },
          {
            value: "dontteaser",
            label: "Don't include a teaser",
            description: "Forms without a teaser have a lower sign-up rate.",
          },
        ]}
      />
    </Flex>
  );
};

export default AudianceFormTeaser;
