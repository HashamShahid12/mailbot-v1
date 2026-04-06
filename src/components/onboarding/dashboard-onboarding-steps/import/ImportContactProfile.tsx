import { Box, Text } from "@chakra-ui/react";
import { UiSelect } from "@/components/ui/select";
import { useState } from "react";

const listItems = [
  { value: "list1", label: "Newsletter" },
  { value: "list2", label: "VIP Customers" },
  { value: "list3", label: "Webinar Signups" },
];

export const ImportContactProfile = () => {
  const [selectedList, setSelectedList] = useState<string | undefined>();

  return (
    <Box mt="10">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Which list do you want to add your contacts to?
      </Text>
      <Text fontSize="md" mb={4}>
        Lists can be used to organize your contacts. A single contact profile
        can exist in multiple lists.
      </Text>
      <UiSelect
        searchBar
        width="full"
        items={listItems}
        selectedItem={selectedList}
        onChange={(val) => setSelectedList(val)}
      />
    </Box>
  );
};
