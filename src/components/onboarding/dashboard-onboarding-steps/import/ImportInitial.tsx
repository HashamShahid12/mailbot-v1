import { Box, Text } from "@chakra-ui/react";
import { SelectableCardGroup } from "@/components/ui/selectable-card-group";
import { Mail, MessageSquare } from "lucide-react";

interface Props {
  selectedOption: string;
  setSelectedOption: (val: string) => void;
}

export const ImportInitial = ({ selectedOption, setSelectedOption }: Props) => (
  <Box>
    <Text fontSize="xl" fontWeight="bold" m="16px 0 8px 0">
      What type of contacts are you importing?
    </Text>
    <Text fontSize="md" m="8px 0">
      Mailbot recommends managing your email and SMS contacts in separate lists.
    </Text>
    <SelectableCardGroup
      value={selectedOption}
      onChange={setSelectedOption}
      options={[
        { value: "email", icon: Mail, label: "Email" },
        { value: "sms", icon: MessageSquare, label: "SMS" },
      ]}
    />
  </Box>
);
