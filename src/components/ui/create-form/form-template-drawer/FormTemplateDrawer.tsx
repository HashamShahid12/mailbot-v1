import { Box, Image, Text, Badge, Flex } from "@chakra-ui/react";
import { DrawerWrapper } from "@/components/ui/drawer";
import UiButton from "../../button";
import FormField from "../../input";
import { UiText } from "../../text";
import { UiSelect } from "../../select";
import SearchBar from "../../search-bar";

interface FormTemplate {
  id: number;
  title: string;
  label: string;
  imageUrl: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  template: FormTemplate | null;
}

const listItemsSubscribers = [
  { value: "list1", label: "Newslatter" },
  { value: "list2", label: "Preview List" },
  { value: "list3", label: "SMS Subscribers" },
];

export const FormTemplateDrawer = ({ isOpen, onClose, template }: Props) => {
  return (
    <DrawerWrapper
      open={isOpen}
      onOpenChange={onClose}
      title={template?.title || "Template Preview"}
      placement="end"
      height="93vh"
      footer={[
        <UiButton key="cancel" uiVariant="outline">
          Cancel
        </UiButton>,
        <UiButton key="clone" uiVariant="solid">
          Create form
        </UiButton>,
      ]}
    >
      {template ? (
        <Box p={5}>
          <Image src={template.imageUrl} alt={template.title} mb={4} />
          <Flex align="center" gap={3} mb="15px">
            <Badge colorScheme="gray">{template.label}</Badge>
          </Flex>

          <FormField label="Name" />
          <UiText p="1rem 0 5px 0">Email subscriber list</UiText>
          <UiSelect
            placeholder="Choose a list..."
            width="full"
            items={listItemsSubscribers}
            searchBar
          />
          <UiText p="1rem 0 5px 0">Phone number list</UiText>
          <UiSelect
            placeholder="Phone number list"
            width="full"
            searchBar
            items={listItemsSubscribers}
          />
        </Box>
      ) : (
        <Box p={5}>No template selected</Box>
      )}
    </DrawerWrapper>
  );
};
