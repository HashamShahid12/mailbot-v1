import { FormField, SearchBar } from "@/components/ui";
import UiButton from "@/components/ui/button";
import { FormStyleDropdown } from "@/components/ui/create-form/form-style";
import {
  FormTemplatesGrid,
  templates,
} from "@/components/ui/create-form/form-template";
import { FormTemplateDrawer } from "@/components/ui/create-form/form-template-drawer/FormTemplateDrawer";
import { SeasonHolidayDropdown } from "@/components/ui/create-form/seasons-holidays";
import { TemplateTypeDropdown } from "@/components/ui/create-form/template-type";
import { DrawerWrapper } from "@/components/ui/drawer";
import { UiSelect } from "@/components/ui/select";
import { UiText } from "@/components/ui/text";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const listItems = [
  {
    value: "list1",
    label: "Popup",
    description: "Pops up in the middle of the screen",
  },
  {
    value: "list2",
    label: "Full page",
    description: "Files up the entire page",
  },
  {
    value: "list3",
    label: "Flyout",
    description: "Slides in from the side of the screen",
  },
  {
    value: "list4",
    label: "Embed",
    description: "Embedded in your site with a small block of code",
  },
  {
    value: "list5",
    label: "Banner",
    description:
      "A horixontal bar that appears at the top or bottom of the screen",
  },
];
const listItemsSubscribers = [
  { value: "list1", label: "Newslatter" },
  { value: "list2", label: "Preview List" },
  { value: "list3", label: "SMS Subscribers" },
];

export const CreateForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpenForm, setDrawerOpenForm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedTemplate = templates.find((t) => t.id === selectedId) || null;

  return (
    <>
      <Box
        padding="16px 24px"
        background="white"
        borderBottom="1px solid rgb(221, 224, 224)"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <UiText fontSize="2xl">Create form</UiText>
          <Flex gap="3">
            <Button
              p="4"
              variant="outline"
              border="1px solid black"
              onClick={() => setDrawerOpen(true)}
            >
              Create blank form
            </Button>
          </Flex>
        </Flex>
      </Box>
      <Box p="2rem 1.7rem">
        <Flex gap="3">
          <SearchBar w="17rem" />
          <FormStyleDropdown />
          <TemplateTypeDropdown />
          <SeasonHolidayDropdown />
        </Flex>

        <FormTemplatesGrid
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            setDrawerOpenForm(true);
          }}
        />
      </Box>

      <FormTemplateDrawer
        isOpen={drawerOpenForm}
        onClose={() => setDrawerOpenForm(false)}
        template={selectedTemplate}
      />
      <DrawerWrapper
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Create Form"
        placement="end"
        height="93vh"
        footer={[
          <UiButton key="clone" uiVariant="solid">
            Save and design
          </UiButton>,
          <UiButton key="cancel" uiVariant="outline">
            Cancel
          </UiButton>,
        ]}
      >
        <Box p={4}>
          <FormField label="Form name" placeholder="e.g. Newsletter sign-up" />
          <UiText p="1rem 0 5px 0">Choose a form type</UiText>
          <UiSelect placeholder="Select one" width="full" items={listItems} />
          <UiText pt="1rem">Which list should subscribers be added to?</UiText>
          <UiSelect
            placeholder="Choose a list"
            width="full"
            items={listItemsSubscribers}
            searchBar
          />
        </Box>
      </DrawerWrapper>
    </>
  );
};
