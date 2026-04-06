import { Text } from "@chakra-ui/react";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { CodeIcon, LinkIcon } from "lucide-react";

interface Props {
  selectedOption: string;
  setSelectedOption: (val: string) => void;
}

export const TrackingInitial = ({ selectedOption, setSelectedOption }: Props) => (
  <>
    <Text fontSize="xl" fontWeight="bold" textAlign="center" m="1rem 0">
      How do you want to enable onsite tracking?
    </Text>
    <SelectableCardGroup
      value={selectedOption}
      onChange={setSelectedOption}
      options={[
        {
          value: "platform",
          icon: LinkIcon,
          label: "Integrate with your website platform",
          description: "Adds Mailbot Javascript to your site.",
        },
        {
          value: "manual",
          icon: CodeIcon,
          label: "Set up manually",
          description: "You’ll need access to your code.",
        },
      ]}
    />
  </>
);
